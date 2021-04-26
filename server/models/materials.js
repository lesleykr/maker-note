module.exports = (sequelize, DataTypes) => {
    const Materials = sequelize.define('materials', {
        materialName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        quantity: {
            type: DataTypes.DECIMAL
        },
        costPerItem: {
            type: DataTypes.DECIMAL
        },
        color: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.STRING
        },
        source: {
            type: DataTypes.STRING
        },
        storageLocation: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING(1000)
        },
        notes: {
            type: DataTypes.STRING(1000)
        }
    })
    return Materials
};