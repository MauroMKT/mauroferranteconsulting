from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone
import urllib.parse
import re
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


class ContactForm(BaseModel):
    name: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    service: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)


class ContactResponse(BaseModel):
    ok: bool
    fallback: bool = False
    mailto: Optional[str] = None
    message: Optional[str] = None


def setup_contact_routes(router, db, send_email):
    @router.post("/contact", response_model=ContactResponse)
    async def submit_contact(form: ContactForm):
        if not re.match(r'\S+@\S+\.\S+', form.email):
            return ContactResponse(ok=False, message="Invalid email format")
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
            service_label = service_map.get(form.service, form.service)

            html_body = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #c9a84c, #a88a3a); padding: 24px 30px;">
                    <h1 style="color: #0a0a0a; font-size: 18px; margin: 0; font-weight: 700;">Nuovo Contatto dal Sito</h1>
                    <p style="color: #0a0a0a; font-size: 13px; margin: 4px 0 0 0; opacity: 0.8;">Mauro Ferrante Consulting Studio</p>
                </div>
                <div style="padding: 30px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; width: 120px;">Nome</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 14px; font-weight: 600;">{form.name}</td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #c9a84c; font-size: 14px;"><a href="mailto:{form.email}" style="color: #c9a84c; text-decoration: none;">{form.email}</a></td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Telefono</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 14px;">{form.phone}</td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px;">Servizio</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #c9a84c; font-size: 14px; font-weight: 600;">{service_label}</td></tr>
                    </table>
                    <div style="margin-top: 20px; padding: 16px; background: #111; border-radius: 8px; border-left: 3px solid #c9a84c;">
                        <p style="color: #888; font-size: 11px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px;">Messaggio</p>
                        <p style="color: #ddd; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">{form.message}</p>
                    </div>
                </div>
                <div style="padding: 16px 30px; background: #050505; text-align: center;">
                    <p style="color: #444; font-size: 10px; margin: 0;">Inviato dal form di contatto — mauroferranteconsulting.com</p>
                </div>
            </div>
            """

            email_sent = False
            email_sent = await send_email(subject, html_body, reply_to=form.email)
            if email_sent:
                logger.info(f"Email sent for contact from {form.name} ({form.email})")

            text_body = (
                f"NUOVO CONTATTO — Mauro Ferrante Consulting Studio\n\n"
                f"Nome: {form.name}\nEmail: {form.email}\nTelefono: {form.phone}\n"
                f"Area di interesse: {service_label}\n\nMessaggio:\n{form.message}"
            )
            mailto = (
                f"mailto:mauro@mauroferrante.com"
                f"?subject={urllib.parse.quote(subject)}"
                f"&body={urllib.parse.quote(text_body)}"
            )

            return ContactResponse(
                ok=True,
                fallback=not email_sent,
                mailto=mailto if not email_sent else None,
                message="Email sent successfully" if email_sent else "Message saved. Email delivery pending."
            )
        except Exception as e:
            logger.error(f"Contact form error: {e}")
            return ContactResponse(ok=False, message="Error saving message")

    @router.get("/contacts")
    async def get_contacts():
        contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        return contacts
