const env = process.env.NODE_ENV || 'development'; // 'dev' or 'prod'

const development = {
  app: {
    port: 9000
  },
  db: {
    host: process.env.host || 'localhost',
    port: 27017,
    database: process.env.database || 'bill-server',
  }
};

const config = {
  development
};

module.exports = config[env];