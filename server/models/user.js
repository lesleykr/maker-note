module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        aboutMe: {
            type: DataTypes.STRING(1000)
        },
        isAdmin: {
            type: DataTypes.BOOLEAN
        }
    })
    return User
};