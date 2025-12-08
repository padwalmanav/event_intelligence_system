from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.mongo import get_documents, get_document_by_id, create_new_user
from schema.schemas import create_user_schema

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

@app.get('/test')
def test_api():
    return {"hello":"world"}

@app.get('/events')
def fetch_events():
    exhibitions = get_documents()
    return {
        "events": exhibitions
    }

@app.get('/events/{id}')
def fetch_event_by_id(id: str):
    exhibition = get_document_by_id(id)
    if exhibition:
        return {
            "event": exhibition
        }
    else:
        return {
            "event": "No event found"
        }

@app.post('/create-user')
def create_user(
    user: create_user_schema,
):
    try:
        new_user = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email_phone": user.email_phone,
            "password": user.password,
            "profession": user.profession,
            "location": user.location,
            "interests": user.interests,
        }

        user_created = create_new_user(new_user)
        if user_created:
            print("User id:", user_created)
            return {"success": "user created successfully"}
        else:
            print("Error:", user_created)
            return {"error": "Failed to create user"}
    except Exception as e:
        return {"error": f"Got error at create user api {str(e)}"}