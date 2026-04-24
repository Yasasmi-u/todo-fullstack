# TODO App — Backend

Express.js REST API with MongoDB persistence.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose ODM

## Setup & Run

### Prerequisites

- Node.js v18+
- MongoDB running locally **or** a MongoDB Atlas connection string

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app   # or your Atlas URI
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Start the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/todos            | Get all TODO items       |
| POST   | /api/todos            | Create a new TODO        |
| PUT    | /api/todos/:id        | Update title/description |
| PATCH  | /api/todos/:id/done   | Toggle done status       |
| DELETE | /api/todos/:id        | Delete a TODO            |
| GET    | /health               | Health check             |

## MongoDB Notes

- **Local**: Make sure `mongod` is running before starting the server.
- **Atlas**: Replace `MONGODB_URI` in `.env` with your Atlas connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/todo-app`).
- The database and collection are created automatically on first write.

## Assumptions & Limitations

- No authentication — the API is open.
- TODOs are returned newest-first (`createdAt` descending).
- Title max length: 200 characters. Description max: 1000 characters.
