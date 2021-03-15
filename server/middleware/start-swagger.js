const swaggerUi         = require('swagger-ui-express');
const swaggerDocument   = require('./swagger.json');

module.exports = (app) => {
    app.use((req, res, next) => {
        let hostname = req.headers.host;
        if (process.env.NODE_ENV === 'production') {
            swaggerDocument.host = hostname ;
        }else {
            swaggerDocument.host = "localhost:" + 9000;
        }
        next();
    });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};