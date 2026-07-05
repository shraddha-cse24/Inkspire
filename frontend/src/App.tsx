import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatBot from "./components/chatbot/ChatBot";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import Settings from "./pages/Settings";
import Confessions from "./pages/Confessions";
import Overheard from "./pages/Overheard";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col relative z-0 overflow-hidden text-secondary-900 dark:text-white transition-colors duration-500">

            {/* Mesh Background */}
            <div className="mesh-bg"></div>

            {/* Animated Blobs */}
            <div className="blob-shape bg-primary-400/20 top-0 -left-10 w-96 h-96"></div>

            <div className="blob-shape bg-accent-400/20 top-40 -right-10 w-96 h-96 animation-delay-2000"></div>

            <div className="blob-shape bg-primary-300/20 -bottom-20 left-40 w-[30rem] h-[30rem] animation-delay-4000"></div>

            <Navbar />

            <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-grow relative z-10 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/confessions" element={<Confessions />} />
                <Route path="/overheard" element={<Overheard />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/post/:id/edit" element={<EditPost />} />
                <Route path="*" element={<h1>404 Page Not Found</h1>} />
              </Routes>
            </main>

            <Footer />

            <ChatBot />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;