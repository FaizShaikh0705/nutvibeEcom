module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Category", {
        mainCategory: DataTypes.STRING,
        compareAtPrice: DataTypes.FLOAT,
        weight: DataTypes.STRING,
        image: DataTypes.STRING,
    });
};  