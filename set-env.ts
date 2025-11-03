     // set-env.ts
     require('dotenv').config();
     const fs = require('fs');
     const path = require('path');

     const targetPath = './src/environments/environment.development.ts';

     // Crear el directorio si no existe (esto evita ENOENT)
     const targetDir = path.dirname(targetPath);
     if (!fs.existsSync(targetDir)) {
       fs.mkdirSync(targetDir, { recursive: true });
     }

     const envConfigFile = `export const environment = {
       production: ${process.env['CONTEXT'] === 'production' ? 'true' : 'false'},
       baseUrl: '${process.env['NG_APP_BASE_URL'] ?? ''}',
       gitHubToken: '${process.env['NG_APP_GITHUB_TOKEN'] ?? ''}'
     };
     `;

     fs.writeFileSync(targetPath, envConfigFile);

