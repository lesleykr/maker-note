const Sequelize = require('sequelize');

const sequelize = new Sequelize('maker-note', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
  });

  sequelize.authenticate().then(
      function() {
          console.log('connected to maker-note postgres database');
      },
      function(err){
          console.log(err);
      }
  );

  User = sequelize.import('./models/user');
  Materials = sequelize.import('./models/materials');
  Projects = sequelize.import('./models/projects');
  PM = sequelize.import('./models/projectsMaterials');

  User.hasMany(Projects);
  Projects.belongsTo(User);

  User.hasMany(Materials);
  Materials.belongsTo(User);

  Materials.belongsToMany(Projects, {through: PM})
  Projects.belongsToMany(Materials, {through: PM})
  

  module.exports = sequelize;