require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { sequelize } = require("./models");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running on port 5000");
    });
});
