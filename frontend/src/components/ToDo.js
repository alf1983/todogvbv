import React from "react";
import {Link} from "react-router-dom";


const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text_note}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.updated}
            </td>
            <td>
                {todo.user_author}
            </td>
            <td>
                {todo.is_active}
            </td>
            <td>
                <button onClick={() => deleteToDo(todo.id)} type={"button"}>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <div>
            <table align={"center"} width={"75%"} border={1}>
                <thead>
                    <th>
                        Project Name
                    </th>
                    <th>
                        Note
                    </th>
                    <th>
                        Created time
                    </th>
                    <th>
                        Last updated time
                    </th>
                    <th>
                        Note Author
                    </th>
                    <th>
                        Is Active
                    </th>
                </thead>
                <tbody>
                {todos.map((todo) => <ToDoItem todo = {todo} deleteToDo = {deleteToDo}/>)}
                </tbody>
            </table>
            <table  align={"center"} width={"75%"}>
                <tr>
                    <td width={"100%"}>
                        <Link to='/ToDo/create'>Create</Link>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default ToDoList