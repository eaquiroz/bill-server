'use strict';

/**
 * Module dependencies.
 */

const express   = require('express');
const router    = express.Router();
const appRouter = require('../api/router');
const path = require('path');

/**
 * Expose
 */

module.exports = app => {

  router.get('/', (req, res, next) => {
    try {
      res.sendFile(path.join(__dirname + '/index.html'));
    } catch (e) {
      logger.error(e, 'err in / path');
      next(e);
    }
  });

  app.use('/api', appRouter);
  app.use('/', router);
};
