'use strict';

/**
 * Module dependencies.
 */

const mongoose    = require('@lib/mongoose').connect();
const http        = require('http');
const port        = process.env.PORT || 9000;


module.exports = app => {
    mongoose.connection.on('connected', listen);
    mongoose.connection.on('error', dbError).on('disconnected', mongoose.connect);

    function listen() {
        app.set('port', port);
        const server = http.createServer(app);
        server.listen(port);
        console.log('Express app started on port ' + port);
        logger.info('Express app started on port ' + port);
    }

    function dbError(err) {
        logger.error('Mongo connection error:', err);
    }
};
