import json
import re
from typing import Any, Optional

def extract_clean_json(llm_response: str) -> Optional[Any]:
    """
    Extracts the first valid JSON array or object from an LLM response.
    Returns parsed JSON or None if extraction fails.
    """
    try:
        # Remove markdown fences
        cleaned = re.sub(r"```(?:json)?", "", llm_response, flags=re.IGNORECASE)
        cleaned = cleaned.replace("```", "").strip()
        
        # Remove any leading text before JSON starts
        # Find the first [ or { to identify where JSON begins
        json_start = min(
            (cleaned.find('[') if cleaned.find('[') != -1 else len(cleaned)),
            (cleaned.find('{') if cleaned.find('{') != -1 else len(cleaned))
        )
        
        if json_start == len(cleaned):
            print("JSON extraction failed: No JSON found")
            return None
            
        cleaned = cleaned[json_start:]
        
        # Try to parse as-is (works if JSON is at the start)
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            pass
        
        # Try to find and extract valid JSON by balancing brackets
        result = extract_balanced_json(cleaned)
        if result:
            return json.loads(result)
        
        print("JSON extraction failed: Could not extract valid JSON")
        return None

    except json.JSONDecodeError as e:
        print(f"JSON decoding failed: {e}")
        return None
    except Exception as e:
        print(f"Unexpected JSON parsing error: {e}")
        return None


def extract_balanced_json(text: str) -> Optional[str]:
    """
    Extracts JSON by matching balanced brackets/braces.
    """
    if not text:
        return None
    
    start_char = text[0]
    if start_char not in ['{', '[']:
        return None
    
    end_char = '}' if start_char == '{' else ']'
    stack = [start_char]
    in_string = False
    escape = False
    
    for i in range(1, len(text)):
        char = text[i]
        
        # Handle string escaping
        if escape:
            escape = False
            continue
        if char == '\\':
            escape = True
            continue
        
        # Track if we're inside a string
        if char == '"':
            in_string = not in_string
            continue
        
        if in_string:
            continue
        
        # Track bracket/brace balance
        if char in ['{', '[']:
            stack.append(char)
        elif char in ['}', ']']:
            if not stack:
                return None
            stack.pop()
            if not stack:
                return text[:i+1]
    
    return None