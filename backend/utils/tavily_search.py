import os
from tavily import TavilyClient
from dotenv import load_dotenv
load_dotenv()

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def tavily_web_search(prompt: str):
    response = tavily_client.search(prompt)
    return response

tavily_results = tavily_web_search("This is the event : DISEASE PREVENTION AND CONTROL SUMMIT AMERICA 2025 give me following keys of this event: summary,target_audience,skills_required,key_takeaways,agenda_themes,event_categories,keywords,technical_depth,business_relevance,networking_potential,value_insight,similar_events,best_use_cases,questions_to_ask,sentiment,quality_prediction,industry_impact")

print(tavily_results)