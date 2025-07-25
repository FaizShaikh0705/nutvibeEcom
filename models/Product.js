module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Product", {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        media: DataTypes.STRING,
        category: DataTypes.STRING,
    });
}; 