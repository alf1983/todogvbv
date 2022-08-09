import React from "react";


const UsersItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return (
        <table align={"center"} width={"75%"} border={1}>
            <thead>
                <th>
                    Username
                </th>
                <th>
                    First Name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    E-Mail
                </th>
            </thead>
            <tbody>
            {users.map((user) => <UsersItem user = {user} />)}
            </tbody>
        </table>
    )
}

export default UsersList