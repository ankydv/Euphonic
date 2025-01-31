import { activeRooms } from "./data/voiceRoom.js";

function registerChatHandlers(io, socket) {
    socket.on('send-message', ({ roomId, message }) => {

      const getUser = () => {
        const users = activeRooms.get(roomId);
        if (!users) return null;
        return users.get(socket.id);
      }

      const user = getUser();
      if(!user) return;
      
      io.to(roomId).emit('receive-message', {
        senderId: socket.id,
        user,
        message,
      });
  
      console.log(`Message in room ${roomId} from ${socket.id}: ${message}`);
    });
  }
  
  export default registerChatHandlers;
  