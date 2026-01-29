from pydantic import BaseModel
from typing import Optional

class create_user_schema(BaseModel):
    full_name: str
    phone_no: str
    email: Optional[str] = None
    password: str
    
class login_user_schema(BaseModel):
    email: str
    password: str 

class UserRegistrationEmailRequest(BaseModel):
    full_name: str
    email: str

class send_otp_schema(BaseModel):
    receiver_email: str
    password_reset: Optional[bool] = False

class verify_email_otp_schema(BaseModel):
    email_otp: str
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    password: str