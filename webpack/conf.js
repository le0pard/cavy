const currentEnv = process.env.NODE_ENV;

module.exports = {
  devServerHost: 'localhost',
  devServerPort: 8888,
  currentEnv: currentEnv,
  isProduction: currentEnv === 'production'
};
