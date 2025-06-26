import React, {Fragment, useState, useEffect} from "react";
import EditToDo from "./EditToDo";

const ListTodos = () => {

    const [todos, setTodos] = useState([])

    //delete function
    const deleteTodo = async (id) => {
        try{
            const deleteItem = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => {
                return todo.todo_id !== id;
            }));
        }catch (e) {
            console.log(e.message)
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo) => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <EditToDo todo={todo} />
                        </td>
                        <td>
                            <button id={todo.todo_id} className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;