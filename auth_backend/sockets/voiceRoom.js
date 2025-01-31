import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import { activeRooms, userRoomMap } from "./data/voiceRoom.js";

// Function to handle joining a room
const handleJoinRoom = async (io, socket, roomId, ack) => {
  try {
    console.log(activeRooms);
    console.log(userRoomMap)
    // Get userId from the authenticated socket
    const userId = socket.userId;

    // Fetch the userName from the database
    const user = await User.findById(userId);
    if (!user) {
      socket.emit("error", { message: "User not found." });
      return;
    }
    const userName = user.firstName; // Adjust the property name based on your User model

    // Check if the room exists in the database
    const room = await Room.findOne({ roomId });
    if (!room) {
      socket.emit("error", { message: "Room does not exist." });
      return;
    }

    // Check if the user is already in another room
    if (userRoomMap.has(userId)) {
      socket.emit("error", { message: `User is already in a room` });
      return;
    }

    // Initialize the room in activeRooms if not already present
    if (!activeRooms.has(roomId)) {
      activeRooms.set(roomId, new Map());
    }

    const roomParticipants = activeRooms.get(roomId);

    // Add the user to the room
    roomParticipants.set(socket.id, { userId, userName, picture: user.picture });
    userRoomMap.set(userId, roomId); // Track the user's current room
    console.log(roomParticipants)
    // Join the Socket.IO room
    socket.join(roomId);

    // Notify all participants about the new user
    const participantsArray = Array.from(roomParticipants.values()); // Convert Map to array
    io.to(roomId).emit("user-joined", { userId, roomId, roomParticipants: participantsArray });
    ack({success: true, roomParticipants: participantsArray });

    console.log(`User ${userId} (${userName}) joined room ${roomId}`);
  } catch (error) {
    console.error("Error in handleJoinRoom:", error);
    socket.emit("error", { message: "Failed to join room." });
  }
};

// Function to handle leaving a room
const handleLeaveRoom = (io, socket) => {
  try {
    // Find the room the user is in
    const userRoomEntry = [...activeRooms.entries()].find(([_, participants]) =>
      participants.has(socket.id)
    );

    if (!userRoomEntry) {
      return; // User is not in any room
    }

    const [roomId, roomParticipants] = userRoomEntry;

    // Remove the user from roomParticipants
    const user = roomParticipants.get(socket.id);
    roomParticipants.delete(socket.id);
    userRoomMap.delete(user.userId); // Remove from userRoomMap

    // Notify other participants about the user leaving
    const participantsArray = Array.from(roomParticipants.values());
    io.to(roomId).emit("user-left", { userId: user.userId, roomId, roomParticipants: participantsArray });

    console.log(`User ${user.userId} left room ${roomId}`);

    // If the room is empty, delete it from activeRooms
    if (roomParticipants.size === 0) {
      activeRooms.delete(roomId);
    }

    socket.leave(roomId);
  } catch (error) {
    console.error("Error in handleLeaveRoom:", error);
  }
};


function registerVoiceRoomHandlers(io, socket) {
  socket.on("create-room", async (roomData) => {
    try {
      roomData.host = socket.userId;
      const room = await Room.create(roomData); 
      socket.emit("room-created", {
        roomId: room.roomId,
        roomName: room.roomName,
      });
    } catch (error) {
      console.error(error);
      socket.emit("error", { message: "Failed to create room." });
    }
  });

  socket.on("join-room", ({ roomId }, ack) => {
    handleJoinRoom(io, socket, roomId, ack);
  });

  socket.on("leave-room", ({ roomId }) => {
    handleLeaveRoom(io, socket, roomId);
  });

  socket.on("toggle-microphone", ({ roomId, isMuted }) => {
    io.to(roomId).emit("microphone-toggled", {
      participantId: socket.id,
      isMuted,
    });

    console.log(
      `User ${socket.id} ${
        isMuted ? "muted" : "unmuted"
      } their mic in room ${roomId}`
    );
  });

  socket.on("send-voice-data", ({ roomId, audioData }) => {
    socket.to(roomId).emit("receive-voice-data", {
      senderId: socket.id,
      audioData,
    });
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    activeRooms.forEach((participants, roomId) => {
      if (participants.has(socket.id)) {
        handleLeaveRoom(io, socket, roomId);
      }
    });
  });
}

export default registerVoiceRoomHandlers;
