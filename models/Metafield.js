module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Metafield", {
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true // e.g. 'text', 'number', 'select'
        }
    });
};
