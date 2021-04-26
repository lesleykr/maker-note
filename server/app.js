require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require("./db");
let projects = require('./controllers/projectscontroller');
let user = require('./controllers/usercontroller');
let materials = require('./controllers/materialscontroller');

sequelize.sync();

app.use(express.json());
//ALL OTHER app.use statements must be below the JSON one(above)!!!!

app.use('/projects', projects);

app.use('/user', user);

app.use('/materials', materials);

app.listen(3000, function(){
    console.log('App is listening on post 3000');
});
