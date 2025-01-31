import { Server } from "socket.io";
import registerSocketHandlers from './sockets/index.js';
import jwt from "jsonwebtoken";

let io;

function setupSocket(server) {
  console.log('Initializing Socket.IO...')
  io = new Server(server, {
    cors: { origin: '*' },
    methods: ["GET", "POST"], // Allow all origins; update this for production
  });

  const authenticateSocket = (socket, next) => {
    console.log('authenticating socket')
    const jwt_secret = process.env.REFRESH_TOKEN_SECRET;
    const token = socket.handshake.auth?.token || socket.handshake.headers?.token; // Retrieve token sent by the client
    console.log(token)
    if (!token) {
      console.log('token not provided')
      return next(new Error("Authentication error: Token not provided"));
    }
    try {
      const data = jwt.verify(token, jwt_secret);
      socket.userId = data.user.id; // Attach user data to the socket
      next();
    } catch (error) {
      console.log(error)
      if (error.name === "TokenExpiredError") {
        return next(new Error("Authentication error: Token expired"));
      }
      return next(new Error("Authentication error: Invalid token "+error));
    }
  };

  io.use(authenticateSocket);
 
  io.on('connection', (socket) => {
    registerSocketHandlers(io, socket); // Register handlers for each connected socket
    console.log('A client connected:', socket.id);
    console.log(socket.userId)
  });

  io.on("test-event", (data) => {
    console.log("Test event received:", data);
  });
}

const getIO = () => io; // Return the initialized `io` instance

export { setupSocket, getIO };
