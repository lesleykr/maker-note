module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define('projects', {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false           
        },
        dateStarted: {
            type: DataTypes.STRING            
        },
        dateFinished: {
            type: DataTypes.STRING            
        },
        medium: {
            type: DataTypes.STRING
        },
        totalMaterialCost: {
            type: DataTypes.STRING
        },
        forSale: {
            type: DataTypes.BOOLEAN
        },
        public: {
            type: DataTypes.BOOLEAN
        },
        dateSold: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        storeSoldAt: {
            type: DataTypes.STRING
        },
        pictureUrl1: {
            type: DataTypes.STRING
        },
        pictureUrl2: {
            type: DataTypes.STRING
        },
        pictureUrl3: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.STRING(1000)
        },       
    })
    return Projects
};