const { postSchema, posts } = require("../models/postModel");
const { post } = require("../routes/postRoutes");

// Controller to create a new blog post
exports.createPost = (req, res) => {
  const validate = postSchema.safeParse(req.body);
  if (!validate.success) {
    return res.status(400).json({ error: validate.error.errors });
  }

  posts.push(validate.data);
  res
    .status(201)
    .json({ message: "Post created successfully", post: validate.data });
};

// Controller to get all blog posts
exports.getPosts = (req, res) => {
  res.json({ posts });
};

// Controller to update a blog by title
exports.updatePost = (req, res) => {
  const { title } = req.params;
  const index = posts.findIndex((post) => post.title === title);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const validation = postSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  posts[index] = validation.data;
  res.json({
    message: "Post updated successfully",
    updatedPost: validation.data,
  });
};

// Controller to delete a blog post by title
exports.deletePost = (req, res) => {
  const { title } = req.params;
  const index = posts.findIndex((post) => post.title === title);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  const deletedPost = posts.splice(index, 1);
  res.json({ message: "Post deleted successfully", post: deletedPost[0] });
};
