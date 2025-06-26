# Todo Application

A full-stack Todo application built with React and Node.js, featuring a PostgreSQL database for data persistence.

## 🚀 Features

- Create, read, update, and delete todo items
- React frontend with modern UI
- RESTful API backend
- PostgreSQL database integration
- Responsive design

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.0
- **React DOM** 19.1.0
- **React Scripts** 5.0.1
- **Testing Library** for unit testing

### Backend
- **Node.js** with Express 5.1.0
- **PostgreSQL** with pg 8.16.2
- **CORS** 2.8.5 for cross-origin requests
- **dotenv** 16.5.0 for environment variables

## 📁 Project Structure

```
project/
├── client/           # React frontend application
│   ├── src/          # Source files
│   ├── public/       # Public assets
│   └── package.json  # Frontend dependencies
├── server/           # Node.js backend application
│   ├── index.js      # Main server file
│   ├── db.js         # Database configuration
│   ├── queries.sql   # SQL queries
│   ├── .env          # Environment variables
│   └── package.json  # Backend dependencies
└── README.md         # This file
```

## 🔧 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** package manager
- **PostgreSQL** database server

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Database Setup

1. Install and start PostgreSQL
2. Create a new database:

```sql
CREATE DATABASE TODO;
```

3. Create the required table:

```sql
CREATE TABLE TODOLIST(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);
```

### 3. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=TODO
DB_USER=your_username
DB_PASSWORD=your_password
```

### 4. Frontend Setup

```bash
cd client
npm install
```

## 🏃‍♂️ Running the Application

### Start the Backend Server

```bash
cd server
npm start
```

The server will start on `http://localhost:5000` (or your configured port).

### Start the Frontend Application

```bash
cd client
npm start
```

The React application will start on `http://localhost:3000`.

## 🧪 Testing

### Frontend Tests

```bash
cd client
npm test
```

## 📚 API Endpoints

The backend provides RESTful API endpoints for todo management:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request


## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**: Ensure PostgreSQL is running and credentials in `.env` are correct
2. **Port Already in Use**: Check if ports 3000 or 5000 are available
3. **Module Not Found**: Run `npm install` in both client and server directories


**Happy Coding! 🎉**
