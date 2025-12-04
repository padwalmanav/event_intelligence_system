import json
import re

def extract_clean_json(llm_response: str):
    try:
        cleaned = re.sub(r"```(?:json)?", "", llm_response)
        cleaned = cleaned.replace("```", "").strip()

        match = re.search(r"\{[\s\S]*\}", cleaned)
        if not match:
            raise ValueError("No JSON object found")

        json_text = match.group(0)

        return json.loads(json_text)

    except Exception as e:
        print("JSON extraction failed:", str(e))
        return None
