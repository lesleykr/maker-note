let express = require('express');
let router = express.Router();

router.get('/practice', function(req, res){
    res.send("this is a practice route");
});

router.get('/about', function(req, res){
    res.send('this is the about route');
});


module.exports = router;