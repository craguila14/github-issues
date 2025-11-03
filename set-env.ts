// set-env.ts
require('dotenv').config();
const fs = require('fs');

const targetPath = './src/environments/environment.develpment.ts';

const envConfigFile =
`export const environment = {
  production: ${process.env['CONTEXT'] === 'production' ? 'true' : 'false'},
  baseUrl: '${process.env['NG_APP_BASE_URL'] ?? ''}',
  gitHubToken: '${process.env['NG_APP_GITHUB_TOKEN'] ?? ''}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);

