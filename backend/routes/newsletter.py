from fastapi import HTTPException, Request
from pydantic import BaseModel, Field
from typing import Optional
import os
import uuid
from datetime import datetime, timezone
import re
import logging
import time

logger = logging.getLogger(__name__)

_nl_rate_limit = {}
NL_RATE_WINDOW = 600
NL_RATE_MAX = 5


def _check_nl_rate(ip: str) -> bool:
    now = time.time()
    if ip in _nl_rate_limit:
        entries = [t for t in _nl_rate_limit[ip] if now - t < NL_RATE_WINDOW]
        _nl_rate_limit[ip] = entries
        if len(entries) >= NL_RATE_MAX:
            return False
    _nl_rate_limit.setdefault(ip, []).append(now)
    return True


class NewsletterSubscribe(BaseModel):
    email: str = Field(..., min_length=5)
    locale: Optional[str] = "en"
    hp: Optional[str] = Field("", alias="_hp")

    model_config = {"populate_by_name": True}


def setup_newsletter_routes(router, db, send_email):
    @router.post("/newsletter/subscribe")
    async def newsletter_subscribe(body: NewsletterSubscribe, request: Request):
        # Anti-spam: Honeypot
        if body.hp:
            logger.warning(f"Newsletter spam blocked (honeypot): {body.email}")
            return {"ok": True, "message": "Subscribed successfully"}

        # Anti-spam: Rate limiting
        client_ip = request.headers.get("x-forwarded-for", request.client.host).split(",")[0].strip()
        if not _check_nl_rate(client_ip):
            logger.warning(f"Newsletter spam blocked (rate limit): {body.email} from {client_ip}")
            return {"ok": False, "message": "Too many requests"}

        if not re.match(r'\S+@\S+\.\S+', body.email):
            return {"ok": False, "message": "Invalid email"}
        existing = await db.newsletter.find_one({"email": body.email.lower()})
        if existing:
            return {"ok": True, "message": "Already subscribed"}
        doc = {
            "id": str(uuid.uuid4()),
            "email": body.email.lower(),
            "locale": body.locale,
            "subscribed_at": datetime.now(timezone.utc).isoformat(),
            "active": True,
        }
        await db.newsletter.insert_one(doc)
        logger.info(f"Newsletter subscription: {body.email}")

        welcome_html = """
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c9a84c, #a88a3a); padding: 24px 30px;">
                <h1 style="color: #0a0a0a; font-size: 18px; margin: 0;">Benvenuto nella Newsletter!</h1>
            </div>
            <div style="padding: 30px;">
                <p style="color: #ddd; font-size: 14px; line-height: 1.8;">Grazie per esserti iscritto alla newsletter di Mauro Ferrante Consulting Studio.</p>
                <p style="color: #999; font-size: 13px; line-height: 1.6;">Riceverai aggiornamenti su strategie di Project Management, Digital Marketing e Real Estate Investments, oltre a case study esclusivi e insights dal campo.</p>
            </div>
            <div style="padding: 16px 30px; background: #050505; text-align: center;">
                <p style="color: #444; font-size: 10px; margin: 0;">Mauro Ferrante Consulting Studio — mauroferranteconsulting.com</p>
            </div>
        </div>
        """
        await send_email("Benvenuto nella Newsletter — Mauro Ferrante Consulting", welcome_html, reply_to=body.email)
        return {"ok": True, "message": "Subscribed successfully"}

    @router.get("/newsletter/count")
    async def newsletter_count():
        count = await db.newsletter.count_documents({"active": True})
        return {"count": count}

    @router.get("/admin/newsletter")
    async def get_newsletter_subscribers(token: str = ""):
        import hashlib
        admin_pass = os.environ.get('ADMIN_PASS', '')
        admin_token = hashlib.sha256(admin_pass.encode()).hexdigest() if admin_pass else ''
        if not token or token != admin_token:
            from fastapi import HTTPException as HE
            raise HE(status_code=401, detail="Unauthorized")
        subs = await db.newsletter.find({"active": True}, {"_id": 0}).sort("subscribed_at", -1).to_list(500)
        return {"subscribers": subs, "total": len(subs)}
