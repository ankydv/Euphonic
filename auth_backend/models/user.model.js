import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter the first name"],
      minlength: [3, "firstName must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters long"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      user: {
        id: this._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
const User = mongoose.model("user", userSchema);
export default User;
