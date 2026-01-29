import os
from datetime import datetime, timedelta
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

from db.mongo import get_documents, get_document_by_id, create_new_user, check_user_isPresent, get_users_count, check_email_present, reset_email_password
from schema.schemas import create_user_schema, login_user_schema, UserRegistrationEmailRequest, send_otp_schema, verify_email_otp_schema, ResetPasswordRequest
from utils.email_otp_verification.send_otp import send_email_otp
from utils.email_otp_verification.generate_otp import generate_email_otp
from utils.email_smtp.registration_email import send_registration_email
from constants import messages

otp_store = {}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["https://event-intelligence-system.vercel.app","http://localhost:5173","https://www.myeventsiq.com", "https://events.myeventsiq.com"],
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
        new_user = {
            "full_name":user.full_name,
            "phone_no":user.phone_no,
            "email":user.email,
            "password":user.password
        }

        user_created = create_new_user(new_user)
        if user_created['is_present']:
            return {"message": "present"}
        elif user_created['is_present'] == False:
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
            'email': user.email,
            'password': user.password
        })

        if user['is_present'] == True and user['password_match'] == True:
            return {
                'message':'success',
                'user_id':user['user_id']
            }
        elif user['is_present'] == True and user['password_match'] == False:
            return {'message':'password'}
        else:
            return {'message':'fail'}
    except Exception as e:
        print(f"Error at login api: {str(e)}")

@app.post('/send-otp')
def send_email_otp_to_user(payload: send_otp_schema):
    try:
        if payload.password_reset:
            email = check_email_present(payload.receiver_email)
            if email['is_present'] == False:
                return {"message":"email not found"}
            
        generated_otp = generate_email_otp()

        otp_store[payload.receiver_email] = {
            "otp": generated_otp,
            "expiry": datetime.utcnow() + timedelta(minutes=5)
        }

        send_email_otp(payload.receiver_email, generated_otp)

        return {"message": "success"}

    except Exception as e:
        print(f"Something went wrong: {str(e)}")
        return {"message": "fail"}

@app.post('/verify-email-otp')
def verify_email_otp(payload: verify_email_otp_schema):
    data = otp_store.get(payload.email)

    if not data:
        return {"message": "otp not found"}

    if datetime.utcnow() > data["expiry"]:
        otp_store.pop(payload.email, None)
        return {"message": "expired"}

    if data["otp"] == payload.email_otp:
        otp_store.pop(payload.email, None) 
        return {"message": "success"}

    return {"message": "invalid"}

@app.post('/user-registration-email')
def send_email_on_new_user_registration(
    payload: UserRegistrationEmailRequest
):
    try:
        users_count = get_users_count()
        name_list = payload.full_name.strip().split(" ")
        first_name = name_list[0]

        send_registration_email(receiver_email=payload.email, body=messages.send_confirmation_body_to_user(first_name), subject=messages.send_subject_to_user)
        send_registration_email(receiver_email=os.getenv("RECEIVER_EMAIL"), body=messages.send_confirmation_body_to_admin(user_count=users_count), subject=messages.send_subject_to_admin)
            
        return {"message":"Email Sent successfully"}
    except Exception as e:
        print(f"Failed to send confirmation email on new user signup, {str(e)}")

@app.post("/reset-password")
def reset_password(payload: ResetPasswordRequest):
    result = reset_email_password({
        "email": payload.email,
        "password": payload.password
    })

    if result["status"] == "error":
        return {"error": result["error"]}

    if result["status"] == "fail":
        return {"error": "Email not found"}

    return {"message": "Password Reset successful"}
