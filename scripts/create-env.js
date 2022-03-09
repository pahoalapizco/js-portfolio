const { throws } = require('assert');
const fs = require('fs');

fs.writeFile('./.env', `${API="prueba"}`, () => {});
