export default function setupChatSocket(io, socket) {
    socket.on("send-message", ({ roomId, message }) => {
      console.log(`Message in room ${roomId}: ${message}`);
      io.to(roomId).emit("receive-message", { userName: socket.user.name, message });
    });
  }
