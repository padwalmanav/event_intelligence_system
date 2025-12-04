from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.mongo import get_documents, get_document_by_id

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