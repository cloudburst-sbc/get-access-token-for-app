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

```
name: Danger
on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: npm ci
        run: |
          npm ci
      - name: Get App token
        id: get-app-token
        uses: cloudburst-sbc/get-access-token-for-app@main
        with:
          private_key: ${{ secrets.SOME_PRIVATE_KEY }}
          app_id: <SOME_APP_ID>
          installation_id: <SOME_INSTALL_ID>
      - name: Danger
        run: npx danger ci
        env: 
          GITHUB_TOKEN: ${{ steps.get-app-token.outputs.token }}
