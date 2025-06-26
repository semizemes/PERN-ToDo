import express from 'express';
import cors from 'cors';
import db from './db.js';

const port = 3000;

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});