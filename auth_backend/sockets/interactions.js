function registerInteractionsHandlers(io, socket) {
    socket.on('send-reaction', ({ roomId, reaction }) => {
      io.to(roomId).emit('receive-reaction', {
        senderId: socket.id,
        user: socket.user,
        reaction,
      });
  
      console.log(`Reaction in room ${roomId}: ${reaction}`);
    });
  }
  
  export default registerInteractionsHandlers;
  