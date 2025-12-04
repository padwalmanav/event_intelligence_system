import requests
import json

url = "https://google.serper.dev/search"

payload = json.dumps({
  "q": "This is the event : DISEASE PREVENTION AND CONTROL SUMMIT AMERICA 2025 give me following keys of this event: summary,target_audience,skills_required,key_takeaways,agenda_themes,event_categories,keywords,technical_depth,business_relevance,networking_potential,value_insight,similar_events,best_use_cases,questions_to_ask,sentiment,quality_prediction,industry_impact"
})
headers = {
  'X-API-KEY': 'cda952a25e5f5f7811e47f7be5b8f2f151ac7f3f',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(type(response.text))

json_response = json.loads(response.text)
print(type(json_response))

full_text = ""
for sources in json_response.get('organic',[]):
    full_text += sources.get('snippet','') 
 
print(full_text)