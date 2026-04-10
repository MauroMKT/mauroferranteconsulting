from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
import uuid
from datetime import datetime, timezone
import urllib.parse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ContactForm(BaseModel):
    name: str
    phone: str
    email: str
    service: str
    message: str


class ContactResponse(BaseModel):
    ok: bool
    fallback: bool = False
    mailto: Optional[str] = None
    message: Optional[str] = None


@api_router.get("/")
async def root():
    return {"message": "Mauro Ferrante Consulting Studio API"}


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(form: ContactForm):
    try:
        service_map = {
            "pm": "Project Management",
            "digital": "Digital & Marketing",
            "re": "Real Estate",
            "other": "Altro / Other",
        }

        doc = {
            "id": str(uuid.uuid4()),
            "name": form.name,
            "phone": form.phone,
            "email": form.email,
            "service": service_map.get(form.service, form.service),
            "message": form.message,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "new"
        }
        await db.contacts.insert_one(doc)

        subject = f"[Contatto] {form.name} — Mauro Ferrante Consulting Studio"
        body = (
            f"NUOVO CONTATTO — Mauro Ferrante Consulting Studio\n\n"
            f"Nome: {form.name}\n"
            f"Email: {form.email}\n"
            f"Telefono: {form.phone}\n"
            f"Area di interesse: {service_map.get(form.service, form.service)}\n\n"
            f"Messaggio:\n{form.message}"
        )
        mailto = (
            f"mailto:mauro@mauroferrante.com"
            f"?subject={urllib.parse.quote(subject)}"
            f"&body={urllib.parse.quote(body)}"
        )

        return ContactResponse(
            ok=True,
            fallback=True,
            mailto=mailto,
            message="Message saved successfully"
        )
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        return ContactResponse(ok=False, message="Error saving message")


@api_router.get("/contacts")
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return contacts


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
