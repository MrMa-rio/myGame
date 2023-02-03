import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import { Server } from 'socket.io'
const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const game = createGame()

game.subscribe((command) => {
    console.log(`Emitindo ${command.type}`)
    sockets.emit(command.type, command)
})
console.log(game.state)

app.use(express.static('public'))

sockets.on('connection', (socket) => {
    const jogadorID = socket.id
    console.log(`Jogador conectado no servidor com o ID:${jogadorID}`)
    game.addJogador({jogadorID: jogadorID})
    
    socket.emit('estado', game.state)

    socket.on('disconnect', () =>{
        game.removeJogador({jogadorID:jogadorID})
        console.log(`Jogador ID:${jogadorID} desconectado`)
    })
})


server.listen(3000, () => {
    console.log('Servindo na Porta 3000');
}) 