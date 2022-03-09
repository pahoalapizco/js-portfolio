const fs = require('fs');

fs.writeFile('./.env', `${API=process.env.API}`, () => {});
