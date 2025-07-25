const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Product = require("./Product")(sequelize, Sequelize.DataTypes);
const Variant = require("./Variant")(sequelize, Sequelize.DataTypes);
const Category = require("./Category")(sequelize, Sequelize.DataTypes);
const Metafield = require("./Metafield")(sequelize, Sequelize.DataTypes);

// Relationships
Product.hasMany(Variant);
Variant.belongsTo(Product);

Product.hasOne(Category);
Category.belongsTo(Product);

Category.hasMany(Metafield);
Metafield.belongsTo(Category);

module.exports = {
    sequelize,
    Product,
    Variant,
    Category,
    Metafield,
};
