import { Link } from "react-router-dom";
import { PenSquare, BookOpen, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
            .then((data) => setPosts(data))
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className="space-y-20">

            {/* Hero */}
            <section className="text-center py-20">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 mb-6">
                    <Sparkles size={18} />
                    Welcome to Inkspire
                </div>

                <h1 className="text-6xl font-display font-extrabold leading-tight">
                    Write.
                    <br />
                    Inspire.
                    <br />
                    Connect.
                </h1>

                <p className="mt-8 text-xl max-w-2xl mx-auto text-secondary-500">
                    A modern storytelling platform where every idea finds its voice.
                    Publish beautiful stories, discover talented writers, and engage
                    with your campus community.
                </p>

                <div className="mt-12 flex justify-center gap-5">

                    <Link
                        to="/create"
                        className="btn-primary flex items-center gap-2"
                    >
                        <PenSquare size={18} />
                        Start Writing
                    </Link>

                    <Link
                        to="/confessions"
                        className="btn-secondary flex items-center gap-2"
                    >
                        <BookOpen size={18} />
                        Explore Stories
                    </Link>

                </div>

            </section>



            {/* Features */}

            <section className="grid md:grid-cols-3 gap-8">

                <div className="glass-card p-8">
                    <h2 className="text-2xl mb-4">
                        📖 Stories
                    </h2>

                    <p>
                        Publish long-form articles with an elegant reading
                        experience.
                    </p>
                </div>

                <div className="glass-card p-8">
                    <h2 className="text-2xl mb-4">
                        ❤️ Confessions
                    </h2>

                    <p>
                        Anonymous thoughts with floating emoji reactions.
                    </p>
                </div>

                <div className="glass-card p-8">
                    <h2 className="text-2xl mb-4">
                        🎓 Overheard
                    </h2>

                    <p>
                        Share funny campus moments in a beautiful micro-feed.
                    </p>
                </div>

            </section>

            {/* Latest Stories */}

            <section className="space-y-8">

                <h2 className="text-4xl font-display text-center">
                    Latest Stories
                </h2>

                {loading ? (

                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
                    </div>

                ) : posts.length === 0 ? (

                    <div className="glass-card p-10 text-center">

                        <h3 className="text-2xl">
                            No stories yet
                        </h3>

                        <p className="text-secondary-500 mt-2">
                            Publish your first story 🚀
                        </p>
                        <Link
                            to="/create"
                            className="btn-primary inline-flex mt-6"
                        >
                            Publish First Story
                        </Link>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-2 gap-8">

                        {posts.map((post: any) => (

                            <Link
                                key={post.id}
                                to={`/post/${post.id}`}
                                className="glass-card group p-8 block hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                            >

                                <h3 className="text-2xl font-display mb-3 group-hover:text-primary-600 transition-colors">
                                    {post.title}
                                </h3>


                                <div
                                    className="text-secondary-500 leading-7 mt-4"
                                    dangerouslySetInnerHTML={{
                                        __html: post.content.substring(0, 180) + "...",
                                    }}
                                />

                                <div className="mt-6 pt-4 border-t border-secondary-200 dark:border-secondary-800 flex items-center justify-between">

                                    <div className="flex gap-5 text-sm text-secondary-500">
                                        <span>❤️ {post.like_count}</span>
                                        <span>💬 {post.comment_count}</span>
                                    </div>

                                    <span className="text-primary-600 font-semibold group-hover:translate-x-1 transition-transform">
                                        Read →
                                    </span>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}