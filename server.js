import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import { Server } from 'socket.io'
const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const game = createGame()

game.addJogador({jogadorID: 'jogador1', positionX: 2, positionY: 4})
game.addJogador({jogadorID: 'jogador2', positionX: 6, positionY: 4})
game.addFruta({frutaID: 'frutinha1', positionX: 7, positionY: 4})
console.log(game.state)

app.use(express.static('public'))

sockets.on('connection', (socket) => {
    const jogadorID = socket.id
    console.log(`Jogador conectado no servidor com o ID:${jogadorID}`)
})
server.listen(3000, () => {
    console.log('Servindo na Porta 3000')
}) 