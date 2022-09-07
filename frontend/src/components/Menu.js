import React from 'react'
import {Link} from "react-router-dom";


const Menu = ({cls}) => {

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
                    <th>
                        {cls.is_authenticated() ? <span>{cls.state.username}</span> : <span></span>}
                    </th>
                    <th>
                        {cls.is_authenticated() ?  <button onClick={()=>cls.logout()}> Logout</button> : <Link to='/login'>Login</Link>}
                    </th>
                </table>
            </nav>

        )
}

export default Menu