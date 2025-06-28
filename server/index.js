import express from 'express';
import cors from 'cors';
import db from './db.js';

const PORT = process.env.PORT || 3000;

const app = express();

console.log('Starting server...');
console.log('PORT:', PORT);

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

//Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running!',
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

//Routes

//create a todo
app.post('/todos', async (req, res) => {
    try {
        console.log('POST /todos - Body:', req.body);
        const {description} = req.body;
        const newToDo = await db.query(
            "INSERT INTO todolist (description) VALUES($1) RETURNING *",
            [description]
        );

        console.log('Todo created:', newToDo.rows[0]);
        res.json(newToDo.rows[0]);
    } catch (err) {
        console.error('POST /todos error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

//get all todos
app.get("/todos", async (req, res) => {
    try{
        console.log('GET /todos called');
        const todoArr = await db.query("SELECT * FROM todolist");

        console.log('Found todos:', todoArr.rows.length);
        res.json(todoArr.rows);
    } catch (err){
        console.error('GET /todos error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

//get a todo
app.get('/todos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        console.log('GET /todos/:id called with id:', id);

        const isToDo = await db.query(
            "SELECT * FROM todolist WHERE todo_id = $1",
            [id]
        );

        if (isToDo.rows.length === 0) {
            console.log('Todo not found for id:', id);
            return res.status(404).json({ error: 'Todo not found' });
        }

        console.log('Todo found:', isToDo.rows[0]);
        res.json(isToDo.rows[0]);
    } catch (err){
        console.error('GET /todos/:id error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        console.log('PUT /todos/:id called with id:', id, 'description:', description);

        const updateToDo = await db.query(
            "UPDATE todolist SET description = $1 WHERE todo_id = $2 RETURNING *",
            [description, id]
        );

        if (updateToDo.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        console.log('Todo updated:', updateToDo.rows[0]);
        res.json({ message: "Todo was updated!", todo: updateToDo.rows[0] });
    } catch (err) {
        console.error('PUT /todos/:id error:', err.message);
        res.status(500).json({ error: err.message });
    }
})

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        console.log('DELETE /todos/:id called with id:', id);

        const deletedToDo = await db.query(
            "DELETE FROM todolist WHERE todo_id = $1 RETURNING *",
            [id]
        );

        if (deletedToDo.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        console.log('Todo deleted:', deletedToDo.rows[0]);
        res.json({ message: `Todo with ID: ${id} was deleted!` });
    } catch (err) {
        console.error('DELETE /todos/:id error:', err.message);
        res.status(500).json({ error: err.message });
    }
})

//route that check connection of database
app.get('/test-db', async (req, res) => {
    try {
        console.log('Testing database connection...');
        const result = await db.query('SELECT NOW()');
        console.log('Database test successful');
        res.json({
            success: true,
            time: result.rows[0].now,
            message: 'Database connected successfully'
        });
    } catch (err) {
        console.error('Database test failed:', err.message);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

console.log('Starting server on port', PORT);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully started on port ${PORT}`);
});

console.log('Server setup complete');