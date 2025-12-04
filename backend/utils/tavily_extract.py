import os 
from tavily import TavilyClient
from dotenv import load_dotenv
load_dotenv()

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
response = tavily_client.extract("https://www.eventseye.com/fairs/t1_trade-shows_ict-information-communications-technologies.html")

print(response)