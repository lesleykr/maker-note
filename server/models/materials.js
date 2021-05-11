module.exports = (sequelize, DataTypes) => {
  const Materials = sequelize.define("materials", {
    materialName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
    },
    costPerItem: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.STRING,
    },
    storageLocation: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    notes: {
      type: DataTypes.STRING(1000),
    },
  });
  return Materials;
};
