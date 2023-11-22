import dotenv from "dotenv";
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

app.get('/', (_req, res) => {
    const filePath = path.join(process.cwd(), 'index.html');
    res.sendFile(filePath);
});

app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


