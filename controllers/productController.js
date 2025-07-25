const { Product, Variant, Category, Metafield } = require("../models");

exports.createProduct = async (req, res) => {
    try {
        const { title, description, category, variants, categoryInfo } = req.body;

        const media = req.file?.filename || null;

        // 1. Create Product
        const product = await Product.create({
            title,
            description,
            category,
            media
        });

        // 2. Create Variants (if any)
        if (Array.isArray(variants) && variants.length > 0) {
            const formattedVariants = variants.map(v => ({
                ...v,
                ProductId: product.id
            }));
            await Variant.bulkCreate(formattedVariants);
        }

        // 3. Create Category Info
        let categoryEntry = null;
        if (categoryInfo) {
            categoryEntry = await Category.create({
                mainCategory: categoryInfo.mainCategory || '',
                compareAtPrice: parseFloat(categoryInfo.compareAtPrice) || 0,
                weight: parseFloat(categoryInfo.weight) || 0,
                ProductId: product.id
            });

            // 4. Create Custom Metafields (if any)
            if (categoryInfo.customMetafields && typeof categoryInfo.customMetafields === 'object') {
                const metafields = Object.entries(categoryInfo.customMetafields).map(([key, value]) => ({
                    key,
                    value,
                    CategoryId: categoryEntry.id
                }));
                await Metafield.bulkCreate(metafields);
            }
        }

        return res.status(201).json({
            success: true,
            productId: product.id,
            message: "Product created successfully"
        });

    } catch (err) {
        console.error("Error creating product:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Variant },
                {
                    model: Category,
                    include: [Metafield]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching all products:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};


exports.getProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({
            where: { id },
            include: [
                { model: Variant },
                {
                    model: Category,
                    include: [Metafield]
                }
            ]
        });

        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};




exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const media = req.file?.filename;

    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.title = title || product.title;
        product.description = description || product.description;
        product.category = category || product.category;
        if (media) product.media = media;

        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error });
    }
};



exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Delete associated data
        await Variant.destroy({ where: { ProductId: id } });

        const category = await Category.findOne({ where: { ProductId: id } });
        if (category) {
            await Metafield.destroy({ where: { CategoryId: category.id } });
            await Category.destroy({ where: { ProductId: id } });
        }

        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

