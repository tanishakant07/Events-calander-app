import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: {type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, "Password is required"] },
    featureFlag: { type: Boolean, default: false },
    googleCalendarToken: { type: String },
  },
  { timestamps: true }
);

// Hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Add method to verify password
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

export const User = mongoose.model("User", UserSchema);