import React, {Fragment, useState} from "react";

const InputTodo = () => {

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    const [description, setDescription] = useState('');

    const onSubmitForm = async e => {
        try {
            const body = {description};
            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN ToDo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description}
                       onChange={event => setDescription(event.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
};

export default InputTodo;