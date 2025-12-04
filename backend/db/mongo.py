import os
from pymongo import MongoClient
from dotenv import load_dotenv
from typing import Dict
from datetime import datetime
from bson.objectid import ObjectId
load_dotenv()

connection = MongoClient(os.getenv("MONGO_URI"))

db = connection['intelligence_event_system']
collection = db['events']
collection.create_index("exhibition_url", unique=True)

def if_index_exists(exhibition_url):
    if collection.find_one({"exhibition_url": exhibition_url}):
        return True
    return False

def get_documents():
    docs = list(collection.find({}))
    for d in docs:
        d["_id"] = str(d["_id"])
    # print(docs)
    return docs

def insert_document(doc: Dict):
    try:
        doc['last_scrapped_at'] = datetime.utcnow()
        document = collection.insert_one(doc)
        return str(document.inserted_id)
    except Exception as e:
        print(f"Insertion failed: {str(e)}")

def delete_all_document():
    try:
        collection.delete_many({})
        print("Collection deleted successfully")
    except Exception as e:
        print(f"deletion failed: {str(e)}")

def get_document_by_id(id: str):
    try:
        document = collection.find_one({"_id":ObjectId(id)})
        if document:
            document["_id"] = str(document["_id"])
            return document
        else:
            return None
    except Exception as e:
        print(f"Failed to get document by id: {str(e)}")