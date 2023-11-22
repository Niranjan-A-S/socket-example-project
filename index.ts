import dotenv from "dotenv";
import cors from 'cors'
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.NODE_PORT || 3000;

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

app.use(cors());

app.get('/', (_req, res) => {
    const filePath = path.join(process.cwd(), 'index.html');
    res.sendFile(filePath);
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


