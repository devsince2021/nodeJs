process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');


// IS the file being executed in master mode?
if (cluster.isMaster) {
  // case index.js to be executed again but in child mode
  
  cluster.fork();
  cluster.fork();  
} else {
  const express = require('express');
  const crypto = require('crypto');
  const app = express();


  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 500000, 512, 'sha512', () => {
      res.send('Hi there');
    });
    
  });

  app.get('/fast', (req, res) => {
    res.send('this is fast!!');
  });

  app.listen(3000);
}


