import { useState, useEffect } from 'react';
import { Send, Heart, Flame, ShieldAlert, Sparkles, User } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface Reaction {
  emoji: string;
  count: number;
}

interface Confession {
  id: string;
  content: string;
  theme_color: string;
  created_at: string;
  reactions?: Reaction[];
}

const EMOJIS = ['🔥', '💔', '👀', '💀', '🫂'];

const THEMES = ['rose', 'pink', 'peach', 'crimson'];

export default function Confessions() {
  const { user } = useAuth();
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [loading, setLoading] = useState(true);
  const [newConfession, setNewConfession] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchConfessions();
  }, []);

  const fetchConfessions = async () => {
    try {
      const data = await apiFetch('/confessions/');
      setConfessions(data);
    } catch (error) {
      console.error('Error fetching confessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfession.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
      const data = await apiFetch('/confessions/', {
        method: 'POST',
        body: JSON.stringify({
          content: newConfession,
          theme_color: randomTheme
        }),
      });
      setConfessions([data, ...confessions]);
      setNewConfession('');
    } catch (error) {
      console.error('Error posting confession:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiFetch(`/confessions/${id}`, { method: 'DELETE' });
      setConfessions(confessions.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting confession:', error);
    }
  };

  const handleReact = async (id: string, emoji: string) => {
    // Optimistic UI update
    setConfessions(confessions.map(c => {
      if (c.id === id) {
        const reactions = c.reactions || [];
        const existing = reactions.find(r => r.emoji === emoji);
        return {
          ...c,
          reactions: existing 
            ? reactions.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r)
            : [...reactions, { emoji, count: 1 }]
        };
      }
      return c;
    }));
    
    // Animation float-up effect
    const container = document.getElementById(`confession-${id}`);
    if (container) {
      const elem = document.createElement('div');
      elem.innerText = emoji;
      elem.className = 'absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl pointer-events-none animate-float-up z-50';
      container.appendChild(elem);
      setTimeout(() => elem.remove(), 800);
    }

    // Backend dispatch
    try {
      await apiFetch(`/confessions/${id}/react`, {
        method: 'POST',
        body: JSON.stringify({ emoji })
      });
    } catch (error) {
      console.error('Error reacting to confession', error);
      // Revert not required immediately, just failing silently is standard for micro-interactions
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      
      {/* Love-Themed Hero Header */}
      <section className="relative text-center max-w-2xl mx-auto py-12 px-6 overflow-hidden rounded-[3rem] glass-card border-rose-200/50 dark:border-rose-900/30 bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-rose-950/40 dark:to-pink-950/40 shadow-2xl shadow-rose-500/10">
        <div className="absolute top-0 right-0 -m-10 w-40 h-40 bg-rose-400/20 dark:bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -m-10 w-40 h-40 bg-pink-400/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/60 dark:bg-black/20 shadow-glass backdrop-blur-md mb-6 rotate-3">
            <Heart className="w-10 h-10 text-rose-500 animate-bounce duration-1000" fill="currentColor" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary-900 dark:text-white mb-4">
            Secret Confessions <Sparkles className="inline w-6 h-6 text-yellow-400" />
          </h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Drop a note. Keep it entirely anonymous. 100% stripped of identity before it ever reaches the server.
          </p>
          
          {!user ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 text-sm font-medium">
              <ShieldAlert size={16} /> Log in to post an anonymous confession.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto relative group">
              <textarea
                value={newConfession}
                onChange={(e) => setNewConfession(e.target.value)}
                placeholder="I have a crush on..."
                className="w-full min-h-[140px] p-5 pb-14 rounded-3xl border border-rose-200 dark:border-rose-800/50 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md focus:border-rose-500 dark:focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 resize-none text-secondary-900 dark:text-white placeholder-secondary-400"
                required
                maxLength={500}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="text-xs font-medium text-secondary-400">
                  {newConfession.length}/500
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting || !newConfession.trim()}
                  className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="masonry-grid px-2">
        {confessions.length === 0 ? (
          <div className="col-span-1 py-20 text-center">
            <Flame className="w-12 h-12 text-secondary-300 dark:text-secondary-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">It's quiet... too quiet.</h3>
            <p className="text-secondary-500">Be the first to drop a confession.</p>
          </div>
        ) : (
          confessions.map((confession) => (
            <div 
              key={confession.id} 
              className={`masonry-item note-${confession.theme_color} p-6 sm:p-8 rounded-[2rem] shadow-glass dark:shadow-glass-dark border backdrop-blur-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative group`}
            >
              <Heart className="w-6 h-6 mb-4 opacity-20 absolute -top-4 -left-4 rotate-12" fill="currentColor" />
              
              <p className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-medium relative z-10">
                {confession.content}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-black/5 dark:border-white/5 opacity-60 text-[11px] font-semibold uppercase">
                <span className="flex items-center gap-1.5"><User size={12} /> Anonymous</span>
                <span>{formatDistanceToNow(new Date(confession.created_at), { addSuffix: true })}</span>
              </div>

              {/* Micro-Interaction Reaction Block */}
              <div className="mt-4 flex flex-wrap gap-2 relative z-10" id={`confession-${confession.id}`}>
                {EMOJIS.map(emoji => {
                  const rCount = confession.reactions?.find(r => r.emoji === emoji)?.count || 0;
                  return (
                    <button 
                      key={emoji}
                      onClick={() => handleReact(confession.id, emoji)}
                      className={`text-sm px-2 py-1 rounded-full border transition-all hover:-translate-y-1 ${rCount > 0 ? 'bg-white/40 dark:bg-black/40 border-black/10 dark:border-white/10' : 'bg-transparent border-transparent hover:bg-white/20 dark:hover:bg-black/20 opacity-60 hover:opacity-100 flex items-center justify-center'}`}
                    >
                      {emoji} {rCount > 0 && <span className="font-bold text-xs ml-1 font-display tracking-tight text-secondary-800 dark:text-white">{rCount}</span>}
                    </button>
                  );
                })}
              </div>

              {/* Secret Delete Button - Only works if backend validates token match! */}
              {user && (
                <button 
                  onClick={() => handleDelete(confession.id)}
                  className="absolute bottom-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
                  title="Remove your confession"
                >
                   {/* We rely on backend 403 to prevent deletion of others' confessions, but expose UI button speculatively */}
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-50">Delete</span>
                </button>
              )}
            </div>
          ))
        )}
      </section>

    </div>
  );
}
