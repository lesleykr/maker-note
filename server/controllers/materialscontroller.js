let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Materials = require("../db").import("../models/materials");

router.get("/practice", validateSession, function (req, res) {
  res.send("this is a practice route");
});

//CREATE MATERIAL ENDPOINT
router.post("/create", validateSession, (req, res) => {
  const materialsEntry = {
    materialName: req.body.materials.materialName,
    quantity: req.body.materials.quantity,
    costPerItem: req.body.materials.costPerItem,
    color: req.body.materials.color,
    size: req.body.materials.size,
    source: req.body.materials.source,
    storageLocation: req.body.materials.storageLocation,
    description: req.body.materials.description,
    notes: req.body.materials.notes,
    userId: req.user.id,
  };
  Materials.create(materialsEntry)
    .then((materials) => res.status(200).json(materials))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET ALL MATERIALS ENDPOINT
router.get("/", (req, res) => {
  Materials.findAll()
    .then((materials) => res.status(200).json(materials))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET MATERIALS BY USER ENDPOINT
router.get("/mine", validateSession, (req, res) => {
  let userid = req.user.id;
  Materials.findAll({
    where: { userId: userid },
  })
    .then((materials) => res.status(200).json(materials))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET MATERIALS BY NAME ENDPOINT
router.get("/:materialName", function (req, res) {
  let materialName = req.params.materialName;

  Materials.findAll({
    where: { materialName: materialName },
  })
    .then((materials) => res.status(200).json(materials))
    .catch((err) => res.status(500).json({ error: err }));
});

//UPDATE MATERIALS ENDPOINT
router.put("/update/:entryId", validateSession, function (req, res) {
  const updateMaterialsEntry = {
    materialName: req.body.materials.materialName,
    quantity: req.body.materials.quantity,
    costPerItem: req.body.materials.costPerItem,
    color: req.body.materials.color,
    size: req.body.materials.size,
    source: req.body.materials.source,
    storageLocation: req.body.materials.storageLocation,
    description: req.body.materials.description,
    notes: req.body.materials.notes,
  };

  const query = { where: { id: req.params.entryId, userId: req.user.id } };

  Materials.update(updateMaterialsEntry, query)
    .then((materials) => res.status(200).json(materials))
    .catch((err) => res.status(500).json({ error: err }));
});

//DELETE MATERIALS ENDPOINT
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, userId: req.user.id } };

  Materials.destroy(query)
    .then(() => res.status(200).json({ message: "Material Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
