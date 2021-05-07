const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
let validateSession = require('../middleware/validate-session');

//SIGNUP ENDPOINT
router.post("/create", function (req, res) {
  User.create({
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
    admin: req.body.user.admin
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
      res.json({
        user: user,
        message: "New Account Created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//LOGIN ENDPOINT
router.post("/login", function (req, res) {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
          bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
              if (matches) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                
                res.status(200).json({
                user: user,
                message: "Login Successful!",
                sessionToken: token,
                })
      } else {
          res.status(502).send({ error: "Login Failed"});
      }
    });
    } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//GET USER DETAILS
router.get("/mine", validateSession, (req, res) => {
  let userid = req.user.id
  User.findAll({
      where: { id: userid }      
  })
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json({ error: err }))
});

//UPDATE USER ENDPOINT
router.put("/update/:id", validateSession, function (req, res) {
  const updateUserEntry = {
      email: req.body.user.email,
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      aboutMe: req.body.user.aboutMe     
  };

  const query = { where: { id: req.user.id}};

  User.update(updateUserEntry, query)
  .then((user) => res.status(200).json(user))
  .catch((err) => res.status(500).json({ error: err }));
});

//DELETE USER ENDPOINT
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = {where: { id: req.params.id, userId: req.user.id}};

  User.destroy(query)
  .then(() => res.status(200).json({ message: "User Removed"}))
  .catch((err) => res.status(500).json({ error: err }));
});


//GET ALL PROJECTS FOR USER W/DB ASSOC.
router.get("/myprojects", validateSession, (req, res) => {
  let userid = req.user.id
  User.findAll({
      where: { id: userid },
      include: 'projects'
  })
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;
