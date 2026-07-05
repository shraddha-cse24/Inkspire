import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { createPost } from "../services/postService";
import { useAuth } from '../contexts/AuthContext';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
    });

    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
        }
    }, [authLoading, user, navigate]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        if (!editor || !user) return;

        try {
            setLoading(true);
            setError('');

            const post = await createPost({
                title,
                content: editor.getHTML(),
                published: true,
            });

            if (post) {
                navigate(`/post/${post.id}`);
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setError(error instanceof Error ? error.message : 'Failed to create post');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto pt-8 animate-fade-up px-4 sm:px-0">
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-secondary-900 dark:text-white">Draft a Story</h1>
                <p className="text-lg text-secondary-500 dark:text-secondary-400">Share your brilliant ideas with the Inkspirecommunity.</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex gap-3 text-sm font-medium">
                    <span className="shrink-0 font-bold">&#9888;</span> {error}
                </div>
            )}

            <div className="glass-card p-6 md:p-10 mb-8 z-10 relative">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="title" className="block text-base font-semibold text-secondary-800 dark:text-secondary-200 mb-3">
                            Engaging Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-input text-xl font-display py-4 px-6 rounded-2xl bg-secondary-50 dark:bg-secondary-800/60"
                            placeholder="e.g. The Future of Web Design in 2026..."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-secondary-800 dark:text-secondary-200 mb-3">
                            Your Masterpiece
                        </label>
                        <div className="border border-secondary-200 dark:border-secondary-700 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-primary-500/10 focus-within:border-primary-400 transition-all bg-white dark:bg-secondary-800">
                            <div className="prose-custom max-w-none">
                                <EditorContent editor={editor} className="min-h-[400px] p-6 lg:p-8 outline-none story-content" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-secondary-100 dark:border-secondary-800/60">
                        <button
                            type="submit"
                            disabled={loading ||!title.trim() ||!editor ||editor.isEmpty}
                            className="btn-primary px-10 py-4 text-base shadow-xl"
                        >
                            {loading ? 'Publishing to World...' : 'Publish Story'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}