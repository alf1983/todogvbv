import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table align={"center"} width={"75%"} border={1}>
            <thead>
                <th>
                    Project Name
                </th>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem project = {project} />)}
            </tbody>
        </table>
    )
}

export default ProjectList