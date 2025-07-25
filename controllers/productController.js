const { Product, Variant, Category, Metafield } = require("../models");

exports.createProduct = async (req, res) => {
    try {
        const { title, description, category, variants, categoryInfo } = req.body;
        const media = req.file?.filename;

        const product = await Product.create({ title, description, media, category });

        const parsedVariants = variants.map(v => ({ ...v, ProductId: product.id }));
        await Variant.bulkCreate(parsedVariants);

        const parsedCategoryInfo = categoryInfo;
        const categoryEntry = await Category.create({
            ...parsedCategoryInfo,
            compareAtPrice: parsedCategoryInfo.compareAtPrice || 0,
            weight: parsedCategoryInfo.weight || 0,
            ProductId: product.id
        });

        let metafields = [];

        if (categoryInfo?.customMetafields) {
            metafields = Object.entries(categoryInfo.customMetafields).map(([key, value]) => ({
                key,
                value,
                CategoryId: categoryEntry.id,
            }));

            await Metafield.bulkCreate(metafields);
        }


        await Metafield.bulkCreate(metafields);

        res.status(201).json({ success: true, product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [Variant, { model: Category, include: [Metafield] }],
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.getProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({
            where: { id },
            include: [
                { model: Variant, as: 'variants' },
                { model: Category, as: 'category' }
            ]
        });

        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch (err) {
        console.error('Error getting product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.title = title || product.title;
        product.description = description || product.description;
        product.category = category || product.category;

        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product', error });
    }
};


exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete associated variants, category and metafields (optional, if cascade not working)
        await Variant.destroy({ where: { ProductId: id } });
        const category = await Category.findOne({ where: { ProductId: id } });
        if (category) {
            await Metafield.destroy({ where: { CategoryId: category.id } });
            await Category.destroy({ where: { ProductId: id } });
        }

        // Delete the product
        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
