import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    PenSquare,
    Save,
    ArrowLeft,
} from "lucide-react";
import {
    getPost,
    updatePost,
} from "../services/postService";

export default function EditPost() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [loading, setLoading] = useState(true);

    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
    });

    useEffect(() => {
        if (!id) return;

        getPost(id).then((post) => {
            setTitle(post.title);

            editor?.commands.setContent(
                post.content
            );

            setLoading(false);
        });
    }, [id, editor]);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (!id || !editor) return;

        await updatePost(id, {
            title,
            content: editor.getHTML(),
            published: true,
        });

        navigate(`/post/${id}`);
    }

    if (loading) {
        return (
            <h2 className="text-center text-2xl">
                Loading...
            </h2>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pt-8 animate-fade-up px-4 sm:px-0">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-secondary-200 dark:border-secondary-800 pb-6">

                <div>

                    <h1 className="text-3xl md:text-4xl font-display font-bold">
                        Edit Story
                    </h1>

                    <p className="text-secondary-500 mt-2">
                        Fine tune your masterpiece.
                    </p>

                </div>

                <Link
                    to={`/post/${id}`}
                    className="btn-secondary"
                >

                    <ArrowLeft size={18} className="mr-2" />

                    Back

                </Link>

            </div>

            <div className="glass-card p-8">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    <div>

                        <label className="block mb-3 font-semibold">

                            Story Title

                        </label>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-input text-2xl font-display"
                        />

                    </div>

                    <div>

                        <label className="block mb-3 font-semibold">

                            Story Content

                        </label>

                        <div className="border border-secondary-200 dark:border-secondary-700 rounded-3xl overflow-hidden">

                            <div className="bg-secondary-50 dark:bg-secondary-900 px-5 py-3 flex items-center gap-2">

                                <PenSquare size={18} />

                                <span className="font-semibold">

                                    Editor Active

                                </span>

                            </div>

                            <EditorContent
                                editor={editor}
                                className="min-h-[400px] p-6 story-content"
                            />

                        </div>

                    </div>

                    <div className="flex justify-end">

                        <button
                            className="btn-primary flex items-center gap-2"
                        >

                            <Save size={18} />

                            Save Changes

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}