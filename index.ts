import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.NODE_PORT;

const app = express();

const server = createServer(app);
const io = new Server(server);

app.get('/', (_req, res) => {
    const filePath = path.join(process.cwd(), 'index.html');
    res.sendFile(filePath);
});

app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


