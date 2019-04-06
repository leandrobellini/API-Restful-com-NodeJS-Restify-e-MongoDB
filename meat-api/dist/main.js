"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const server = new server_1.Server();
server.bootstrap().then(server => {
    console.log('Sever is listening on: ', server.application.address());
}).catch(error => {
    console.log('Sever failed to start');
    console.error(error);
    process.exit(1); //termino o programa passando codigo 1
});
