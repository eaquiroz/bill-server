'use strict';

const mongoose = require('mongoose');
const dbConfig = require('../../config/db');

module.exports = {
    connect: () => {
        try {
            const {
                db: {host, port, database}
            } = dbConfig;
            const connectionString = `mongodb://${host}:${port}/${database}`;
            const options = {keepAlive: 1, useNewUrlParser: true};
            const uri = process.env.MONGODB_URL || connectionString;
            mongoose.connect(uri, options).catch(err => {
                logger.error(err, ' Mongo Connection Error:', err);
            });
            return mongoose;
        } catch (e) {
            return logger.error(' Mongo Connection Error:', e);
        }
    }
};
