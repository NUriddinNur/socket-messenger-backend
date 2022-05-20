import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const httpServer = http.createServer(app)


const io = new Server(httpServer, {
  cors: {
      origin: "*",
      credentials: true
  }
})



io.on('connection', (socket) => {
    console.log('a user connected')
    	
    const time = new Date().toLocaleString();

    socket.on('new message', ({activUsername: username , value}) => {
      io.emit("message", { username, value,  time})
    })
})

httpServer.listen(3000, () => {
  console.log('listening on *: 3000')
})