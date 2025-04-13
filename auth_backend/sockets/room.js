import { handleSocketError } from "../utils/ErrorHandler.js";

export default function setupRoomSocket(io, socket) {
  socket.on("join-room", joinRoom);
  socket.on("leave-room", leaveRoom);
  socket.on("disconnect", leaveRoom);

  function joinRoom({ roomId }, callback) {
    try {
      if (!roomId) throw new Error("Room ID is required");
      if(socket.currentRoom) throw new Error("User is already in a room");
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      socket.currentRoom = roomId; // Set current room
      const roomParticipants = getRoomParticipants(io, roomId);
  
      // Send acknowledgment response to the client
      if(callback)
        callback({ success: true, roomParticipants });
  
      io.to(roomId).emit("user-joined", { userId: socket.id, roomParticipants });
  
    } catch (error) {
      console.error("Join room error:", error.message);
      handleSocketError(socket, "join-room", error, callback);
    }
  }

  function leaveRoom() {
    try {
      if (!socket.currentRoom) throw new Error("User is not in any room");

      const roomId = socket.currentRoom;
      console.log(typeof roomId, roomId);
      socket.leave(roomId);
      socket.currentRoom = null; // Clear current room

      console.log(`User ${socket.id} left room ${roomId}`);

      io.to(roomId).emit("user-left", {
        userId: socket.id,
        roomParticipants: getRoomParticipants(io, roomId),
      });
    } catch (error) {
      handleSocketError(socket, "leave-room", error);
    }
  }

  function getRoomParticipants(io, roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) return [];

    return Array.from(room).map((socketId) => {
      const participantSocket = io.sockets.sockets.get(socketId);
      return participantSocket ? { id: socketId, ...participantSocket.user } : { id: socketId };
    });
  }
}
