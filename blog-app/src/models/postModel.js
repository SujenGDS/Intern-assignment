const { z } = require("zod");

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
});

let posts = [];

module.exports = { postSchema, posts };
