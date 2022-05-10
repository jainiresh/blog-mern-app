import UserSchema from '../models/UserSchema';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await UserSchema.find();
  } catch (e) {
    return res.status(500).json({ message: 'Server error cant fetch users' });
  }

  if (!users) {
    return res.status(404).json({ message: 'No users Found !' });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserSchema.findOne({ email });
  } catch (e) {
    return res.status(500).json({ message: ' Server error !' });
  }

  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new UserSchema({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (error) {
    res.status(500).json({ message: 'Server error so failed !' });
  }

  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await UserSchema.findOne({ email });
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: 'User with such email does not exist !' });
  }

  // console.log(existingUser);
  const isPasswordRight = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordRight) {
    return res.status(400).json({ message: 'Could not login!' });
  }

  return res.status(200).json({ message: 'Login Success',
user : existingUser });
};
