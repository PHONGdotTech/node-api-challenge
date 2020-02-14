import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

const Project = () => {
    const [project, setProject] = useState({id: "", name: "", actions: []});
    const history = useHistory();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/projects/${id}`)
        .then(res => {
            setProject(res.data)
        })
        .catch(err => {
            console.log("err")
        })
    },[])

    return (
        <div>
            <button onClick={()=>history.push("/")} >Back to Projects</button>
            <p>Project ID: {project.id}</p>
            <p>Name: {project.name}</p>
            <div>
                <h4>Actions:</h4> 
                {project.actions.map(action => (
                    <div key={action.id} style={{border: "solid black 1px", margin: "5%"}}>
                        <p>Action description: {action.description}</p>
                        <p>Action notes: {action.notes}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}


export default Project;