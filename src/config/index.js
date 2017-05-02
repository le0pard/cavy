import buildConfig from './builder';

import loggerScope from './scopes/logger';

const env = process.env.NODE_ENV;
const configLoader = buildConfig(env);

export default {
  env,
  logger: configLoader(loggerScope)
};
