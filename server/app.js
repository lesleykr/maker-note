require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require("./db");
let projects = require('./controllers/projectscontroller');
let user = require('./controllers/usercontroller');
let materials = require('./controllers/materialscontroller');
let projectsmaterials = require('./controllers/projectsMaterialsController')

sequelize.sync({});
app.use(require('./middleware/headers'));

app.use(express.json());
//ALL OTHER app.use statements must be below the JSON one(above)!!!!

app.use('/user', user);

app.use('/projects', projects);

app.use('/materials', materials);

app.use('/pm', projectsmaterials);

app.listen(3000, function(){
    console.log('App is listening on post 3000');
});

