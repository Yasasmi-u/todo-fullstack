
#  TODO App – Full Stack JavaScript Assignment

A modern full-stack TODO application built using **React**, **Vite**, **Node.js**, **Express.js**, and **MongoDB**.

This project was created as part of a take-home technical assignment to demonstrate full-stack development skills including frontend UI development, backend REST API design, database integration, validation, and clean project structure.

---

##  Features

- View all TODO items  
- Create a new TODO with title and optional description  
- Edit TODO title and description inline  
- Mark TODOs as Done / Undone  
- Delete TODOs  
- Search tasks by title or description  
- Filter tasks by **All / Active / Done**  
- Optimistic UI updates  
- Toast notifications for user actions  
- Responsive modern interface  
- Keyboard accessible controls  

---

##  Tech Stack

### Frontend
- React 18  
- Vite  
- CSS Modules  
- react-hot-toast  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

---

##  Project Structure

```

todo-fullstack/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── README.md
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
│
└── README.md

```

---

##  Setup Instructions

###  Prerequisites

- Node.js v18+  
- MongoDB (local) or MongoDB Atlas  

---

###  Backend Setup

```

cd backend
npm install

```

Create a `.env` file:

```

PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
CLIENT_ORIGIN=[http://localhost:5173](http://localhost:5173)

```

Start the backend server:

```

npm run dev

```

Backend runs on:  
http://localhost:5000  

---

###  Frontend Setup

```

cd frontend
npm install
npm run dev

```

Frontend runs on:  
http://localhost:5173  

---

##  API Endpoints

| Method | Endpoint              | Description               |
|--------|----------------------|---------------------------|
| GET    | /api/todos           | Get all TODO items        |
| POST   | /api/todos           | Create a new TODO         |
| PUT    | /api/todos/:id       | Update title/description  |
| PATCH  | /api/todos/:id/done  | Toggle done status        |
| DELETE | /api/todos/:id       | Delete TODO               |
| GET    | /health              | Health check              |

---

##  Example TODO Object

```

{
"_id": "6612ab34cd567890ef123456",
"title": "Finish assignment",
"description": "Submit before deadline",
"done": false,
"createdAt": "2026-04-24T12:00:00.000Z",
"updatedAt": "2026-04-24T12:00:00.000Z"
}

```

---

##  Functional Highlights

###  Optimistic UI Updates
Actions such as create, edit, delete, and toggle update instantly in the UI before waiting for server confirmation.

###  Search and Filter
- Search input  
- All filter  
- Active filter  
- Done filter  

###  Accessibility
- Enter → submit  
- Ctrl + Enter → save edits  
- Escape → cancel editing  

---

##  Validation Rules

- Title is required  
- Title cannot be empty  
- Max title length: 200 characters  
- Max description length: 1000 characters  

---

##  Assumptions & Limitations

- No authentication/login system  
- Single-user TODO management  
- No drag & drop ordering  
- Tasks sorted newest first  
- Requires MongoDB connection  

---

##  Scripts

### Backend

```

npm run dev
npm start

```

### Frontend

```

npm run dev
npm run build
npm run preview

```

---

##  Development Workflow

- main → production-ready branch  
- develop → development branch  

Pull requests:  
develop → main  

---

##  Why This Stack?

### React + Vite
Fast development speed and clean component structure.

### Express.js
Simple and scalable REST API framework.

### MongoDB
Flexible NoSQL database for CRUD apps.

---

##  Future Improvements

- User authentication  
- Categories / labels  
- Due dates  
- Dark mode  
- Drag & drop sorting  
- Docker deployment  
- Unit & integration tests  

---

##  Author

Developed by **Yasasmie Rajapakshe**.



