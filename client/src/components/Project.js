import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

const Project = () => {
    const [project, setProject] = useState([]);
    const history = useHistory();
    const {id} = useParams();
    console.log(project)

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/projects/${id}`)
        .then(res => {
            setProject(res.data)
        })
        .catch(err => {
            console.log("err")
        })
    },[])

    console.log(project.actions)
    return (
        <div>
            <p>Project ID: {project.id}</p>
            <p>Name: {project.name}</p>
            <p>Actions: {project.actions}</p>
        </div>
    )
}


export default Project;