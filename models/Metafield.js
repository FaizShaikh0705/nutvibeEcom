module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Metafield", {
        key: DataTypes.STRING,
        value: DataTypes.STRING,
    });
};  