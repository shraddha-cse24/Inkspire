import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Heart, Bookmark } from "lucide-react";

import { getPost, deletePost } from "../services/postService";
import { useAuth } from "../contexts/AuthContext";
import {
    getComments,
    createComment,
} from "../services/commentService";
import { toggleLike, getLikeStatus } from "../services/likeService";
import { toggleBookmark, getBookmarkStatus } from "../services/bookmarkService";

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [comments, setComments] = useState<any[]>([]);
    const [comment, setComment] = useState("");
    const [posting, setPosting] = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        if (!id) return;

        Promise.all([
            getPost(id),
            getComments(id),
            getLikeStatus(id),
            getBookmarkStatus(id),
        ])
            .then(([post, comments, likeStatus, bookmarkStatus]) => {
                setPost(post);
                setComments(comments);
                setLiked(likeStatus.liked);
                setBookmarked(bookmarkStatus.bookmarked);
            })
            .finally(() => setLoading(false));
    }, [id]);

    async function handleDelete() {
        if (!id) return;

        const ok = window.confirm(
            "Delete this story?"
        );

        if (!ok) return;

        await deletePost(id);

        navigate("/");
    }

    if (loading) {
        return (
            <h2 className="text-center text-2xl">
                Loading...
            </h2>
        );
    }

    if (!post) {
        return (
            <h2 className="text-center text-2xl">
                Story not found
            </h2>
        );
    }

    async function handleComment() {
        if (!id || !comment.trim()) return;

        try {
            setPosting(true);

            await createComment(id, comment);

            const updated = await getComments(id);

            setComments(updated);

            const updatedPost = await getPost(id);

            setPost(updatedPost);

            setComment("");
        } finally {
            setPosting(false);
        }
    }
    async function handleLike() {
        if (!id) return;

        const res = await toggleLike(id);

        setLiked(res.liked);

        const updatedPost = await getPost(id);

        setPost(updatedPost);
    }
    async function handleBookmark() {
        if (!id) return;

        const res = await toggleBookmark(id);

        setBookmarked(res.bookmarked);
    }

    return (
        <div className="max-w-4xl mx-auto">

            <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary-600 mb-8"
            >
                <ArrowLeft size={18} />
                Back
            </Link>

            <article className="glass-card p-10">

                <h1 className="text-5xl font-display mb-6">
                    {post.title}
                </h1>


                <div className="flex items-center justify-between mb-8 text-secondary-500">

                    <div>
                        By <strong>{post.author.username}</strong>
                    </div>

                    <div>
                        {new Date(
                            post.created_at
                        ).toLocaleDateString()}
                    </div>

                </div>
                <div className="flex gap-6 mt-6 text-secondary-500">

                    <span>❤️ {post.like_count} Likes</span>

                    <span>💬 {post.comment_count} Comments</span>

                </div>

                <div
                    className="story-content"
                    dangerouslySetInnerHTML={{
                        __html: post.content,
                    }}
                />

                <div className="flex items-center gap-4 mt-8">

                    <button
                        onClick={handleLike}
                        className={`btn-secondary flex items-center gap-2 ${liked ? "text-red-500" : ""
                            }`}
                    >
                        <Heart
                            size={20}
                            fill={liked ? "currentColor" : "none"}
                        />
                        {liked ? "Liked" : "Like"}
                    </button>

                    <button
                        onClick={handleBookmark}
                        className={`btn-secondary flex items-center gap-2 ${bookmarked ? "text-primary-600" : ""
                            }`}
                    >
                        <Bookmark
                            size={20}
                            fill={bookmarked ? "currentColor" : "none"}
                        />
                        {bookmarked ? "Saved" : "Save"}
                    </button>

                </div>

                {user?.id === post.author_id && (

                    <div className="flex gap-4 mt-10 pt-8 border-t border-secondary-200">

                        <Link
                            to={`/post/${post.id}/edit`}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Pencil size={18} />
                            Edit
                        </Link>

                        <button
                            onClick={handleDelete}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <Trash2 size={18} />
                            Delete
                        </button>

                    </div>

                )}

            </article>

            <div className="mt-12 border-t pt-8">

                <h2 className="text-2xl font-display mb-6">
                    Comments
                </h2>

                {user && (
                    <div className="flex gap-3 mb-8">

                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="form-input"
                        />

                        <button
                            onClick={handleComment}
                            disabled={posting}
                            className="btn-primary"
                        >
                            {posting ? "Posting..." : "Post"}
                        </button>

                    </div>
                )}

                <div className="space-y-4">

                    {comments.length === 0 ? (

                        <p className="text-secondary-500">
                            No comments yet.
                        </p>

                    ) : (

                        comments.map((c) => (

                            <div
                                key={c.id}
                                className="glass-card p-5"
                            >

                                <div className="font-semibold">

                                    {c.author.username}

                                </div>

                                <p className="mt-2">
                                    {c.content}
                                </p>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}