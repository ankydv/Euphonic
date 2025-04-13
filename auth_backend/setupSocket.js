import { Server } from "socket.io";
import setupRoomSocket from "./sockets/room.js";
import setupChatSocket from "./sockets/chat.js";
import { getGoogleUserInfo } from "./controllers/auth.controller.js"

export default function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust based on your frontend URL
      methods: ["GET", "POST"]
    }
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token || socket.handshake.headers?.authorization?.split("Bearer ")[1] || socket.handshake.headers.token;

    if (!token) {
    console.log('no token');
      return next(new Error("Authentication error: No token provided"));
    }
    try {
      const userInfo = await getGoogleUserInfo(token);
      socket.user = userInfo;
      next();
    } catch (error) {
        console.log('error', error);
      return next(new Error("Authentication error: " + error.message));
    }
  });

  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    setupRoomSocket(io, socket);
    setupChatSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
