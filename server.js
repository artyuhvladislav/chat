const express = require('express')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server,{cors:{origin:"*"}})

app.use(express.json())
const rooms = new Map()

app.get('/rooms', (req, res) => {
    res.json(rooms)
    
})

app.post('/rooms', (req, res) => {
    const { userName, roomID } = req.body

    if(!rooms.has(roomID)) {
        rooms.set(roomID, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }
    res.send()
})

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({ roomID, userName }) => {
        socket.join(roomID)
        rooms.get(roomID).get('users').socket(socket.id, userName)
        const user = rooms.get(roomID).get('users').values()
        socket.to(roomID).broadcast.emit('ROOM:JOINED', users)
    })
    console.log('user connected', socket.id)
})

server.listen(8888, (err) => {
    if(err) {
        throw Error(err)
    }
    console.log('server is running')
})