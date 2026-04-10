import { useEffect } from "react";
import { X } from "lucide-react";

export default function CalendlyModal({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" data-testid="calendly-modal">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl h-[85vh] bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0a0a0a]">
          <span className="text-white/60 text-xs tracking-wider uppercase font-medium">Book a Meeting</span>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors" data-testid="calendly-close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <iframe
          src="https://calendly.com/mauro-29/business-meeting?hide_gdpr_banner=1&background_color=111111&text_color=ffffff&primary_color=c9a84c"
          title="Schedule a meeting"
          className="w-full h-[calc(85vh-52px)] border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
