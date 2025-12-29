import os
import sys
import time
from anthropic import Anthropic
from anthropic._exceptions import OverloadedError, APIError
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from constants.prompts import llm_interface

load_dotenv()

client = Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))

def call_anthropic_model(prompt: str, use_web_search: bool = False, retries: int = 5):
    """
    Calls Anthropic Claude model with automatic retries for OverloadedError (529).
    Adds exponential backoff and safety for unexpected errors.
    """

    request_params = {
        "model": "claude-haiku-4-5-20251001",
        "max_tokens": 5000,
        "system": (
            "You are a helpful agent that performs web search when needed."
            """You must:
                - Be concise
                - Be factual (do not invent data)
                - Clearly state assumptions
                - Think like a CMO / Head of Sales / Partnerships lead 
            """
            "If information is missing, say 'Insufficient data'. Do not hallucinate speakers, sponsors, or attendees."
            "Always return valid JSON with no additional text."
        ),
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    if use_web_search:
        request_params["tools"] = [
            {
                "type": "web_search_20250305",
                "name": "web_search"
            }
        ]

    # ---- Retry Logic ----
    for attempt in range(retries):
        try:
            print(f"[Claude API] Attempt {attempt + 1}")

            response = client.messages.create(**request_params)

            # Process returned content
            result = ""
            for block in response.content:
                if block.type == "text":
                    result += block.text

            return result

        except OverloadedError:
            wait = 2 ** attempt
            print(f"[Claude API] Overloaded (529). Retrying in {wait} seconds...")
            time.sleep(wait)

        except APIError as api_err:
            print(f"[Claude API] APIError: {api_err}. Not retrying.")
            raise api_err

        except Exception as e:
            print(f"[Claude API] Unexpected Error: {e}. Not retrying.")
            raise e

    # If all retries failed
    raise Exception("Claude API failed after multiple retry attempts.")

