import { getUsers, softDeleteUser, updateUser } from "../services/users.services.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getUsers(null);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Users found',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await getUsers(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User found',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

const updateUserRole = async (req, res, next) => {
  try {
    const {newRole} = req.body;
    
    const user = await updateUser({ id: req.params.id, type: "role", value: newRole });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User role updated',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

const updateUserStatus = async (req, res, next) => {
  try {
    const {newStatus} = req.body;
    const user = await updateUser({ id: req.params.id, type: "status", value: newStatus });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User status updated',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await softDeleteUser(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User deleted',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export { getAllUsers, getUserById, updateUserRole, updateUserStatus, deleteUser };