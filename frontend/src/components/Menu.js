import React from 'react'
import {Link} from "react-router-dom";


const Menu = () => {
    return (

            <nav>
                <table width={"100%"}>
                    <th>
                        <Link to='/'>Пользователи</Link>
                    </th>
                    <th>
                        <Link to='/Projects'>Проекты</Link>
                    </th>
                    <th>
                        <Link to='/ToDo'>ToDo</Link>
                    </th>
                </table>
            </nav>

        )
}

export default Menu