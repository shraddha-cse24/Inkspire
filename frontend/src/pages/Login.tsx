import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    LogIn,
    AlertCircle,
} from "lucide-react";
export default function Login() {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await signIn(email, password);
            navigate("/dashboard");
        } catch (err: any) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to sign in."
            )
        }

        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto w-full pt-12 animate-fade-up">
            <div className="glass-card p-8 md:p-12 relative z-10">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-500/20 blur-3xl rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-accent-500/20 blur-3xl rounded-full pointer-events-none"></div>

                <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 mb-8 transform -rotate-3 hover:rotate-0 transition-transform">
                    <LogIn size={28} className="text-white" />
                </div>

                <h1 className="text-3xl font-display font-bold text-center mb-2 text-secondary-900 dark:text-white mt-4">Welcome Back</h1>
                <p className="text-secondary-500 text-center mb-10">Sign in to continue your journey</p>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 flex items-start text-sm font-medium">
                        <AlertCircle size={18} className="mr-2.5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-3.5 mt-2"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Signing in...
                            </span>
                        ) : (
                            'Sign In securely'
                        )}
                    </button>
                </form>
            </div>

            <p className="mt-8 text-center text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 hover:underline transition-all">
                    Create an account
                </Link>
            </p>
        </div>
    );
}