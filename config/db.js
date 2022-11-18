const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        // eslint-disable-next-line no-console
        console.log('Base de datos online');
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    dbConnection,
};
