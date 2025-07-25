module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Category", {
        mainCategory: DataTypes.STRING,
        compareAtPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    });
};
