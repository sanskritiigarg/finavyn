import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../services/auth.services.js';

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = await registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: 'Please provide email and password',
      });
    }

    const data = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await getUserProfile(req.user._id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User found',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};


export { register, login, getProfile };