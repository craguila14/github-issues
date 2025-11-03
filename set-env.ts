// set-env.ts
import 'dotenv/config';
import { writeFileSync } from 'fs';

const targetPath = './src/environments/environment.development.ts';

const envConfigFile =
`export const environment = {
  production: ${process.env['CONTEXT'] === 'production' ? 'true' : 'false'},
  baseUrl: '${process.env['NG_APP_BASE_URL'] ?? ''}',
  gitHubToken: '${process.env['NG_APP_GITHUB_TOKEN'] ?? ''}'
};
`;

writeFileSync(targetPath, envConfigFile);

