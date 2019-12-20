const http = require('http');
const handlerServer = require('../app')

const PORT = 8000

const server = http.createServer(handlerServer)


server.listen(PORT)
