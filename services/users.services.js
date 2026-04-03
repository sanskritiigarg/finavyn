import User from "../models/user.models.js";

const getUsers = async (id) => {
  let users;

  if (id == null) {
    users = await User.find({ status: "active" });
  } else {
    users = await User.findOne({ status: "active", _id: id });
  }

  return users;
}

const updateUser = async ({ id, type, value }) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { [type]: value },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

const softDeleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.status = "inactive";
  user.deletedAt = new Date();

  await user.save();
  return user;
}

export { getUsers, updateUser, softDeleteUser };