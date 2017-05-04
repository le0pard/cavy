import _assign from 'lodash/assign';

const builder = (environment) => (config) => {
  return _assign(config.default || {}, config[environment]);
};

export default builder;
