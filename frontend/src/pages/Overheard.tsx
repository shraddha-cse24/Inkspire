import { useState, useEffect } from 'react';
import { MessageSquareQuote, Send, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
    getSnippets,
    createSnippet,
} from "../services/overheardService";

interface OverheardSnippet {
    id: string;
    content: string;
    theme_color: string;
    created_at: string;
}

const THEMES = [
    "blue",
    "purple",
    "green",
    "amber",
    "zinc",
];
const THEME_CLASSES: Record<string, string> = {
    blue: "bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-100",
    purple: "bg-purple-100 dark:bg-purple-900/40 border-purple-200 dark:border-purple-800/50 text-purple-900 dark:text-purple-100",
    green: "bg-green-100 dark:bg-green-900/40 border-green-200 dark:border-green-800/50 text-green-900 dark:text-green-100",
    amber: "bg-amber-100 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-100",
    zinc: "bg-zinc-100 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100",
};

export default function Overheard() {
    const [snippets, setSnippets] = useState<OverheardSnippet[]>([]);
    const [loading, setLoading] = useState(true);
    const [newSnippet, setNewSnippet] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchSnippets();
    }, []);

    const fetchSnippets = async () => {
        try {
            const data = await getSnippets();
            setSnippets(data);
        } catch (error) {
            console.error('Error fetching snippets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSnippet.trim() || newSnippet.length > 150) return;

        setIsSubmitting(true);
        try {
            const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
            const data = await createSnippet({
                content: newSnippet,
                theme_color: randomTheme,
            });
            setSnippets([data, ...snippets]);
            setNewSnippet('');
        } catch (error) {
            console.error('Error posting snippet:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4 sm:px-6">

            {/* Header & Post Area */}
            <section className="relative text-center max-w-2xl mx-auto py-12 px-6 overflow-hidden rounded-[3rem] glass-card bg-gradient-to-br from-primary-50/50 to-accent-50/50 dark:from-primary-900/20 dark:to-accent-900/20">
                <div className="relative z-10 flex flex-col items-center">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/60 dark:bg-black/20 shadow-glass backdrop-blur-md mb-6 -rotate-2">
                        <MessageSquareQuote className="w-10 h-10 text-primary-500" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary-900 dark:text-white mb-4">
                        Overheard at IIITDMJ
                    </h1>
                    <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-lg mx-auto leading-relaxed">
                        What's the funniest, most out-of-context thing you heard on campus today? Drop it below.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto relative group">
                        <div className="relative">
                            <input
                                type="text"
                                value={newSnippet}
                                onChange={(e) => setNewSnippet(e.target.value)}
                                placeholder="Professor just said..."
                                className="w-full py-4 pl-6 pr-16 rounded-full border border-primary-200 dark:border-primary-800/50 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-secondary-900 dark:text-white placeholder-secondary-400"
                                required
                                maxLength={150}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting || !newSnippet.trim()}
                                className="absolute right-2 top-1.5 p-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={18} className="translate-x-0.5" />
                            </button>
                        </div>
                        <div className="text-right mt-2 text-xs font-semibold text-secondary-400">
                            {newSnippet.length}/150
                        </div>
                    </form>
                </div>
            </section>

            {/* Asymmetrical Grid of Bubbles */}
            <section className="mx-auto max-w-6xl">
                {snippets.length === 0 ? (
                    <div className="py-20 text-center">
                        <Sparkles className="w-12 h-12 text-secondary-400 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-secondary-700 dark:text-secondary-300">It's a quiet day...</h3>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {snippets.map((snippet, index) => {
                            // Create dynamic chaotic bubble shapes
                            const borderRadiusOptions = [
                                'rounded-[2rem] rounded-tr-md',
                                'rounded-[2rem] rounded-tl-md',
                                'rounded-[2rem] rounded-br-[4px]',
                                'rounded-[2rem] rounded-bl-[4px]',
                                'rounded-[2rem]'
                            ];
                            const dynamicRadius = borderRadiusOptions[index % borderRadiusOptions.length];

                            return (
                                <div
                                    key={snippet.id}
                                    className={`break-inside-avoid inline-block w-full p-6 border shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative group ${THEME_CLASSES[snippet.theme_color] ?? THEME_CLASSES.blue} ${dynamicRadius}`}
                                >
                                    <MessageSquareQuote className="w-6 h-6 mb-3 opacity-20 absolute -top-2 -left-2 rotate-12" />

                                    <p className="font-bold leading-snug whitespace-pre-wrap relative z-10 font-display tracking-tight text-lg">
                                        "{snippet.content}"
                                    </p>

                                    <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 opacity-60 font-bold tracking-wider uppercase text-[10px] relative z-10 text-right">
                                        <span>{formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
