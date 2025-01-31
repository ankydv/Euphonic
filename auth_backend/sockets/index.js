import registerParticipantsHandlers from './participants.js';
import registerChatHandlers from './chat.js';
import registerInteractionsHandlers from './interactions.js';
import registerSongSyncHandlers from './songSync.js';
import registerVoiceRoomHandlers from './voiceRoom.js';
import registerWebRTCHandlers from './webRTC.js';

function registerSocketHandlers(io, socket) {
  // registerParticipantsHandlers(io, socket);
  registerChatHandlers(io, socket);
  registerInteractionsHandlers(io, socket);
  registerSongSyncHandlers(io, socket);
  registerVoiceRoomHandlers(io, socket);
  registerWebRTCHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log(`User  disconnected: ${socket.id}`);
    io.to(socket.roomId).emit('participant-left', socket.id);
  });

  socket.on('test', () => {
    console.log('test event received');
    io.emit('test', {id: socket.id})
  })
}

export default registerSocketHandlers;