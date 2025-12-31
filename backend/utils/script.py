from constants.prompts import event_interface
from model.claudeAI import call_anthropic_model
from utils.json_parser import extract_clean_json
from db.mongo import insert_document

events = [
    "Global Supply Chain Summit",
    "MicroConf US 2026",
    "Sustainable Business Forum",
    "SaaStock USA 2026",
    "GITEX Asia 2026",
    "FinTech World Forum",
    "Energy Tech Summit Europe 2026",
    "India Electronics Week 2026",
    "Retail Innovation Expo 2026",
    "SaaStr Annual 2026",
    "EmTech Europe 2026",
    "TechEx North America 2026",
    "Healthcare Innovation Congress",
    "Manufacturing 4.0 Conference",
    "Digital Transformation Summit India 2026",
    "ACM SIGMOD / PODS 2026",
    "InsurTech Connect",
    "EXPO REAL Asia Pacific 2026",
    "Business of Software Europe 2026",
    "Medical Devices Summit",
    "KubeCon + CloudNativeCon India 2026",
    "Clean Energy Summit",
    "Creative Tech Europe 2026",
    "TechSummit 2026",
    "BioTech & Pharma World",
    "Asia Pacific Regional Conference 2026",
    "LEAP 2026",
    "OMR Festival 2026",
    "Future of Retail Summit",
    "Web Summit 2026",
    "Hydrogen Energy Forum",
    "Digital Banking Forum",
    "ISE 2026 (Integrated Systems Europe)",
    "Smart Factory Expo",
    "Collision 2026",
    "Business of Software USA 2026",
    "AWS re:Invent 2026",
    "Dreamforce 2026",
    "Tech Innovation Forum 2026 (APAC)",
]

def event_search_from_web(event: str):
    prompt = f"""
        You are an AI data extraction agent.

        TASK:
        Fetch up {event} event happening in 2026.

        OUTPUT RULES (MANDATORY):
        - Respond with ONLY a valid JSON array
        - Each array item must be an event object
        - Do NOT include markdown
        - Do NOT include explanations
        - Do NOT include any text before or after JSON

        EVENT SCHEMA:
        {event_interface}

        Return ONLY the JSON array.
        """

    print("LLM calling....")
    response = call_anthropic_model(prompt, True)
    print("Response----->", response)
    
    clean_response = extract_clean_json(response)
    print("clean_response:------------->\n", clean_response)

    if not clean_response:
        print("❌ No valid JSON extracted from LLM response")
        return
    
    if not isinstance(clean_response, list):
        print("❌ Expected JSON array, got:", type(clean_response).__name__)
        return
    
    if len(clean_response) == 0:
        print("⚠️  LLM returned empty event list")
        return

    # Insert events with error handling
    inserted_count = 0
    failed_count = 0
    
    for idx, event in enumerate(clean_response):
        try:
            if not isinstance(event, dict):
                print(f"⚠️  Skipping event {idx + 1}: Not a valid object")
                failed_count += 1
                continue
                
            event_id = insert_document(event)
            if event_id:
                print(f"✅ Inserted event {idx + 1}: {event.get('title', 'Unknown')} (ID: {event_id})")
                inserted_count += 1
            else:
                print(f"❌ Failed to insert event {idx + 1}: {event.get('title', 'Unknown')}")
                failed_count += 1
                
        except Exception as e:
            print(f"❌ Error inserting event {idx + 1}: {e}")
            failed_count += 1

    print(f"\n📊 Summary: {inserted_count} inserted, {failed_count} failed")
    print("---- Event Search from web over ----")


for event in events:
    event_search_from_web(event)