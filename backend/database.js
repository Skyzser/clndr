const mongoose = require('mongoose');

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Server connected to database: ${conn.connection.name}`);
     } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = db;