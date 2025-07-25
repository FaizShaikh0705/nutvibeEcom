const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Create product
router.post('/', upload.single('media'), createProduct);

// Get all products
router.get('/', getProducts);

// Update product
router.put('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);



module.exports = router;
