import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../services/postService";
import { PenSquare, BookOpen, MessageCircle, Bookmark } from "lucide-react";
import { apiFetch } from "../lib/api";
import { getDashboard } from "../lib/dashboard";
import { getMyComments } from "../services/commentService";
export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [activeTab, setActiveTab] =
        useState<
            "stories" | "comments" | "bookmarks"
        >("stories");
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const [myComments, setMyComments] = useState<any[]>([]);
    useEffect(() => {
        Promise.all([
            getDashboard(),
            apiFetch("/users/me/bookmarks"),
            getMyComments(),
        ]).then(([dashboard, bookmarks, comments]) => {
            setData(dashboard);
            setBookmarks(bookmarks);
            setMyComments(comments);
        });
    }, []);

    if (!data)
        return (
            <h2 className="text-center text-2xl">
                Loading...
            </h2>
        );

    async function handleDelete(id: string) {
        if (!window.confirm("Delete this story?")) return;

        await deletePost(id);

        const [dashboard, bookmarks] = await Promise.all([
            getDashboard(),
            apiFetch("/users/me/bookmarks"),
        ]);

        setData(dashboard);
        setBookmarks(bookmarks);
    }

    return (
        <div className="space-y-10">

            {/* Profile */}

            <div className="glass-card p-10">

                <div className="flex flex-col md:flex-row justify-between gap-8">

                    <div className="flex items-center gap-6">

                        <div className="w-24 h-24 rounded-full bg-primary-600 text-white flex items-center justify-center text-4xl font-bold">

                            {data.user.username[0].toUpperCase()}

                        </div>

                        <div>

                            <h1 className="text-5xl font-display">

                                {data.user.username}

                            </h1>

                            <p className="text-secondary-500 mt-2">

                                {data.user.email}

                            </p>

                        </div>

                    </div>

                    <Link
                        to="/create"
                        className="btn-primary self-start md:self-center flex items-center gap-2"
                    >

                        <PenSquare size={18} />

                        Write Story

                    </Link>

                </div>

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-3 gap-6">

                <div className="glass-card p-8 text-center">

                    <BookOpen
                        className="mx-auto text-primary-500 mb-4"
                        size={34}
                    />

                    <h2 className="text-5xl">

                        {data.stats.stories}

                    </h2>

                    <p className="mt-3">

                        Stories

                    </p>

                </div>

                <div className="glass-card p-8 text-center">

                    <MessageCircle
                        className="mx-auto text-pink-500 mb-4"
                        size={34}
                    />

                    <h2 className="text-5xl">

                        {data.stats.comments}

                    </h2>

                    <p className="mt-3">

                        Comments

                    </p>

                </div>

                <div className="glass-card p-8 text-center">

                    <BookOpen
                        className="mx-auto text-cyan-500 mb-4"
                        size={34}
                    />

                    <h2 className="text-5xl">

                        {data.stats.confessions}

                    </h2>

                    <p className="mt-3">

                        Confessions

                    </p>

                </div>

            </div>

            {/* Tabs */}

            <div className="glass-card p-3 flex gap-3">

                <button
                    onClick={() =>
                        setActiveTab("stories")
                    }
                    className={`flex-1 rounded-2xl py-3 transition ${activeTab === "stories"
                        ? "bg-primary-600 text-white"
                        : ""
                        }`}
                >

                    My Stories

                </button>

                <button
                    onClick={() =>
                        setActiveTab("comments")
                    }
                    className={`flex-1 rounded-2xl py-3 transition ${activeTab === "comments"
                        ? "bg-primary-600 text-white"
                        : ""
                        }`}
                >

                    My Comments

                </button>
                <button
                    onClick={() =>
                        setActiveTab("bookmarks")
                    }
                    className={`flex-1 rounded-2xl py-3 transition ${activeTab === "bookmarks"
                        ? "bg-primary-600 text-white"
                        : ""
                        }`}
                >
                    Bookmarks
                </button>

            </div>

            {/* Stories */}

            {activeTab === "stories" && (

                <div className="space-y-6">

                    {data.recent_posts.length === 0 ? (

                        <div className="glass-card p-12 text-center">

                            <BookOpen
                                size={56}
                                className="mx-auto text-primary-400 mb-5"
                            />

                            <h2 className="text-3xl mb-3">
                                No stories yet
                            </h2>

                            <p className="text-secondary-500 mb-8">
                                Write your first story and inspire others.
                            </p>

                            <Link
                                to="/create"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <PenSquare size={18} />
                                Write Story
                            </Link>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {data.recent_posts.map((post: any) => (

                                <div
                                    key={post.id}
                                    className="glass-card p-6 group hover:-translate-y-1 transition-all duration-300"
                                >

                                    <Link
                                        to={`/post/${post.id}`}
                                    >

                                        <h3 className="text-2xl font-display mb-3 group-hover:text-primary-600 transition">

                                            {post.title}

                                        </h3>

                                    </Link>

                                    <p className="text-secondary-500 text-sm mb-4">

                                        {new Date(post.created_at).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}

                                    </p>

                                    <p className="text-secondary-500 line-clamp-3 mb-6">

                                        {post.content
                                            .replace(/<[^>]*>/g, "")
                                            .substring(0, 120)}
                                        ...

                                    </p>

                                    <div className="flex justify-between items-center">

                                        <Link
                                            to={`/post/${post.id}`}
                                            className="text-primary-600 font-semibold hover:underline"
                                        >
                                            Read Story →
                                        </Link>

                                        <div className="flex gap-2">

                                            <Link
                                                to={`/post/${post.id}/edit`}
                                                className="btn-secondary"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="btn-secondary text-red-500"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            )}

            {/* Comments */}

            {activeTab === "comments" && (

                myComments.length === 0 ? (

                    <div className="glass-card p-12 text-center">

                        <MessageCircle
                            size={52}
                            className="mx-auto text-primary-400 mb-5"
                        />

                        <h2 className="text-3xl mb-3">
                            No comments yet
                        </h2>

                        <p className="text-secondary-500">
                            Start engaging by commenting on stories.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {myComments.map((comment: any) => (

                            <div
                                key={comment.id}
                                className="glass-card p-6"
                            >

                                <div className="flex justify-between items-center mb-3">

                                    <span className="font-semibold text-primary-600">
                                        {comment.author.username}
                                    </span>

                                    <span className="text-sm text-secondary-500">
                                        {new Date(comment.created_at).toLocaleDateString()}
                                    </span>

                                </div>

                                <p className="text-secondary-700 dark:text-secondary-300">
                                    {comment.content}
                                </p>

                                <Link
                                    to={`/post/${comment.post_id}`}
                                    className="inline-block mt-4 text-primary-600 hover:underline"
                                >
                                    View Story →
                                </Link>

                            </div>

                        ))}

                    </div>

                )

            )}

            {activeTab === "bookmarks" && (

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {bookmarks.length === 0 ? (

                        <div className="glass-card p-12 text-center col-span-full">

                            <Bookmark
                                size={50}
                                className="mx-auto text-primary-400 mb-4"
                            />

                            <h2 className="text-3xl">
                                No bookmarks yet
                            </h2>

                        </div>

                    ) : (

                        bookmarks.map((post: any) => (

                            <Link
                                key={post.id}
                                to={`/post/${post.id}`}
                                className="glass-card p-6"
                            >

                                <h3 className="text-2xl font-display mb-3">

                                    {post.title}

                                </h3>

                                <p className="line-clamp-3 text-secondary-500">

                                    {post.content
                                        .replace(/<[^>]*>/g, "")
                                        .substring(0, 120)}
                                    ...

                                </p>
                                <div className="mt-5 flex gap-4 text-sm text-secondary-500">
                                    <span>❤️ {post.like_count}</span>
                                    <span>💬 {post.comment_count}</span>
                                </div>

                            </Link>

                        ))

                    )}

                </div>

            )}

        </div>
    );
}