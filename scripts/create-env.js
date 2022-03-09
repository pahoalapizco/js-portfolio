const fs = require('fs');

fs.writeFile('./.env', `${API=process.env.API}`, (err) => {
  if(err){
    console.log("🚀 ~ file: create-env.js ~ line 5 ~ fs.writeFile ~ err", err)
  }
});
