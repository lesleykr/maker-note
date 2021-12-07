const { Router } = require("express");
let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Projects = require("../db").import("../models/projects");
const Materials = require("../db").import("../models/materials");
const PM = require("../db").import("../models/projectsMaterials");

//CREATE PROJECT ENDPOINT W/MATERIALS
router.post("/createmat", validateSession, (req, res) => {
  Promise.all([
    Projects.create({
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
      status: req.body.projects.status,
      technique: req.body.projects.technique,
      dimensions: req.body.projects.dimensions,
      tags: req.body.projects.tags,
      sold: req.body.projects.sold,
      productUrl: req.body.projects.productUrl,
      notes: req.body.projects.notes,
      userId: req.user.id,
    }),
  ])
    .then(([Projects, Materials]) =>
      PM.create({ projectId: Projects.id, materialId: req.body.materials.id })
    )
    .catch((error) => res.status(400).send(error));
});

//ASSOCIATE PROJECT AND MATERIAL ENDPOINT
router.post("/create", validateSession, (req, res) => {
  Promise.all([
    Projects.create({ projectName: req.body.projects.projectName }),
    Materials.create({ materialName: req.body.materials.materialName }),
  ])
    .then(([Projects, Materials]) =>
      PM.create({ projectId: Projects.id, materialId: Materials.id })
    )
    .catch((error) => res.status(400).send(error));
});

//DIRECTLY TO PROJECTSMATERIALS TABLE
router.post("/projects/:pid/materials/:mid", async (req, res) => {
  try {
    const projects = await Projects.findOne({ where: { id: req.params.pid } });
    const materials = await Materials.findOne({
      where: { id: req.params.mid },
    });
    const result = await projects.addProjMat(materials);
    res.json(result);
  } catch (err) {
    res.json({ error: err });
  }
});

//DIRECTLY TO PROJECTSMATERIALS TABLE
router.put("/projects/:pid/materials/:mid", async (req, res) => {
  try {
    const updateProjects = await Projects.findOne({
      where: { id: req.params.pid },
    });
    const materials = await Materials.findOne({
      where: { id: req.params.mid },
    });
    const result = await projects.addProjMat(materials);
    res.json(result);
  } catch (err) {
    res.json({ error: err });
  }
});
module.exports = router;
