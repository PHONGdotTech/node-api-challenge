const express = require("express");

const router = express.Router();

const Projects = require("../helpers/projectModel.js")

//Create a project
router.post("/", (req, res)=> {
    Projects.insert(req.body)
    .then(inserted=>{
        res.status(201).json({
            message: "Created Successfully",
            newProject: inserted
        })
    })
    .catch(err =>{
        res.status(500).json({message: "There was an error adding the new project to the server."})
    })
})

//Read all projects
router.get("/", (req, res)=>{
    Projects.get()
    .then(projects=> {
        res.status(200).json(projects)
    })
    .catch(err=>{
        res.status(500).json({message: "There was an error getting projects from the server."})
    })
})

//Read a single project
router.get("/:id", validateId, (req, res)=>{
    res.status(200).json(req.project)
})

//Update a project
router.put("/:id", validateId, (req, res)=>{
    Projects.update(req.params.id, req.body)
    .then(updatedProject=>{
        res.status(200).json({
            message: "Successfully updated.",
            oldProject: req.project,
            updatedProject: updatedProject
        })
    })
    .catch(err =>{
        res.status(500).json({message: "There was an error updating the project to the server."})
    })
})

//Delete a project
router.delete("/:id", validateId, (req, res)=>{
    Projects.remove(req.params.id)
    .then(deletedCount =>{
        res.status(200).json({message: `Deleted ${deletedCount} project(s) with ID of ${req.params.id}`})
    })
    .catch(err=>{
        res.status(500).json({message: "There was a problem deleting the project from the server."})
    })
})

//middleware
function validateId(req, res, next){
    Projects.get(req.params.id)
    .then(project=>{
        // if no project exists, respond with project not found, else assign to req.project and next
        !project ? res.status(404).json({message:"Project not found."}) : 
        (req.project = project, next())
    })
    .catch(err=>{
        res.status(500).json({message: "There was an error getting the project from the server to verify it exists."})
    })
}

module.exports = router;