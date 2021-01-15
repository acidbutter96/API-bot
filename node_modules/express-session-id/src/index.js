const merge = require('lodash.merge');
const baseConfig = require('./config');

/**
 * This function return a session id middleware.
 * The session id is placed at req.sessionID
 * @param {object}   options
 * @param {number}   [options.idleTime=(30 * 1000 * 60)] - max idle time before destoying a session. env: SESSION_ID_IDLE_TIME
 * @param {string}   [options.name=s_id] - Name of the cookie. env: SESSION_ID_NAME
 * @param {function} [options.genId=uuid/v4] - function to generate id's. see {@link https://www.npmjs.com/package/uuid|uuid/v4}
 * @param {object}   [options.cookie={}] - config to pass to cookies. see {@link https://www.npmjs.com/package/cookie|cookie}
 */
function sessionId(options = {}) {
  const config = merge({}, baseConfig, options);
  const cookieName = config.name;
  if (typeof config.genId !== 'function') {
    throw new Error('genId must be a function');
  }
  return (req, res, next) => {
    if (typeof req.cookies === 'undefined') {
      return next(Error('cookie parser must be set before sessionId'));
    }
    let sessionCookie = req.cookies[cookieName] || req.signedCookies[cookieName];
    if (!sessionCookie) {
      sessionCookie = config.genId();
    }
    res.cookie(cookieName, sessionCookie, { ...config.cookie, maxAge: config.idleTime });
    req.sessionID = sessionCookie;
    return next();
  };
}

module.exports = sessionId;
