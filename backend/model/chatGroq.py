import os
from groq import Groq
from constants.prompts import llm_interface

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_groq_model(prompt: str):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f"You are a helpful assistant. You will be provided with an event details and you are supposed to do a web search and look for more information regarding that event. please fill out and provide a response in the below given format \n {llm_interface} \n Strictly respond in JSON format"
            },
            {
                "role": "user",
                "content": f"Find the event details provided below: \n{prompt}\n Respond Strictly in JSON format",
            }
        ],
        model="llama-3.3-70b-versatile"
    )
    return chat_completion.choices[0].message.content