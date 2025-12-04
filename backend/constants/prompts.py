scraped_data_parser = """
You are supposed to go through the above json data and do the following changes in it:-
- In the above json there will be date, you must identify day, month, year from that json and add 3 keys day, month, year and fill those for example:
{
  "date":"",
  "day":"",                  // if not specified keep this null
  "month":"",                // must be a month name (eg: Jan, Feb, ....)
  "year":"",                
}
you must add these in the above json and return the final JSON only
"""

llm_interface = """
{
  "about_this_event": "",
  "learnings": [],
  "target_audience": "",
  "no_of_attendes": int       // number of candidates who have enrolled for this event out of total if not present N/A
  "speakers_count": int,      // count of speakers, if not present null
  "speakers": [],             // name of speakers for this event
  "event_highlights": []
  "skills_required": [],
  "agenda_themes": [],
  "domain_categories": [],
  "technical_depth": "low | medium | high",
  "business_relevance": "low | medium | high",
  "networking_potential": "low | medium | high",
  "value_insight": "",
  "best_use_cases": [],
  "sentiment": "",
  "industry_impact": "low | medium | high",
}
"""
