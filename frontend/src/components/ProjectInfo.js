import React from "react";
import { useParams } from 'react-router-dom'

const ProjectInfo = ({projects, deleteProject}) => {

    let { id } = useParams();
    //console.log(projects)
    const project = projects.find((item) => item.id === parseInt(id))
    //console.log(project)
    return (
        <table align={"center"} width={"75%"} border={1}>
            <thead>
                <th>
                    Project Name
                </th>
                <th>
                    Project Repository Link
                </th>
                <th>
                    Project Users
                </th>
                <th>
                    Action
                </th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {project.name}
                    </td>
                    <td>
                        {project.repo_link}
                    </td>
                    <td>
                        {project.users}
                    </td>
                    <td>
                        <button onClick={() => deleteProject(project.id)} type={"button"}>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
export default ProjectInfo