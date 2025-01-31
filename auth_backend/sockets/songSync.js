function registerSongSyncHandlers(io, socket) {
    socket.on('start-song', ({ roomId, song, startTime }) => {
      io.to(roomId).emit('song-started', {
        song,
        startTime: startTime || Date.now(),
      });
  
      console.log(`Song started in room ${roomId}: ${song.title}`);
    });
  
    socket.on('pause-song', ({ roomId }) => {
      io.to(roomId).emit('song-paused');
      console.log(`Song paused in room ${roomId}`);
    });
  
    socket.on('resume-song', ({ roomId, resumeTime }) => {
      io.to(roomId).emit('song-resumed', {
        resumeTime: resumeTime || Date.now(),
      });
  
      console.log(`Song resumed in room ${roomId}`);
    });
  
    socket.on('seek-song', ({ roomId, position }) => {
      io.to(roomId).emit('song-seeked', { position });
      console.log(`Song seeked in room ${roomId} to position ${position}`);
    });
  }
  
  export default registerSongSyncHandlers;
  