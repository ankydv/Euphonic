function registerParticipantsHandlers(io, socket) {
    socket.on('join-room', ({ roomId, user }) => {
      socket.roomId = roomId;
      socket.user = user;
  
      socket.join(roomId);
  
      io.to(roomId).emit('participant-joined', {
        id: socket.id,
        user,
      });
  
      console.log(`User ${user.name} joined room ${roomId}`);
    });
  
    socket.on('leave-room', () => {
      const { roomId, id } = socket;
      socket.leave(roomId);
  
      io.to(roomId).emit('participant-left', id);
      console.log(`User ${id} left room ${roomId}`);
    });
  }
  
  export default registerParticipantsHandlers;
  