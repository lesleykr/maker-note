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


  module.exports = sequelize;