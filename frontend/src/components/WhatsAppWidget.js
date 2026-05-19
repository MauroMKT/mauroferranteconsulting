import { useState, useEffect } from "react";
import { X } from "lucide-react";

const WhatsAppIconSvg = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

export default function WhatsAppWidget({ locale }) {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("mfc-wa-dismissed")) {
      setBubbleDismissed(true);
      return;
    }
    const timer = setTimeout(() => setShowBubble(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const dismissBubble = () => {
    setShowBubble(false);
    setBubbleDismissed(true);
    sessionStorage.setItem("mfc-wa-dismissed", "1");
  };

  const bubbleText = locale === "it" ? "Ciao! Come posso aiutarti?" : locale === "es" ? "Hola! Como puedo ayudarte?" : locale === "fr" ? "Bonjour! Comment puis-je vous aider?" : locale === "de" ? "Hallo! Wie kann ich Ihnen helfen?" : "Hi! How can I help you?";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" data-testid="whatsapp-widget">
      {/* Chat bubble popup */}
      {showBubble && !bubbleDismissed && !open && (
        <div className="relative bg-white rounded-2xl rounded-br-sm shadow-2xl p-4 max-w-[220px] animate-in slide-in-from-bottom-4 duration-500" data-testid="wa-bubble">
          <button onClick={dismissBubble} className="absolute -top-2 -right-2 w-6 h-6 bg-[#111] rounded-full flex items-center justify-center" aria-label="Close">
            <X className="w-3 h-3 text-white" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
              <WhatsAppIconSvg className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-[#111] text-xs font-bold">Mauro Ferrante</div>
              <div className="text-[#25D366] text-[10px] flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />Online</div>
            </div>
          </div>
          <p className="text-[#333] text-sm leading-relaxed">{bubbleText}</p>
          <button
            onClick={() => { dismissBubble(); window.open("https://wa.me/393491177007", "_blank"); }}
            className="mt-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
            data-testid="wa-bubble-reply"
          >
            {locale === "it" ? "Rispondi" : locale === "es" ? "Responder" : locale === "fr" ? "Repondre" : locale === "de" ? "Antworten" : "Reply"}
          </button>
        </div>
      )}

      {/* Number selector */}
      <div className={`flex flex-col gap-2 transition-all duration-300 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <button onClick={() => { setOpen(false); window.open("https://wa.me/393491177007", "_blank"); }}
          className="flex items-center gap-3 bg-[#111] border border-[#c9a84c]/25 hover:border-[#c9a84c]/60 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-[#161616] cursor-pointer w-full text-left" data-testid="wa-widget-eu">
          <div className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center">
            <WhatsAppIconSvg className="w-4 h-4 text-[#25D366]" />
          </div>
          <div>
            <div className="text-white text-sm font-medium">Europa & Asia</div>
            <div className="text-white/50 text-[10px]">+39 349 117 7007</div>
          </div>
        </button>
        <button onClick={() => { setOpen(false); window.open("https://wa.me/51964243686", "_blank"); }}
          className="flex items-center gap-3 bg-[#111] border border-[#c9a84c]/25 hover:border-[#c9a84c]/60 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-[#161616] cursor-pointer w-full text-left" data-testid="wa-widget-latam">
          <div className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center">
            <WhatsAppIconSvg className="w-4 h-4 text-[#25D366]" />
          </div>
          <div>
            <div className="text-white text-sm font-medium">LATAM & USA</div>
            <div className="text-white/50 text-[10px]">+51 964 243 686</div>
          </div>
        </button>
      </div>

      {/* Main toggle */}
      <button onClick={() => { setOpen((o) => !o); dismissBubble(); }} className="relative w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20bd5a] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105" data-testid="wa-widget-toggle" aria-label="WhatsApp">
        {open ? <X className="w-6 h-6 text-white" /> : <WhatsAppIconSvg className="w-6 h-6 text-white" />}
        {!open && !showBubble && <span className="absolute inset-0 rounded-full animate-ping bg-[#25d366]/30" />}
      </button>
    </div>
  );
}
