const core = require('@actions/core');
const jwt = require('jsonwebtoken');

try {
  const privateKey = core.getInput('private_key');
  const appId = core.getInput('app_id');
  const token = getJwtForApp(appId, privateKey);
  core.setOutput('token', token);
} catch (error) {
  core.setFailed(error.message);
}

/**
 * Signs a JWT for a GitHub App installation that can be used to perform actions on behalf of the app
 * @param {string} appId GitHub App ID of Installed App
 * @param {string} privateKey GitHub App Private Key
 */
function getJwtForApp(appId, privateKey) {
  const epochTime = Math.round(Date.now() / 1000); // Convert from epoch time in milliseconds to seconds
  const payload = {
    // issued at time
    iat: epochTime,
    // JWT expiration time (10 minute maximum)
    exp: epochTime + 10 * 60,
    // GitHub App ID
    iss: appId,
  };
  return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
}

module.exports = getJwtForApp;
