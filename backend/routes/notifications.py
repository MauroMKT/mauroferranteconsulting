from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import requests

router = APIRouter(prefix="/notifications", tags=["notifications"])

ONESIGNAL_APP_ID = os.environ.get("ONESIGNAL_APP_ID", "")
ONESIGNAL_API_KEY = os.environ.get("ONESIGNAL_API_KEY", "")
ONESIGNAL_API_URL = "https://api.onesignal.com/notifications"


class NotificationRequest(BaseModel):
    title: str
    message: str
    url: Optional[str] = None
    segment: Optional[str] = "Subscribed Users"


@router.post("/send")
async def send_notification(req: NotificationRequest):
    if not ONESIGNAL_APP_ID or not ONESIGNAL_API_KEY:
        raise HTTPException(status_code=503, detail="OneSignal not configured")

    payload = {
        "app_id": ONESIGNAL_APP_ID,
        "target_channel": "push",
        "included_segments": [req.segment],
        "contents": {"en": req.message},
        "headings": {"en": req.title},
    }

    if req.url:
        payload["web_url"] = req.url

    try:
        resp = requests.post(
            ONESIGNAL_API_URL,
            json=payload,
            headers={
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": f"Key {ONESIGNAL_API_KEY}",
            },
            timeout=10,
        )
        data = resp.json()
        if resp.status_code >= 400:
            raise HTTPException(status_code=resp.status_code, detail=data)
        return {"status": "sent", "recipients": data.get("recipients", 0), "id": data.get("id", "")}
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/status")
async def notification_status():
    configured = bool(ONESIGNAL_APP_ID and ONESIGNAL_API_KEY)
    return {"configured": configured}
