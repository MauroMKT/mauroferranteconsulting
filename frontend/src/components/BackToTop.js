import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 hover:bg-[#c9a84c]/30 flex items-center justify-center transition-all duration-300 hover:scale-110" data-testid="back-to-top-btn">
      <ArrowUp className="w-4 h-4 text-[#c9a84c]" />
    </button>
  );
}
