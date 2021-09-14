const express = require("express");

const app = express()

const PORT = process.env.PORT||3030
const server = app.listen(PORT, ()=>{
	console.log("running on port: "+PORT);
})

const io = require('socket.io')(server)

const { v4: uuidv4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'))

// Home
app.get("/", (req, res)=>{
    res.render("home")
})

// Chat room
app.get("/room", (req, res)=>{
    res.redirect(`/room/${uuidv4()}`);
})
app.get("/room/:id", (req, res)=>{
    res.render("room", {roomId: req.params.id})
})


// socket.io
io.on("connection", socket => {
    socket.on("join-room", (roomId, username) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', username);
        socket.on("disconnect", ()=>{
            socket.to(roomId).emit('user-disconnected', username);
        })
        socket.on("send-message", (message, user)=>{
            socket.to(roomId).emit("receive-message", message, user);
        })
    })
})