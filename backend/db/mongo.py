import os
from pymongo import MongoClient
from dotenv import load_dotenv
from typing import Dict
from datetime import datetime
from bson.objectid import ObjectId
load_dotenv()

connection = MongoClient(os.getenv("MONGO_URI"))

db = connection['intelligence_event_system']

def if_index_exists(exhibition_url):
    if db['events'].find_one({"exhibition_url": exhibition_url}):
        return True
    return False

def get_documents():
    docs = list(db['events'].find({}))
    for d in docs:
        d["_id"] = str(d["_id"])
    return docs

def insert_document(doc: Dict):
    try:
        doc['last_scrapped_at'] = datetime.utcnow()
        document = db['events'].insert_one(doc)
        return str(document.inserted_id)
    except Exception as e:
        print(f"Insertion failed: {str(e)}")

def delete_all_document():
    try:
        db['events'].delete_many({})
        print("Collection deleted successfully")
    except Exception as e:
        print(f"deletion failed: {str(e)}")

def get_document_by_id(id: str):
    try:
        document = db['events'].find_one({"_id":ObjectId(id)})
        if document:
            document["_id"] = str(document["_id"])
            return document
        else:
            return None
    except Exception as e:
        print(f"Failed to get document by id: {str(e)}")

# ---------------- User collection ----------------
def create_new_user(user: dict):
    try:
        new_user = db['users'].insert_one(user)
        return str(new_user.inserted_id)
    except Exception as e:
        return f"failed to insert user {str(e)}"

def get_all_users() -> dict:
    try:
        users = db['users'].find({})
        for user in users:
            user['_id'] = str(user['_id'])
        
        return {
            "data":users
        }
    except Exception as e:
        print(f"failed to get users from db, {str(e)}")
        return {"error":"failed to get users from db"}

def get_user_by_id(id: str) -> dict:
    try:
        user = db['users'].find_one({"id":id})
        user['_id'] = str(user['_id'])
        
        return {
            "data":user
        }
    except Exception as e:
        print(f"Failed to get user by id from db, {str(e)}")
        return {"error":"Failed to get user by id from db"}