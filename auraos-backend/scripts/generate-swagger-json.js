// scripts/generate-swagger-json.js
import fs from 'fs';
import { swaggerSpec } from '../src/config/swagger.js';

// Create the docs directory if it doesn't exist
const docsDir = './docs';
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
}

// Write the Swagger spec to a file
fs.writeFileSync(
    './docs/swagger.json',
    JSON.stringify(swaggerSpec, null, 2)
);

console.log('✅ OpenAPI documentation generated successfully!');
