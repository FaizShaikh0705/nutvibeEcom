module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Variant", {
        option: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        compareAtPrice: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        taxable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        costPerItem: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    });
};
