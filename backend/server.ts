import http from "http";
import { WebSocketServer } from "ws";
import { attachWebSocketHandlers } from "./ws/wsHandler";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    res.writeHead(200);
    res.end("WebSocket server running");

});

const wss = new WebSocketServer({
    noServer: true
});

attachWebSocketHandlers(wss);

server.on("upgrade", (req, socket, head) => {

    const url = new URL(
        req.url!,
        `http://${req.headers.host}`
    );

    if (url.pathname === "/ws") {

        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });

    } else {

        socket.destroy();

    }

});

server.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 WebSocket server running on ${PORT}`);
});