import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    UserPlus,
    AlertCircle,
} from "lucide-react";
export default function Register() {
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await signUp(email, password, username);
            navigate("/dashboard");
        } catch (err: any) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to create account."
            );
        }

        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto w-full pt-8 animate-fade-up">
            <div className="glass-card p-8 md:p-12 relative z-10">
                <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-primary-500/20 blur-3xl rounded-full pointer-events-none"></div>

                <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-accent-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 mb-8 transform rotate-3 hover:rotate-0 transition-transform">
                    <UserPlus size={28} className="text-white" />
                </div>

                <h1 className="text-3xl font-display font-bold text-center mb-2 text-secondary-900 dark:text-white mt-4">Join InkWell</h1>
                <p className="text-secondary-500 text-center mb-10">Create an account to share your stories</p>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 flex items-start text-sm font-medium">
                        <AlertCircle size={18} className="mr-2.5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder="e.g. JohnDoe"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                        <p className="mt-2 ml-1 text-xs font-medium text-secondary-500">
                            Must be at least 6 characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-3.5 mt-4"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Creating Account...
                            </span>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>
            </div>

            <p className="mt-8 text-center text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 hover:underline transition-all">
                    Sign in here
                </Link>
            </p>
        </div>
    );
}