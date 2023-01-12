const http = require('node:http');

const hostname = '127.0.0.1';
const port = 7676;
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})