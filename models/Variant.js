module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Variant", {
        option: DataTypes.STRING,
        sku: DataTypes.STRING,
        price: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER,
    });
};  