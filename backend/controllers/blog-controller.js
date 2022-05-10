import mongoose from 'mongoose';
import BlogSchema from '../models/BlogSchema';
import UserSchema from '../models/UserSchema';

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await BlogSchema.find({}).populate('user');
  } catch (error) {
    console.log(error);
  }

  if (!blogs) {
    return res.status(404).json({ message: 'No Blogs Found' });
  }

  return res.status(200).json({ blogs });
};

// ADDING A NEW BLOG

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;

  try {
    existingUser = await UserSchema.findById(user);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }

  if (!existingUser) {
    return res
      .status(500)
      .json({ message: 'Unable to find the user by the id' });
  }

  const blog = new BlogSchema({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    await session.commitTransaction();
  } catch (e) {
    return res.status(500).json({ message: 'Could not add Blog !' });
  }

  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description } = req.body;
  let blog;
  try {
    blog = await BlogSchema.findByIdAndUpdate(blogId, {
      title,
      description
    });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }

  if (!blog) {
    return res
      .status(404)
      .json({ message: 'Could not find the Blog with the specified Id' });
  }

  return res.status(201).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;

  try {
    blog = await BlogSchema.findById(blogId);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }

  if (!blog) {
    return res
      .status(404)
      .json({ message: 'Could not find the Blog with the specified Id' });
  }

  return res.status(201).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;

  try {
    blog = await BlogSchema.findByIdAndRemove(blogId).populate('user');
    await blog.user.blogs.pull(blog); // push is adding and pull is removing the specified blog
    await blog.user.save(); // never forget to save the things that were changed .
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Could not delete the blog with the ID specified. ' });
  }

  if (!blog) {
    return res
      .status(404)
      .json({ message: 'Could not find the Blog with the specified Id' });
  }

  return res.status(201).json({ message: 'Blog deleted !' });
};

export const getBlogsByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let existingUserBlogs;

  try {
    existingUserBlogs = await UserSchema.findById(userId).populate('blogs');
  } catch (e) {
    return res.status(500).json({ messgae: 'Server error' });
  }

  if (!existingUserBlogs)
    return res.status(404).json({ message: 'Couldnt find such user !' });

  return res.status(201).json({ user: existingUserBlogs });
};
