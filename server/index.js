const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require('socket.io');
const server = createServer(app);



const app = express();
require("dotenv").config();

app.use(cors({
    origin: "chat-app-delta-beige-57.vercel.app",
    methods:["POST","GET"],
    credentials: true,
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log(`Database connected successful`)
}).catch((err) => {
    console.log(err.message)
});
app.get("/", (req, res) => {
   res.json("Chat App") 
});
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoute);

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});




const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
});

const io = socket(server, {
    cors: {
        origin: "chat-app-delta-beige-57.vercel.app",
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
