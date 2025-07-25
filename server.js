require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { sequelize } = require("./models");
const productRoutes = require("./routes/productRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running on port 5000");
    });
});
