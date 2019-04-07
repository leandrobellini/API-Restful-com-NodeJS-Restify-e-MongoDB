import {Server} from './server/server'
import {usersRouter} from './users/users.router'

const server = new Server()

server.bootstrap([usersRouter]).then(server => {
    console.log('Sever is listening on: ', server.application.address())
}).catch(error => {
    console.log('Sever failed to start')
    console.error(error)
    process.exit(1)             //termino o programa passando codigo 1
})