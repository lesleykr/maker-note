const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: !process.env.DATABASE_URL.includes('localhost') ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {}
});

sequelize.authenticate().then(
  function () {
    console.log("connected to maker-note postgres database");
  },
  function (err) {
    console.log(err);
  }
);

User = sequelize.import("./models/user");
Materials = sequelize.import("./models/materials");
Projects = sequelize.import("./models/projects");
PM = sequelize.import("./models/projectsMaterials");

User.hasMany(Projects);
Projects.belongsTo(User);

User.hasMany(Materials);
Materials.belongsTo(User);

Materials.belongsToMany(Projects, { through: PM, as: "MatProj" });
Projects.belongsToMany(Materials, { through: PM, as: "ProjMat" });

module.exports = sequelize;
