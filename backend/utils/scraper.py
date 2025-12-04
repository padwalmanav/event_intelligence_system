from bs4 import BeautifulSoup
import requests
import os
import sys
import json
import time

from country_extractor import extract_country
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from db.mongo import insert_document, if_index_exists
from model.claudeAI import call_anthropic_model
from utils.json_parser import extract_clean_json
from constants.prompts import llm_interface, scraped_data_parser

selected_countries = ['India', 'USA', 'Singapore', 'UAE - United Arab Emirates']
base_url = "https://www.eventseye.com"

def scrape_exhibitions():
    # -------------------- Fetch ICT Category URL --------------------
    response = requests.get(f"{base_url}/index.html")
    soup = BeautifulSoup(response.text, 'lxml')

    body_div = soup.find_all('div', class_='body')
    a_tags = body_div[2].find_all('a') if body_div else []

    ict_href = a_tags[22].get('href') if len(a_tags) > 22 else None

    # -------------------- Fetch exhibitions list --------------------
    ict_url = f"{base_url}/fairs/{ict_href}"
    response = requests.get(ict_url)
    soup = BeautifulSoup(response.text, 'lxml')

    exhibitions = soup.find('table', class_='tradeshows')
    exhibition_body = exhibitions.find('tbody') if exhibitions else None
    rows = exhibition_body.find_all('tr') if exhibition_body else []

    # delete_all_document()

    # -------------------- Process listing rows --------------------
    for row in rows:

        td = row.find_all('td')
        if len(td) < 3:
            continue
        exhibition_a_tag = td[0].find('a')
        exhibition_href = exhibition_a_tag.get('href') if exhibition_a_tag else None    

        index_exists = if_index_exists(exhibition_href)

        if not index_exists:
            venue_el = td[2].find_all('a')
            venue_name = venue_el[0].get_text(strip=True) if venue_el else None
            country = extract_country(venue_name)

            if country not in selected_countries:
                continue  # skip unwanted countries

            # Exhibition URL
            exhibition_href_el = td[0].find('a')
            exhibition_href = exhibition_href_el.get('href') if exhibition_href_el else None
            if not exhibition_href:
                continue

            exhibition_url = f"{base_url}/fairs/{exhibition_href}"
            response = requests.get(exhibition_url)
            soup = BeautifulSoup(response.text, 'lxml')

            # -------------------- Title --------------------
            title_el = soup.find('div', class_="title-line")
            title = title_el.get_text(strip=True) if title_el else ""

            # -------------------- Description --------------------
            description_el = soup.find('div', class_='description')
            description_el.h2.decompose() if description_el else None
            description = description_el.get_text(strip=True) if description_el else None

            # -------------------- Related Industries --------------------
            related_industries = []
            industries_div = soup.find('div', class_='industries')
            industries_a = industries_div.find_all('a') if industries_div else []
            for a in industries_a:
                related_industries.append(a.get_text(strip=True))

            # -------------------- Audience --------------------
            audience_el = soup.find('div', class_='audience')
            audience_el.h2.decompose() if audience_el else None
            audience = audience_el.get_text(strip=True) if audience_el else None

            # -------------------- Cycle --------------------
            cycle_el = soup.find('div', class_='cycle')
            cycle_el.h2.decompose() if cycle_el else None
            cycle = cycle_el.get_text(strip=True) if cycle_el else None

            # -------------------- Date, City, Venue --------------------
            date = city = venue = None
            date_table = soup.find('table', class_='dates')
            date_body = date_table.find('tbody') if date_table else None
            date_td = date_body.find_all('td') if date_body else []

            if len(date_td) >= 3:
                date = date_td[0].get_text(strip=True)
                city = date_td[1].get_text(strip=True)
                venue = date_td[2].get_text(strip=True)

            # -------------------- Venue Details --------------------
            venue_website = venue_phone = venue_fax = None

            venue_div = soup.find('div', class_='venue')
            venue_info = venue_div.find('div', class_='info') if venue_div else None
            venue_text = venue_info.find('div', class_='text') if venue_info else None

            if venue_text:
                venue_a_tags = venue_text.find_all('a')
                if len(venue_a_tags) > 2:
                    venue_website = venue_a_tags[2].get('href')

                phone_el = venue_text.find('div', class_='ev-phone')
                venue_phone = phone_el.get_text(strip=True) if phone_el else None

                fax_el = venue_text.find('div', class_='ev-fax')
                venue_fax = fax_el.get_text(strip=True) if fax_el else None

            # -------------------- Organizer Details --------------------
            organizers = []
            org_main = soup.find('div', class_='orgs')
            org_divs = org_main.find_all('div', class_='org') if org_main else []

            for org in org_divs:
                text_div = org.find('div', class_='text')

                # Organizer name
                name_el = text_div.find('a', class_='orglink') if text_div else None
                organizer_name = name_el.get_text(strip=True) if name_el else None

                # Organizer address (full text with <br>)
                organizer_address = text_div.get_text(" ", strip=True) if text_div else ""

                # Phones
                o_phone_el = text_div.find('div', class_='ev-phone') if text_div else None
                organizer_ev_phone = o_phone_el.get_text(strip=True) if o_phone_el else None

                o_fax_el = text_div.find('div', class_='ev-fax') if text_div else None
                organizer_ev_fax = o_fax_el.get_text(strip=True) if o_fax_el else None

                # Website
                all_links = text_div.find_all('a') if text_div else []
                organizer_website = all_links[1].get('href') if len(all_links) > 1 else None

                organizers.append({
                    "name": organizer_name,
                    "address": organizer_address,
                    "ev_phone": organizer_ev_phone,
                    "ev_fax": organizer_ev_fax,
                    "official_website": organizer_website
                })

            event_details = soup.find('div', class_ = 'more-info')
            event_website_el = event_details.find_all('a') if event_details else None
            event_website = event_website_el[0].get('href') if event_website_el else None
            event_email = event_website_el[1].get('href') if event_website_el else None

            # -------------------- Prepare payload --------------------
            payload = {
                "exhibition_url": exhibition_href,
                "title": title,
                "description": description,
                "related_industries": related_industries,
                "audience": audience,
                "cycle": cycle,
                "date": date,
                "city": city,
                "venue": venue,
                "venue_website": venue_website,
                "venue_phone": venue_phone,
                "venue_fax": venue_fax,
                "event_website": event_website,
                "event_email": event_email,
                "organizers": organizers
            }

            stringified_paylod = json.dumps(payload)
            # ------------------- Parsing scraped event data ---------------
            prompt = f"{stringified_paylod} \n {scraped_data_parser} Strictly respond in JSON format, Don't include tags like <cite index=''>"

            final_payload = call_anthropic_model(prompt)
            parsed_final_payload = extract_clean_json(final_payload)

            # ------------------- LLM call for AI insights -----------------
            prompt = f"The event details is provided below \n {parsed_final_payload} \n based on this event details you are supposed to find other details provided in the given interface \n {llm_interface} Strictly provide JSON format. Don't include tags like <cite index=''>, if valued not found put null"

            time.sleep(15)
            raw_claude_response = call_anthropic_model(prompt, use_web_search=True)
            parsed_claude_response = extract_clean_json(raw_claude_response)
            parsed_final_payload['llm_response'] = parsed_claude_response

            # -------------------- Insert into MongoDB --------------------
            inserted_id = insert_document(parsed_final_payload)
            print("Inserted:", inserted_id)

scrape_exhibitions()