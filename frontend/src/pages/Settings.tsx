import { useState } from "react";
import {
    Lock,
    Trash2,
    AlertCircle,
    CheckCircle,
    Eye,
    EyeOff,
} from "lucide-react";

export default function Settings() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [deleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    async function handlePasswordChange(
        e: React.FormEvent
    ) {
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("Password should be at least 6 characters");
            return;
        }
        e.preventDefault();

        setPasswordLoading(true);

        setTimeout(() => {
            setPasswordLoading(false);
            setPasswordSuccess(
                "Coming Soon 🚀"
            );
        }, 800);
    }
    async function handleDeleteAccount(
        e: React.FormEvent
    ) {
        setDeleteError("");
        e.preventDefault();

        if (deleteConfirmation !== "DELETE") {
            setDeleteError(
                "Type DELETE first."
            );
            return;
        }

        alert(
            "Delete Account API will be added later."
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-fade-up">
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-display font-extrabold text-secondary-900 dark:text-white mb-4 tracking-tight">
                    Account Settings
                </h1>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-xl mx-auto">
                    Manage your security preferences and profile data.
                </p>
            </div>

            <div className="glass-card p-6 md:p-8 mb-8 border-none shadow-xl shadow-primary-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-accent-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Lock size={24} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-secondary-900 dark:text-white">Change Password</h2>
                        <p className="text-secondary-500 dark:text-secondary-400">Update your account access credentials</p>
                    </div>
                </div>

                {passwordError && (
                    <div className="bg-red-50/80 dark:bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded-xl mb-6 flex items-start backdrop-blur-sm">
                        <AlertCircle size={20} className="mr-3 flex-shrink-0 mt-0.5" />
                        <span>{passwordError}</span>
                    </div>
                )}

                {passwordSuccess && (
                    <div className="bg-green-50/80 dark:bg-green-500/10 border-l-4 border-emerald-500 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl mb-6 flex items-start backdrop-blur-sm">
                        <CheckCircle size={20} className="mr-3 flex-shrink-0 mt-0.5" />
                        <span>{passwordSuccess}</span>
                    </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Current Password</label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="form-input w-full bg-white/50 dark:bg-secondary-800/50 border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500 rounded-xl pr-12 transition-all"
                                placeholder="Enter current password"
                                required
                            />
                            <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-primary-500 transition-colors">
                                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-input w-full bg-white/50 dark:bg-secondary-800/50 border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500 rounded-xl pr-12 transition-all"
                                placeholder="Min. 6 characters"
                                required
                            />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-primary-500 transition-colors">
                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-input w-full bg-white/50 dark:bg-secondary-800/50 border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500 rounded-xl pr-12 transition-all"
                                placeholder="Re-enter new password"
                                required
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-primary-500 transition-colors">
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword} className="btn-primary w-full py-3.5 text-lg mt-2">
                        {passwordLoading ? 'Updating Security...' : 'Update Password'}
                    </button>
                </form>
            </div>

            <div className="glass-card p-6 md:p-8 mb-8 border-none ring-1 ring-red-500/20 shadow-xl shadow-red-500/5 relative overflow-hidden bg-white/40 dark:bg-secondary-900/40">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                        <Trash2 size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-secondary-900 dark:text-white">Danger Zone</h2>
                        <p className="text-secondary-500 dark:text-secondary-400">Permanently delete your account and data</p>
                    </div>
                </div>

                {deleteError && (
                    <div className="bg-red-50/80 dark:bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded-xl mb-6 flex items-start backdrop-blur-sm relative z-10">
                        <AlertCircle size={20} className="mr-3 flex-shrink-0 mt-0.5" />
                        <span>{deleteError}</span>
                    </div>
                )}

                <div className="bg-red-50/50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20 rounded-xl p-5 mb-6 relative z-10">
                    <p className="text-sm font-bold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
                        <AlertCircle size={16} /> Irreversible Action
                    </p>
                    <ul className="text-sm text-red-700/90 dark:text-red-300/80 space-y-2 list-disc list-inside">
                        <li>All your stories will be permanently deleted</li>
                        <li>All your comments will be removed</li>
                        <li>Your profile and identity will be completely erased</li>
                    </ul>
                </div>

                <form onSubmit={handleDeleteAccount} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                            Type <strong className="text-red-600 dark:text-red-400 font-bold px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 rounded">DELETE</strong> to confirm
                        </label>
                        <input
                            type="text"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            className="form-input w-full bg-white/50 dark:bg-secondary-800/50 border-red-200 dark:border-red-900/30 focus:ring-red-500 focus:border-red-500 rounded-xl transition-all"
                            placeholder="Confirm account termination"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={deleteLoading || deleteConfirmation !== 'DELETE'}
                        className="w-full px-4 py-3.5 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-red-500/20 hover:shadow-red-500/40 text-lg"
                    >
                        <Trash2 size={20} className="mr-2" />
                        {deleteLoading ? 'Erasing Data...' : 'Delete My Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}