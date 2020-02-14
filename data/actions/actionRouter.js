const express = require("express");

const router = express.Router();

const Actions = require("../helpers/actionModel.js")
const Projects = require("../helpers/projectModel.js")

//Create an action
router.post("/", validateActionBody, validateProjectId, (req, res)=> {
    Actions.insert(req.body)
    .then(inserted=>{
        res.status(201).json({
            message: "Created Successfully",
            newAction: inserted
        })
    })
    .catch(err =>{
        res.status(500).json({message: "There was an error adding the new action to the server."})
    })
})

//Read all actions
router.get("/", (req, res)=>{
    Actions.get()
    .then(actions=> {
        res.status(200).json(actions)
    })
    .catch(err=>{
        res.status(500).json({message: "There was an error getting actions from the server."})
    })
})

//Read a single action
router.get("/:id", validateActionId, (req, res)=>{
    res.status(200).json(req.action)
})

//Update an action
router.put("/:id", validateActionBody, validateActionId, (req,res)=>{
    Actions.update(req.params.id, req.body)
    .then(updatedAction=>{
        res.status(200).json({
            message: "Successfully updated.",
            oldAction: req.action,
            updatedAction: updatedAction
        })
    })
    .catch(err=>{
        res.status(500).json({message:"There was an error updating the action to the server."})
    })
})

//Delete an action
router.delete("/:id", validateActionId, (req,res)=>{
    Actions.remove(req.params.id)
    .then(deletedCount=>{
        res.status(200).json({message:`Deleted ${deletedCount} action(s) with ID of ${req.params.id}`})
    })
    .catch(err=>{
        res.status(500).json({message:"There was an error deleting the action from the server."})
    })
})

//middleware
function validateProjectId(req, res, next){
    Projects.get(req.body.project_id)
    .then(project=>{
        // if no project exists, respond with project not found, else assign to req.project and next
        !project ? res.status(404).json({errorMessage:"Project not found."}) : 
        (req.project = project, next())
    })
    .catch(err=>{
        res.status(500).json({message: "There was an error getting the project from the server to verify it exists."})
    })
}

function validateActionId(req, res, next){
    Actions.get(req.params.id)
    .then(action=>{
        // if no action exists, respond with action not found, else assign to req.action and next
        !action ? res.status(404).json({errorMessage:"Action not found."}) : 
        (req.action = action, next())
    })
    .catch(err=>{
        res.status(500).json({message: "There was an error getting the action from the server to verify it exists."})
    })
}

function validateActionBody(req, res, next){
    Object.keys(req.body).length === 0 && req.body.constructor === Object 
    ? 
    res.status(400).json({errorMessage:"Missing action data in the request body."}) 
    :
    !req.body.description || !req.body.notes || !req.body.project_id ? res.status(400).json({
        errorMessage:"'project_id', 'description', and 'notes' are required.",
        youEntered: req.body
    }) : next()
}

module.exports = router;