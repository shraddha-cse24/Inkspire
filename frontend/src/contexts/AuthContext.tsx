import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";

import {
    apiFetch,
    setToken,
    removeToken,
    getToken,
} from "../lib/api";

interface User {
    id: string;
    email: string;
    username: string;
    full_name?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;

    signIn(
        email: string,
        password: string
    ): Promise<void>;

    signUp(
        email: string,
        password: string,
        username: string
    ): Promise<void>;

    logout(): void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        if (!getToken()) {
            setLoading(false);
            return;
        }

        try {
            const me = await apiFetch("/auth/me");
            setUser(me);
        } catch {
            removeToken();
        } finally {
            setLoading(false);
        }
    }

    async function signIn(
        email: string,
        password: string
    ) {
        const form = new URLSearchParams();

        form.append("username", email);
        form.append("password", password);

        const res = await fetch(
            `${import.meta.env.VITE_API_BASE}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
                body: form,
            }
        );

        if (!res.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await res.json();

        setToken(data.access_token);

        setUser(data.user);
    }

    async function signUp(
        email: string,
        password: string,
        username: string
    ) {
        const data = await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                username,
                full_name: username,
            }),
        });

        setToken(data.access_token);
        setUser(data.user);
    }

    function logout() {
        removeToken();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signIn,
                signUp,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be inside AuthProvider"
        );
    }

    return context;
}