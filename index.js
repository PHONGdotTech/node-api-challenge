const express = require("express");
const projectRouter = require("./data/projects/projectRouter.js")
const actionRouter = require("./data/actions/actionRouter.js")

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter)

const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log(`\n Server running on port ${port}`)
})