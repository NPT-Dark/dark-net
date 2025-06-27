"use server";
import { connectDB } from "~/libs/mongodb";
import { responseError, responseSuccess } from "~/libs/response";
import { compareCode, hashCode } from "~/libs/secret";
import { UserModel } from "~/models/user";
import { SignUpFormData } from "~/schemas/user";

async function createUserAction(user: SignUpFormData) {
  try {
    await connectDB();

    const hashPassword = await hashCode(user.password);

    const userCreate = { ...user, password: hashPassword };
    const rs = await UserModel.create(userCreate);

    if (!rs) return responseError();

    return responseSuccess("Created user successfully");
  } catch (err: unknown) {
    console.log("Create user error:", err);
    return responseError();
  }
}

async function loginUser(user: {
  email?: string;
  password?: string;
  username?: string;
}) {
  try {
    await connectDB();
    const { email, password, username } = user;
    if (!email && !password && !username) return null;
    if (email) {
      const rs = await UserModel.findOne({ email });
      if (!rs) return null;
      return rs;
    }
    if (username && password) {
      const rs = await UserModel.findOne({ username });
      if (!rs) return null;
      const valid = await compareCode(password, rs.password);
      if (!valid) return null;
      return rs;
    }
    return null;
  } catch (err: unknown) {
    console.log("Login error:", err);
    return null;
  }
}

export { createUserAction, loginUser };
