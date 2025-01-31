import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the Room Schema
const RoomSchema = new Schema(
  {
    roomId: {
      type: Number,
      unique: true,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
      trim: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'user', // Reference to the user model
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
  }
);

// Auto-generate unique numeric room ID
RoomSchema.pre('validate', async function (next) {
  if (!this.roomId) {
    const Room = mongoose.model('Room', RoomSchema);
    const lastRoom = await Room.findOne().sort({ roomId: -1 });
    this.roomId = lastRoom ? lastRoom.roomId + 1 : 1001; // Start from 1001
  }
  next();
});

// Create Room model
const Room = model('Room', RoomSchema);

export default Room;
