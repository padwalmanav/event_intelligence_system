from pydantic import BaseModel
from typing import Optional

class create_user_schema(BaseModel):
    full_name: str
    phone_no: str
    email: Optional[str] = None
    password: str
    
class login_user_schema(BaseModel):
    phone_no: str
    password: str 