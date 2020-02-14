import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const history = useHistory();
    console.log(projects)

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/projects`)
        .then(res => {
            setProjects(res.data)
        })
        .catch(err => {
            console.log("err")
        })
    },[])


    return (
        <div>
            {projects.length === 0 && (<p>No projects exists!!!</p>)}
            {projects.map(project => (
                <div onClick={()=>history.push(`/${project.id}`)} key={project.id} style={{border: "solid black 1px", margin: "5%"}}>
                    <p>Project ID: {project.id}</p>
                    <p>Name: {project.name}</p>
                    <p>Completed: {project.completed.toString()}</p>
                </div>
            ))}
        </div>
    )
}

export default Projects;