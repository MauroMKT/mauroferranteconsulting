from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

SMTP_HOST = os.environ.get('SMTP_HOST')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '465'))
SMTP_USER = os.environ.get('SMTP_USER')
SMTP_PASS = os.environ.get('SMTP_PASS')
SMTP_TO = os.environ.get('SMTP_TO')

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ─── SMTP Helper ──────────────────────────────────────────────

async def send_email(subject, html_body, reply_to=None):
    if not (SMTP_HOST and SMTP_USER and SMTP_PASS and SMTP_TO):
        return False
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = SMTP_TO
        if reply_to:
            msg["Reply-To"] = reply_to
        msg.attach(MIMEText(html_body, "html"))

        def _send():
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
                server.login(SMTP_USER, SMTP_PASS)
                server.sendmail(SMTP_USER, SMTP_TO, msg.as_string())

        await asyncio.to_thread(_send)
        return True
    except Exception as e:
        logger.error(f"SMTP error: {e}")
        return False


# ─── Register Route Modules ──────────────────────────────────

from routes.contact import setup_contact_routes
from routes.analytics import setup_analytics_routes
from routes.newsletter import setup_newsletter_routes

setup_contact_routes(api_router, db, send_email)
setup_analytics_routes(api_router, db, send_email)
setup_newsletter_routes(api_router, db, send_email)

@api_router.get("/")
async def root():
    return {"message": "Mauro Ferrante Consulting Studio API"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
