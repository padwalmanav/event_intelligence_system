import re

def extract_country(text):
    match = re.search(r"\(([^)]+)\)", text)
    if match:
        country = match.group(1)
    return country
