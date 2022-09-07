import React from "react";


const ToDoItem = ({todo}) => {
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
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
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
            {todos.map((todo) => <ToDoItem todo = {todo} />)}
            </tbody>
        </table>
    )
}

export default ToDoList