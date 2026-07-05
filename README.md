# ✨ Inkspire

A modern full-stack blogging platform built with **React, FastAPI, PostgreSQL, and Tailwind CSS**, designed for students to share stories, anonymous confessions, and fun campus moments.

## 🌐 Live Demo

- **Frontend:** https://inkspire-iiit.netlify.app
- **Backend API:** https://inkspire-backend-n1nc.onrender.com
- **API Docs:** https://inkspire-backend-n1nc.onrender.com/docs

---

# 🚀 Features

### 📝 Blogging
- Create, edit and delete blog posts
- Rich text editor
- Beautiful responsive UI
- View post details

### ❤️ Engagement
- Like posts
- Bookmark posts
- Comment on posts

### 🤫 Anonymous Confessions
- Share anonymous confessions
- Emoji reactions

### 💬 Overheard
- Post funny campus conversations
- Random colorful cards
- Responsive masonry layout

### 👤 User Features
- JWT Authentication
- User Dashboard
- Personal posts
- Personal comments
- Saved bookmarks

### 🎨 UI
- Light/Dark mode
- Glassmorphism design
- Responsive layout
- Animated backgrounds

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Passlib
- Python

---

# 📂 Project Structure

```
Inkspire
│
├── backend
│   ├── app
│   ├── routers
│   ├── models
│   ├── schemas
│   └── auth
│
└── frontend
    ├── src
    ├── components
    ├── pages
    ├── services
    └── contexts
```

---

# ⚙️ Local Setup

## Clone

```bash
git clone https://github.com/shraddha-cse24/Inkspire.git
```

Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Backend

```
DATABASE_URL=

SECRET_KEY=

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

Frontend

```
VITE_API_BASE=
```

---

# 📸 Screenshots
<img width="1834" height="908" alt="image" src="https://github.com/user-attachments/assets/599f46bc-dd5a-4e75-a332-a01de2577307" />
<img width="1894" height="827" alt="image" src="https://github.com/user-attachments/assets/5925f6c3-47ee-4e34-93ae-696e4929eb11" />
<img width="611" height="804" alt="image" src="https://github.com/user-attachments/assets/4dbc30f5-3b5f-4edd-b502-6bbb24f02cb5" />
<img width="1914" height="873" alt="image" src="https://github.com/user-attachments/assets/5c737e67-ffa5-468c-b2a0-5dd765adfc01" />
<img width="1593" height="797" alt="image" src="https://github.com/user-attachments/assets/9616b90d-588d-4da8-96fb-aea2f13ecdab" />
<img width="1792" height="906" alt="image" src="https://github.com/user-attachments/assets/ae710359-e074-490e-82fb-6575519e773c" />

---

# 👩‍💻 Author

**Shraddha Singh**

B.Tech CSE
IIITDM Jabalpur

GitHub:
https://github.com/shraddha-cse24
