var socket = io()

const startChat = () => {
    socket.emit("join-room", ROOM_ID, username)
    displayMessage(`You have joined the room!`, "room")
    socket.on("user-connected", other_username => {
        displayMessage(`${other_username} has joined`, "room")
    })
    socket.on("user-disconnected", other_username => {
        displayMessage(`${other_username} has left`, "room")
    })

    socket.on("receive-message", (message, other_username) => {
        displayMessage(message, other_username)
    })
}

const sendMessage = (message) => {
    socket.emit("send-message", message, username);
}