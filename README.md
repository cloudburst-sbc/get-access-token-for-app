# get-access-token-for-app
Action that can be used to retrieve an access token for an app installation using the app's private key

## Inputs

### `private_key`

**Required**  Private key to use to create the access token

### `app_id`

**Required**  ID of the app to retrieve the access token for

### `installation_id`

**Required**  Installation ID of the app to retrieve the access token for

## Outputs

### `token`

Access token that can be used with the GitHub API to perform actions on behalf of the installed app

## Example usage

