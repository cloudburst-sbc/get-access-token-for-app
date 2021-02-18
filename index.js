const core = require('@actions/core');
const Octokit = require('@octokit/core');
const { createAppAuth } = require("@octokit/auth-app");
const jwt = require('jsonwebtoken');

async function main() {
    try {
      const privateKey = core.getInput('private_key');
      const appId = core.getInput('app_id');
      const installationId = core.getInput('installation_id');
      
      const appOctokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          appId,
          privateKey,
        },
      });
      
      const { token } = await appOctokit.auth({
        installationId,
        type: 'installation',
      });

      core.setOutput('token', token);
    } catch (error) {
      core.setFailed(error.message);
    }
}

main();