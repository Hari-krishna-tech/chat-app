const express = require("express");
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());



const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})


io.on("connection", (socket) => {
    console.log(`User Connect   ${socket.id}`);
    socket.on("join_room", (data)  => {
        socket.join(data);
        console.log(`User with Id: ${socket.id} joined room: ${data}`);
        
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log("data sent")
        
    })
    socket.on("disconnect", ()=> {
        console.log("user  Disconnected", socket.id);
    })
})

server.listen(3001, ()=> {
    console.log("Server running On " + 3001);
})
