import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client['intelligence_event_system']

def fetch_users():
    try:
        users_list = []
        users = db['users'].find({})
        for user in users:
            user['_id'] = str(user['_id'])
            users_list.append(user)

        return {
            "users": users_list
        }
    except Exception as e:
        return {
            "error": f"Failed to fetch users from db, {str(e)}"
        }