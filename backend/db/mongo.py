import os
from pymongo import MongoClient
from dotenv import load_dotenv
from typing import Dict
from datetime import datetime
from bson.objectid import ObjectId
load_dotenv()

from utils.bcrypt_password import encrypt_password, check_password

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
        is_present = db['users'].find_one({'email':user['email']})
        if is_present:
            return {
                'is_present': True
            }
        else:
            user['password'] = encrypt_password(user['password'])
            new_user = db['users'].insert_one(user)
            
            return {
                'is_present': False,
                'user_id': str(new_user.inserted_id),
            }
    except Exception as e:
        print(f"failed to insert user {str(e)}")
        return None

def check_user_isPresent(user: dict):
    try:
        is_present = db['users'].find_one({'email':user['email']})
        if is_present:
            hashed_password = is_present['password']
            if check_password(user['password'], hashed_password):
                user_first_name = is_present['full_name'].split(" ")[0]

                return {
                    'is_present': True,
                    'password_match': True,
                    'user_id':str(is_present['_id']),
                    'user_first_name':user_first_name
                }
            else:
                return {
                    'is_present': True,
                    'password_match': False
                }
        else:
            return {
                'is_present': False
            }
    except Exception as e:
        print(f"Error while checking user in db:{str(e)}")
        return {"error":f"error while checking if user is present, {str(e)[0,20]}"}

def check_email_present(email: str) -> dict:
    try:
        user = db['users'].find_one({'email':email})
        if user:
            return{"is_present":True}
        else:
            return {"is_present":False}

    except Exception as e:
        print(f"Error while checking if email is present:{str(e)}")
        return {"error":f"failed to check if user is present, {str(e)[0,20]}"}

def reset_email_password(user: dict) -> dict:
    try:
        hashed_password = encrypt_password(user['password'])

        result = db['users'].update_one(
            {"email": user["email"]},
            {"$set": {"password": hashed_password}}
        )

        if result.matched_count == 0:
            return {
                "status": "fail",
                "message": "Email not found"
            }

        return {
            "status": "success",
            "message": "Password reset successful"
        }

    except Exception as e:
        print(f"Error while reset password: {str(e)}")
        return {
            "status": "error",
            "error": "Failed to reset password"
        }

def get_all_users() -> dict:
    users = []
    try:
        users_cursor = db['users'].find({})
        for user in users_cursor:
            user['_id'] = str(user['_id'])
            users.append(user)
        
        return {
            "data":users
        }
    except Exception as e:
        print(f"failed to get users from db, {str(e)}")
        return {"error":f"failed to get users from db,{str(e)[0,20]}"}

def get_users_count():
    try:
        count = db['users'].count_documents({})
        return count
    except Exception as e:
        print(f"Failed to get count of users, {str(e)}")
        return {"error":f"failed to get user count from db,{str(e)[0,20]}"}

def get_user_by_id(id: str) -> dict:
    try:
        user = db['users'].find_one({"id":id})
        user['_id'] = str(user['_id'])
        
        return {
            "data":user
        }
    except Exception as e:
        print(f"Failed to get user by id from db, {str(e)}")
        return {"error":f"Failed to get user by id from db, {str(e)[0,20]}"}