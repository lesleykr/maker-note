const { Router } = require('express');
let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Projects = require('../db').import('../models/projects');

router.get('/practice', validateSession, function(req, res){
    res.send("this is a practice route");
});

//CREATE PROJECT ENDPOINT
router.post('/create', validateSession, (req, res) => {
    const projectsEntry = {
        projectName: req.body.projects.projectName,
        dateStarted: req.body.projects.dateStarted,
        dateFinished: req.body.projects.dateFinished,
        medium: req.body.projects.medium,
        totalMaterialCost: req.body.projects.totalMaterialCost,
        forSale: req.body.projects.forSale,
        dateSold: req.body.projects.dateSold,
        price: req.body.projects.price,
        storeSoldAt: req.body.projects.storeSoldAt,
        pictureUrl1: req.body.projects.pictureUrl1,
        pictureUrl2: req.body.projects.pictureUrl2,
        pictureUrl3: req.body.projects.pictureUrl3,            
        type: req.body.projects.type,
        notes: req.body.projects.notes,
        userId: req.user.id
}
    Projects.create(projectsEntry)
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ error: err }))
});


//GET ALL PROJECTS ENDPOINT
router.get("/", validateSession, (req, res) => {
    Projects.findAll()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ error: err }))
});

//GET PROJECTS BY USER ENDPOINT
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Projects.findAll({
        where: { userId: userid }
    })
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: err }))
});

//GET PROJECT BY NAME ENDPOINT
router.get("/:projectName", function (req, res) {
    let projectName = req.params.projectName;

    Projects.findAll({
        where: { projectName: projectName }
    })
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: err }))
});

//UPDATE PROJECT ENDPOINT
router.put("/update/:entryId", validateSession, function (req, res) {
    const updateProjectsEntry = {
        projectName: req.body.projects.projectName,
        dateStarted: req.body.projects.dateStarted,
        dateFinished: req.body.projects.dateFinished,
        medium: req.body.projects.medium,
        totalMaterialCost: req.body.projects.totalMaterialCost,
        forSale: req.body.projects.forSale,
        dateSold: req.body.projects.dateSold,
        price: req.body.projects.price,
        storeSoldAt: req.body.projects.storeSoldAt,
        pictureUrl1: req.body.projects.pictureUrl1,
        pictureUrl2: req.body.projects.pictureUrl2,
        pictureUrl3: req.body.projects.pictureUrl3,            
        type: req.body.projects.type,
        notes: req.body.projects.notes,      
    };

    const query = { where: { id: req.params.entryId, userId: req.user.id}};

    Projects.update(updateProjectsEntry, query)
    .then((projects) => res.status(200).json(projects))
    .catch((err) => res.status(500).json({ error: err }));
});


//DELETE PROJECT ENDPOINT
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = {where: { id: req.params.id, userId: req.user.id}};

    Projects.destroy(query)
    .then(() => res.status(200).json({ message: "Project Removed"}))
    .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;