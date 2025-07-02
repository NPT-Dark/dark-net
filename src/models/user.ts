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
  },
  password: {
    type: String,
    default: null,
  },
  email: {
    type: String,
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

UserSchema.index(
  { username: 1 },
  {
    unique: true,
    partialFilterExpression: { username: { $exists: true, $type: "string" } },
  }
);
UserSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $type: "string" } },
  }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);

export type UserType = InferSchemaType<typeof UserSchema> & Document;
