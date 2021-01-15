const uuidv4 = require('uuid/v4');

module.exports = {
  idleTime: process.env.SESSION_ID_IDLE_TIME || 30 * 1000 * 60,
  name: process.env.SESSION_ID_NAME || 's_id',
  genId: uuidv4,
  // cookie options.
  cookie: {},
};
