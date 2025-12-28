scraped_data_parser = """
You are supposed to go through the above json data and do the following changes in it:-
- In the above json there will be date, if date is in range consider the date range, you must identify day, month, year from that json and add 3 keys day, month, year and fill those for example:
{
  "date":"",
  "day":"",                  // if not specified keep this null
  "month":"",                // must be a month name (eg: Jan, Feb, Mar,....)
  "year":"",                
}
you must add these in the above json and return the final JSON only
"""

llm_interface = """
{
  "value_insight": "",
  "learnings": [],              // 5-6 learnings
  "target_audience": [],        // 5-6 target audiences
  "no_of_attendes": int         // number of candidates who have enrolled for this event out of total if not present N/A
  "speakers_count": int,        // count of speakers, if not present null
  "speakers": [],               // name of speakers for this event
  "event_highlights": []        // 5-6 highlights
  "skills_required": [],        // 5-6 skills
  "agenda_themes": [],          // 5-6 themes
  "domain_categories": [],      // 5-6 categories
  "technical_depth": "low | medium | high", 
  "business_relevance": "low | medium | high",
  "networking_potential": "low | medium | high",
  "best_use_cases": [],         // 5-6 best use cases
  "industry_impact": "low | medium | high",
}
"""

event_interface = """
{
  "title": "",
  "domains": [],
  "date": "",
  "location": "",
  "eventCenter": "",
  "registeredUsersCount": "",
  "overview": {
    "about": "",
    "learnings": [],
    "shouldAttend": [],
    "highlights": {
      "attendees": "",
      "sessions": "",
      "exhibitors": "",
      "speakers": "",
      "networking": "",
      "workshops": ""
    },
    "organizer": ""
  },
  "speakers": [
    {
      "name": "",
      "designation": "",
      "day": ""
    },
    {
      "name": "",
      "designation": "",
      "day": "",
      "time": ""
    },
    ....
  ],
  "agenda": [
    {
      "day": "",
      "type": "",
      "events": [
        {
          "time": "",
          "event": ""
        },
        {
          "time": "",
          "event": ""
        },
        {
          "time": "",
          "event": ""
        }
      ]
    },
    {
      "day": "",
      "type": "",
      "events": [
        {
          "time": "",
          "event": ""
        },
        {
          "time": "",
          "event": ""
        },
        {
          "time": "",
          "event": ""
        }
      ]
    },
    ....
  ],
  "network": {
    "attendeeProfiles": {
      "seniorLevel": "",
      "seniorLevelDescription": "",
      "buyingInfluence": "",
      "buyingInfluenceDescription": ""
    }
  },
  "insights": {
    "roleDistribution": [
      {
        "role": "",
        "percentage": ""
      },
      {
        "role": "",
        "percentage": ""
      },
      ....
    ],
    "topCompanies": []
  }
}
"""