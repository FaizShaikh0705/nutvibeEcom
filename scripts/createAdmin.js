const bcrypt = require('bcryptjs');
const sequelize = require('../config/db'); // your DB instance
const Admin = require('../models/admin');  // Sequelize Admin model

const createAdmin = async () => {
    try {
        await sequelize.sync(); // ensures table exists

        const email = 'nutvibe@example.com';
        const plainPassword = 'admin123';
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const admin = await Admin.create({ email, password: hashedPassword });
        console.log('✅ Admin created:', admin.email);
        process.exit();
    } catch (err) {
        console.error('❌ Error creating admin:', err);
        process.exit(1);
    }
};

createAdmin();
