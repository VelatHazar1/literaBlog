const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;
