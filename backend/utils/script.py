from constants.prompts import event_interface
from model.claudeAI import call_anthropic_model
from utils.json_parser import extract_clean_json
from db.mongo import insert_document

def event_search_from_web():
    prompt = f"""
        You are an AI data extraction agent.

        TASK:
        Fetch up to 5 upcoming technology industry events happening in 2026.
        CES 2026, SaaS conference 2026, AI impact Summit 2026, 4th Information Technology Conference 2026, FOSDEM 2026, SaaS Insider Event India.

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


if __name__ == "__main__":
    event_search_from_web()