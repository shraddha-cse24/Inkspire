import { Link, NavLink } from "react-router-dom";
import { PenSquare } from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive
        ? "text-primary-600 font-semibold"
        : "text-secondary-600 dark:text-secondary-300 hover:text-primary-500"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-secondary-950/70 border-b border-secondary-200 dark:border-secondary-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-display font-extrabold text-primary-600"
        >
          Inkspire
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/confessions" className={navClass}>
            Confessions
          </NavLink>

          <NavLink to="/overheard" className={navClass}>
            Overheard
          </NavLink>

          {user && (
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `${navClass({ isActive })} flex items-center gap-1`
              }
            >
              <PenSquare size={18} />
              Write
            </NavLink>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={navClass}
              >
                Dashboard
              </NavLink>

              <button
                onClick={logout}
                className="btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={navClass}
              >
                Login
              </NavLink>

              <Link
                to="/register"
                className="btn-primary"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
}