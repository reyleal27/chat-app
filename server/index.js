const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require('socket.io');


const app = express();
require("dotenv").config();
// const { MONGO_URL} = process.env;

app.use(cors());
app.use(express.json());


// mongoose.connect(MONGO_URL).then(() => {
//     console.log(`Database connected successful`);
// }).catch((err) => {
//     console.log(err.message)
// });

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoute);

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});




const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    });
    
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message)
            console.log("message delivered to",sendUserSocket )
        } else {
            console.log("user not online", data.to)
        }
    })
});
