import { useState, useEffect } from "react";
import { ThumbsUp, Heart, Sparkles, Flame } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const reactionTypes = [
  { key: "like", icon: ThumbsUp, label: "Useful" },
  { key: "love", icon: Heart, label: "Love" },
  { key: "insightful", icon: Sparkles, label: "Insightful" },
  { key: "fire", icon: Flame, label: "Great" },
];

export default function BlogReactions({ slug, locale }) {
  const [reactions, setReactions] = useState({ like: 0, love: 0, insightful: 0, fire: 0 });
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(`mfc-reaction-${slug}`);
    if (stored) setUserReaction(stored);

    axios.get(`${API}/blog/${slug}/reactions`).then((r) => {
      if (r.data?.reactions) setReactions(r.data.reactions);
    }).catch(() => {});
  }, [slug]);

  const handleReaction = async (key) => {
    if (userReaction === key) return;
    const prev = userReaction;
    setUserReaction(key);
    localStorage.setItem(`mfc-reaction-${slug}`, key);

    setReactions((old) => ({
      ...old,
      [key]: old[key] + 1,
      ...(prev ? { [prev]: Math.max(0, old[prev] - 1) } : {}),
    }));

    try {
      await axios.post(`${API}/blog/${slug}/react`, {
        reaction: key,
        previous: prev || null,
      });
    } catch {}
  };

  const total = Object.values(reactions).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center gap-4" data-testid="blog-reactions">
      <p className="text-white/25 text-xs">
        {locale === "it" ? "Come trovi questo articolo?" : locale === "es" ? "Que te parece este articulo?" : locale === "fr" ? "Comment trouvez-vous cet article?" : locale === "de" ? "Wie finden Sie diesen Artikel?" : "How do you find this article?"}
      </p>
      <div className="flex gap-2">
        {reactionTypes.map(({ key, icon: Icon, label }) => {
          const isActive = userReaction === key;
          return (
            <button key={key} onClick={() => handleReaction(key)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 ${isActive ? "bg-[#c9a84c]/10 border-[#c9a84c]/30 text-[#c9a84c]" : "bg-white/[0.02] border-white/5 text-white/30 hover:border-white/15 hover:text-white/50"}`}
              data-testid={`reaction-${key}`}>
              <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              <span className="text-xs font-medium">{reactions[key]}</span>
            </button>
          );
        })}
      </div>
      {total > 0 && (
        <p className="text-white/15 text-[10px]">
          {total} {locale === "it" ? "reazioni" : locale === "es" ? "reacciones" : locale === "fr" ? "reactions" : locale === "de" ? "Reaktionen" : "reactions"}
        </p>
      )}
    </div>
  );
}
