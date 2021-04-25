module.exports = {sequelize, DataTypes} => {
    const Projects = sequelize.define('projects', {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        dateStarted: {
            type: DataTypes.DATEONLY,            
        },
        dateFinished: {
            type: DataTypes.DATEONLY,            
        },
        medium: {
            type: DataTypes.STRING
        },
        totalMaterialCost: {
            type: DataTypes.INTEGER
        },
        forSale: {
            type: DataTypes.BOOLEAN
        },
        dateSold: {
            type: DataTypes.DATEONLY
        },
        price: {
            type: DataTypes.INTEGER
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
        Notes: {
            type: DataTypes.STRING(1000)
        }
    })
    return Projects
};