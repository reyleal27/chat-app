const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require('socket.io');

const http = require('http');


const app = express();
require("dotenv").config();

app.use(cors({
    origin: "https://chat-be5pqblt9-rey-vincent-leals-projects.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
}));
app.options('*', cors());

app.use(express.json());


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log(`Database connected successful`)
}).catch((err) => {
    console.log(err.message)
});

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoute);

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});


const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
});

const io = socket(server, {
    cors: {
        origin: "https://chat-be5pqblt9-rey-vincent-leals-projects.vercel.app",
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
            console.log("message delivered to", sendUserSocket)
        } else {
            console.log("user not online", data.to)
        }
    });
    socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
