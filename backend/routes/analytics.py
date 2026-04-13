from fastapi import HTTPException
from pydantic import BaseModel
from typing import Optional
import uuid
from datetime import datetime, timezone, timedelta
import asyncio
import hashlib
import os
import logging

logger = logging.getLogger(__name__)

ADMIN_PASS = os.environ.get('ADMIN_PASS', '')
ADMIN_TOKEN = hashlib.sha256(ADMIN_PASS.encode()).hexdigest() if ADMIN_PASS else ''


class TrackEvent(BaseModel):
    event: str
    page: Optional[str] = None
    metadata: Optional[dict] = None


class AdminLogin(BaseModel):
    password: str


def verify_admin(token: str):
    if not token or token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")


def setup_analytics_routes(router, db, send_email):
    @router.post("/track")
    async def track_event(evt: TrackEvent):
        doc = {
            "id": str(uuid.uuid4()),
            "event": evt.event,
            "page": evt.page or "/",
            "metadata": evt.metadata or {},
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        await db.analytics.insert_one(doc)

        if evt.event == "form_submit":
            total_forms = await db.analytics.count_documents({"event": "form_submit"})
            milestones = [5, 10, 25, 50, 100, 200, 500]
            if total_forms in milestones:
                asyncio.create_task(_send_milestone_notification(db, send_email, total_forms))

        return {"ok": True}

    async def _send_milestone_notification(db, send_email, count):
        now = datetime.now(timezone.utc)
        week_start = (now - timedelta(days=7)).isoformat()
        month_start = (now - timedelta(days=30)).isoformat()

        week_views = await db.analytics.count_documents({"event": "page_view", "timestamp": {"$gte": week_start}})
        month_views = await db.analytics.count_documents({"event": "page_view", "timestamp": {"$gte": month_start}})
        wa_clicks = await db.analytics.count_documents({"event": "whatsapp_click", "timestamp": {"$gte": month_start}})

        html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c9a84c, #a88a3a); padding: 24px 30px;">
                <h1 style="color: #0a0a0a; font-size: 20px; margin: 0;">Milestone Raggiunto!</h1>
                <p style="color: #0a0a0a; font-size: 13px; margin: 4px 0 0 0; opacity: 0.8;">{count} contatti ricevuti dal sito</p>
            </div>
            <div style="padding: 30px;">
                <p style="color: #ddd; font-size: 16px; margin: 0 0 20px 0;">Hai raggiunto <strong style="color: #c9a84c;">{count}</strong> richieste di contatto dal tuo sito web!</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 12px 16px; background: #111; border-radius: 8px 8px 0 0; color: #888; font-size: 12px;">Visite Settimana</td><td style="padding: 12px 16px; background: #111; border-radius: 8px 8px 0 0; color: #fff; font-size: 18px; font-weight: bold; text-align: right;">{week_views}</td></tr>
                    <tr><td style="padding: 12px 16px; background: #0f0f0f; color: #888; font-size: 12px;">Visite Mese</td><td style="padding: 12px 16px; background: #0f0f0f; color: #fff; font-size: 18px; font-weight: bold; text-align: right;">{month_views}</td></tr>
                    <tr><td style="padding: 12px 16px; background: #111; color: #888; font-size: 12px;">WhatsApp Click Mese</td><td style="padding: 12px 16px; background: #111; color: #25D366; font-size: 18px; font-weight: bold; text-align: right;">{wa_clicks}</td></tr>
                    <tr><td style="padding: 12px 16px; background: #0f0f0f; border-radius: 0 0 8px 8px; color: #888; font-size: 12px;">Form Totali</td><td style="padding: 12px 16px; background: #0f0f0f; border-radius: 0 0 8px 8px; color: #c9a84c; font-size: 18px; font-weight: bold; text-align: right;">{count}</td></tr>
                </table>
            </div>
            <div style="padding: 16px 30px; background: #050505; text-align: center;">
                <p style="color: #444; font-size: 10px; margin: 0;">Notifica automatica — mauroferranteconsulting.com</p>
            </div>
        </div>
        """
        await send_email(f"Milestone: {count} contatti ricevuti!", html)
        logger.info(f"Milestone notification sent: {count} contacts")

    @router.post("/admin/send-report")
    async def send_weekly_report(token: str = ""):
        verify_admin(token)
        now = datetime.now(timezone.utc)
        week_start = (now - timedelta(days=7)).isoformat()
        month_start = (now - timedelta(days=30)).isoformat()

        week_views = await db.analytics.count_documents({"event": "page_view", "timestamp": {"$gte": week_start}})
        week_forms = await db.analytics.count_documents({"event": "form_submit", "timestamp": {"$gte": week_start}})
        week_wa = await db.analytics.count_documents({"event": "whatsapp_click", "timestamp": {"$gte": week_start}})
        week_cta = await db.analytics.count_documents({"event": "cta_click", "timestamp": {"$gte": week_start}})
        week_email = await db.analytics.count_documents({"event": "email_click", "timestamp": {"$gte": week_start}})
        month_views = await db.analytics.count_documents({"event": "page_view", "timestamp": {"$gte": month_start}})
        month_forms = await db.analytics.count_documents({"event": "form_submit", "timestamp": {"$gte": month_start}})
        total_contacts = await db.contacts.count_documents({})
        conv_rate = round((week_forms / week_views * 100), 1) if week_views > 0 else 0

        pipeline = [
            {"$match": {"event": "page_view", "timestamp": {"$gte": week_start}}},
            {"$group": {"_id": "$page", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 5},
        ]
        top_pages = await db.analytics.aggregate(pipeline).to_list(5)
        pages_html = "".join([f'<tr><td style="padding: 8px 12px; color: #aaa; font-size: 13px;">{p["_id"]}</td><td style="padding: 8px 12px; color: #fff; font-size: 13px; text-align: right; font-weight: bold;">{p["count"]}</td></tr>' for p in top_pages])

        recent = await db.contacts.find({"created_at": {"$gte": week_start}}, {"_id": 0}).sort("created_at", -1).to_list(10)
        contacts_html = "".join([f'<tr><td style="padding: 8px 12px; color: #ddd; font-size: 13px;">{c["name"]}</td><td style="padding: 8px 12px; color: #c9a84c; font-size: 13px;">{c["email"]}</td><td style="padding: 8px 12px; color: #888; font-size: 12px;">{c["service"]}</td></tr>' for c in recent])

        html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c9a84c, #a88a3a); padding: 24px 30px;">
                <h1 style="color: #0a0a0a; font-size: 18px; margin: 0;">Report Settimanale</h1>
                <p style="color: #0a0a0a; font-size: 13px; margin: 4px 0 0 0; opacity: 0.8;">Mauro Ferrante Consulting Studio — {now.strftime('%d/%m/%Y')}</p>
            </div>
            <div style="padding: 30px;">
                <h2 style="color: #c9a84c; font-size: 14px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px;">Panoramica Settimana</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <tr><td style="padding: 12px 16px; background: #111; border-radius: 8px 8px 0 0; color: #888; font-size: 13px;">Visite</td><td style="padding: 12px 16px; background: #111; border-radius: 8px 8px 0 0; color: #fff; font-size: 20px; font-weight: bold; text-align: right;">{week_views}</td></tr>
                    <tr><td style="padding: 12px 16px; background: #0f0f0f; color: #888; font-size: 13px;">Form Contatto</td><td style="padding: 12px 16px; background: #0f0f0f; color: #25D366; font-size: 20px; font-weight: bold; text-align: right;">{week_forms}</td></tr>
                    <tr><td style="padding: 12px 16px; background: #111; color: #888; font-size: 13px;">Tasso Conversione</td><td style="padding: 12px 16px; background: #111; color: #c9a84c; font-size: 20px; font-weight: bold; text-align: right;">{conv_rate}%</td></tr>
                    <tr><td style="padding: 12px 16px; background: #0f0f0f; color: #888; font-size: 13px;">WhatsApp Click</td><td style="padding: 12px 16px; background: #0f0f0f; color: #25D366; font-size: 20px; font-weight: bold; text-align: right;">{week_wa}</td></tr>
                    <tr><td style="padding: 12px 16px; background: #111; color: #888; font-size: 13px;">CTA Click</td><td style="padding: 12px 16px; background: #111; color: #3b82f6; font-size: 20px; font-weight: bold; text-align: right;">{week_cta}</td></tr>
                    <tr><td style="padding: 12px 16px; background: #0f0f0f; border-radius: 0 0 8px 8px; color: #888; font-size: 13px;">Email Click</td><td style="padding: 12px 16px; background: #0f0f0f; border-radius: 0 0 8px 8px; color: #f59e0b; font-size: 20px; font-weight: bold; text-align: right;">{week_email}</td></tr>
                </table>
                <h2 style="color: #c9a84c; font-size: 14px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px;">Pagine Top 5</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #111; border-radius: 8px; overflow: hidden;">
                    {pages_html if pages_html else '<tr><td style="padding: 12px; color: #555; font-size: 13px;">Nessun dato</td></tr>'}
                </table>
                {"<h2 style='color: #c9a84c; font-size: 14px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px;'>Nuovi Contatti</h2><table style='width: 100%; border-collapse: collapse; background: #111; border-radius: 8px; overflow: hidden;'>" + contacts_html + "</table>" if contacts_html else ""}
                <div style="margin-top: 24px; padding: 16px; background: #111; border-radius: 8px; text-align: center;">
                    <p style="color: #888; font-size: 12px; margin: 0;">Totale contatti: <strong style="color: #c9a84c;">{total_contacts}</strong> | Visite mese: <strong style="color: #fff;">{month_views}</strong> | Form mese: <strong style="color: #25D366;">{month_forms}</strong></p>
                </div>
            </div>
            <div style="padding: 16px 30px; background: #050505; text-align: center;">
                <p style="color: #444; font-size: 10px; margin: 0;">Report automatico — mauroferranteconsulting.com</p>
            </div>
        </div>
        """
        sent = await send_email(f"Report Settimanale — {now.strftime('%d/%m/%Y')}", html)
        return {"ok": sent, "message": "Report sent" if sent else "Failed to send report"}

    @router.post("/admin/login")
    async def admin_login(body: AdminLogin):
        if body.password == ADMIN_PASS:
            return {"ok": True, "token": ADMIN_TOKEN}
        raise HTTPException(status_code=401, detail="Invalid password")

    @router.get("/admin/stats")
    async def admin_stats(token: str = ""):
        verify_admin(token)
        now = datetime.now(timezone.utc)
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
        week_start = (now - timedelta(days=7)).isoformat()
        month_start = (now - timedelta(days=30)).isoformat()

        total_events = await db.analytics.count_documents({})
        today_views = await db.analytics.count_documents({"event": "page_view", "timestamp": {"$gte": today_start}})
        week_views = await db.analytics.count_documents({"event": "page_view", "timestamp": {"$gte": week_start}})
        month_views = await db.analytics.count_documents({"event": "page_view", "timestamp": {"$gte": month_start}})

        today_conversions = await db.analytics.count_documents({"event": "form_submit", "timestamp": {"$gte": today_start}})
        week_conversions = await db.analytics.count_documents({"event": "form_submit", "timestamp": {"$gte": week_start}})
        month_conversions = await db.analytics.count_documents({"event": "form_submit", "timestamp": {"$gte": month_start}})

        wa_clicks = await db.analytics.count_documents({"event": "whatsapp_click", "timestamp": {"$gte": month_start}})
        email_clicks = await db.analytics.count_documents({"event": "email_click", "timestamp": {"$gte": month_start}})
        cta_clicks = await db.analytics.count_documents({"event": "cta_click", "timestamp": {"$gte": month_start}})

        pipeline_pages = [
            {"$match": {"event": "page_view", "timestamp": {"$gte": month_start}}},
            {"$group": {"_id": "$page", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 10},
        ]
        top_pages = await db.analytics.aggregate(pipeline_pages).to_list(10)
        top_pages_clean = [{"page": p["_id"], "count": p["count"]} for p in top_pages]

        daily_data = []
        for i in range(13, -1, -1):
            day = now - timedelta(days=i)
            day_start = day.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
            day_end = (day.replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(days=1)).isoformat()
            views = await db.analytics.count_documents({"event": "page_view", "timestamp": {"$gte": day_start, "$lt": day_end}})
            conversions = await db.analytics.count_documents({"event": "form_submit", "timestamp": {"$gte": day_start, "$lt": day_end}})
            daily_data.append({"date": day.strftime("%d/%m"), "views": views, "conversions": conversions})

        pipeline_events = [
            {"$match": {"timestamp": {"$gte": month_start}}},
            {"$group": {"_id": "$event", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
        ]
        event_breakdown = await db.analytics.aggregate(pipeline_events).to_list(20)
        events_clean = [{"event": e["_id"], "count": e["count"]} for e in event_breakdown]

        recent_contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(10)

        conversion_rate_week = round((week_conversions / week_views * 100), 1) if week_views > 0 else 0
        conversion_rate_month = round((month_conversions / month_views * 100), 1) if month_views > 0 else 0

        return {
            "overview": {
                "total_events": total_events,
                "today": {"views": today_views, "conversions": today_conversions},
                "week": {"views": week_views, "conversions": week_conversions, "conversion_rate": conversion_rate_week},
                "month": {"views": month_views, "conversions": month_conversions, "conversion_rate": conversion_rate_month},
            },
            "actions": {"whatsapp_clicks": wa_clicks, "email_clicks": email_clicks, "cta_clicks": cta_clicks},
            "top_pages": top_pages_clean,
            "daily": daily_data,
            "events": events_clean,
            "recent_contacts": recent_contacts,
        }
