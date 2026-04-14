import { useState, useEffect, useCallback } from "react";
import { Bell, BellOff, BellRing, X } from "lucide-react";
import { t } from "@/lib/i18n";

const ONESIGNAL_APP_ID = process.env.REACT_APP_ONESIGNAL_APP_ID;

export default function NotificationBell({ locale }) {
  const [permission, setPermission] = useState("default");
  const [showPrompt, setShowPrompt] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!ONESIGNAL_APP_ID || typeof window === "undefined") return;

    const initOneSignal = async () => {
      try {
        const OneSignal = (await import("react-onesignal")).default;
        await OneSignal.init({
          appId: ONESIGNAL_APP_ID,
          allowLocalhostAsSecureOrigin: window.location.hostname === "localhost",
          notifyButton: { enable: false },
        });
        setSdkReady(true);

        const currentPermission = window.Notification?.permission || "default";
        setPermission(currentPermission);

        if (currentPermission === "default") {
          const alreadyDismissed = sessionStorage.getItem("mfc-notif-dismissed");
          if (!alreadyDismissed) {
            setTimeout(() => setShowPrompt(true), 15000);
          }
        }
      } catch (err) {
        console.warn("OneSignal init failed:", err);
      }
    };

    initOneSignal();
  }, []);

  const handleSubscribe = useCallback(async () => {
    if (!sdkReady) return;
    try {
      const OneSignal = (await import("react-onesignal")).default;
      await OneSignal.Notifications.requestPermission();
      const newPerm = window.Notification?.permission || "default";
      setPermission(newPerm);
      setShowPrompt(false);
    } catch (err) {
      console.warn("Permission request failed:", err);
    }
  }, [sdkReady]);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    setDismissed(true);
    sessionStorage.setItem("mfc-notif-dismissed", "1");
  }, []);

  if (!ONESIGNAL_APP_ID) return null;

  return (
    <>
      {/* Floating Bell Button */}
      <button
        onClick={permission === "granted" ? undefined : handleSubscribe}
        className={`fixed bottom-24 left-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          permission === "granted"
            ? "bg-[#c9a84c]/20 border border-[#c9a84c]/30 cursor-default"
            : "bg-[#c9a84c] hover:bg-[#d4b85d] cursor-pointer hover:scale-110"
        }`}
        data-testid="notification-bell-btn"
        title={t(locale, permission === "granted" ? "notif_subscribed" : "notif_subscribe")}
      >
        {permission === "granted" ? (
          <BellRing className="w-5 h-5 text-[#c9a84c]" />
        ) : permission === "denied" ? (
          <BellOff className="w-5 h-5 text-white/50" />
        ) : (
          <Bell className="w-5 h-5 text-[#0a0a0a]" />
        )}
      </button>

      {/* Soft Prompt Popup */}
      {showPrompt && !dismissed && permission === "default" && (
        <div
          className="fixed bottom-40 left-6 z-50 bg-[#111] border border-white/10 rounded-2xl p-5 max-w-xs shadow-2xl animate-in slide-in-from-bottom-4 duration-500"
          data-testid="notification-prompt"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-white/30 hover:text-white/60 transition-colors"
            data-testid="notification-prompt-close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">{t(locale, "notif_prompt_title")}</h4>
              <p className="text-white/40 text-xs mt-1 leading-relaxed">{t(locale, "notif_prompt_desc")}</p>
            </div>
          </div>
          <button
            onClick={handleSubscribe}
            className="w-full mt-4 bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-semibold text-xs px-4 py-2.5 rounded-lg transition-all duration-300"
            data-testid="notification-prompt-subscribe-btn"
          >
            {t(locale, "notif_prompt_cta")}
          </button>
        </div>
      )}
    </>
  );
}
