import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type={"button"}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table align={"center"} width={"75%"} border={1}>
            <thead>
                <th>
                    Project Name
                </th>
                <th></th>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem project = {project} deleteProject = {deleteProject}/>)}
            </tbody>
        </table>
    )
}

export default ProjectList