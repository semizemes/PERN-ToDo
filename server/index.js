import express from 'express';
import cors from 'cors';
import db from './db.js';

const PORT = process.env.PORT || 3000;

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes

//create a todo
app.post('/todos', async (req, res) => {
    try {
        console.log(req.body);
        const {description} = req.body;
        const newToDo = await db.query("INSERT INTO todolist (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newToDo.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
});

//get all todos
app.get("/todos", async (req, res) => {
    try{
        console.log(req.body);
        const todoArr = await db.query("select * from todolist");

        res.json(todoArr.rows);
    } catch (e){
        console.log(e.message);
    }
});

//get a todo
app.get('/todos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const isToDo = await db.query("select * FROM todolist WHERE todo_id = ($1)", [id]);

        res.json(isToDo.rows[0]);
    } catch (e){
        console.log(e.message);
    }
});

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateToDo = await db.query("update todolist SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("ToDo was updated!")
    } catch (e) {
        console.log(e.message)
    }
})

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const deletedToDo = await db.query("delete from todolist where todo_id=$1", [id]);

        res.json(`the item with ID: ${id} was deleted!`);
    } catch (e) {
        console.log(e.message);
    }
})

//route that check connection of database
app.get('/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({
            success: true,
            time: result.rows[0].now,
            message: 'Database connected successfully'
        });
    } catch (err) {
        console.error('Database test failed:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});