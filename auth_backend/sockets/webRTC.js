const registerWebRTCHandlers = (io, socket) => {
    console.log('registering webrtc signal server')
  // Handle offer
  socket.on("offer", ({ sdp, roomId }) => {
    console.log(`Received offer from ${socket.id} for room: ${roomId}`);
    socket.to(roomId).emit("offer", { sdp, socketId: socket.id });
  });

  // Handle answer
  socket.on("answer", ({ sdp, roomId }) => {
    console.log(`Received answer from ${socket.id} for room: ${roomId}`);
    socket.to(roomId).emit("answer", { sdp, socketId: socket.id });
  });

  // Handle ICE candidates
  socket.on("ice-candidate", ({ candidate, roomId }) => {
    console.log(`Received ICE candidate from ${socket.id} for room: ${roomId}`);
    socket.to(roomId).emit("ice-candidate", { candidate, socketId: socket.id });
  });
};

export default registerWebRTCHandlers;
