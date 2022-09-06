import React from "react";
import { useParams } from 'react-router-dom'

const ProjectInfo = ({projects}) => {

    let { id } = useParams();
    //console.log(projects)
    let project = projects.find(((item) => item.id == id))
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
                </tr>
            </tbody>
        </table>
    )
}
export default ProjectInfo