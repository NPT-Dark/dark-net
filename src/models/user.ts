import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    default: null,
  },
  profileImage: {
    type: String,
    default: null,
  },
  backgroundImage: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export type UserType = InferSchemaType<typeof UserSchema> & Document;
