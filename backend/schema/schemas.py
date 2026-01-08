from pydantic import BaseModel
from typing import Optional

# class insert_document_schema(BaseModel):
#     exhibition_url: str
#     title: str
#     description: Optional[str]
#     related_industries: Optional[List[str]]
#     audience: Optional[str]
#     cycle: Optional[str]
#     date: str
#     city: str
#     venue: Optional[str]
#     venue_website: Optional[str]
#     venue_phone: str
#     venue_fax: str
#     organizers: List[dict]
#     last_scrapped_at: datetime

class create_user_schema(BaseModel):
    full_name: str
    phone_no: str
    email: Optional[str] = None
    password: str
    
class login_user_schema(BaseModel):
    phone_no: str
    password: str 