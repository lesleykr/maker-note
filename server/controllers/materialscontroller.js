let express = require('express');
let router = express.Router();

let validateSession = require('../middleware/validate-session');

router.get('/practice', validateSession, function(req, res){
    res.send("this is a practice route");
});

router.get('/about', function(req, res){
    res.send('this is the about route');
});


module.exports = router;