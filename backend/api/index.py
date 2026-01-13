from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.mongo import get_documents, get_document_by_id, create_new_user, check_user_isPresent
from schema.schemas import create_user_schema, login_user_schema
from utils.bcrypt_password import encrypt_password

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["https://event-intelligence-system.vercel.app","http://localhost:5173","https://www.myeventsiq.com"],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

@app.get('/test')
def test_api():
    return {"message":"Hello"}

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
        hashed_password = encrypt_password(user.password)

        new_user = {
            "full_name":user.full_name,
            "phone_no":user.phone_no,
            "email":user.email,
            "password":hashed_password
        }

        user_created = create_new_user(new_user)
        if user_created['is_present']:
            return {"message": "present"}
        elif user_created['is_present'] == False:
            print("User id:", user_created)
            return {"message": "success"}
        else:
            return {"message": "fail"}
    except Exception as e:
        print(f"Got error at create user api {str(e)}")
    

@app.post('/login')
def check_user(
    user: login_user_schema
):
    try:
        user = check_user_isPresent({
            'phone_no': user.phone_no,
            'password': user.password
        })

        if user['is_present'] == True and user['password_match'] == True:
            return {'message':'success'}
        elif user['is_present'] == True and user['password_match'] == False:
            return {'message':'password'}
        else:
            return {'message':'fail'}
    except Exception as e:
        print(f"Error at login api: {str(e)}")