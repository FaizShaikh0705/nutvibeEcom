module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Category", {
        mainCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        compareAtPrice: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        weight: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    });
};
