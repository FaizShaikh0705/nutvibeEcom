const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { createProduct, getProducts, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const auth = require('../middlewares/authMiddleware'); // Make sure this exports a function!



// Create product
router.post('/', auth, upload.single('media'), createProduct);

// Get all products
router.get('/', auth, getAllProducts);

// Get Single products
router.get('/:id', auth, getProducts);

// Update product
router.put('/:id', auth, updateProduct);

// Delete product
router.delete('/:id', auth, deleteProduct);



module.exports = router;
