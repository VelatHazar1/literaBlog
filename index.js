const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Post = require("./models/posts");
const { log } = require("console");

mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite");

main().catch((err) => console.log("OH NO MONGO ERROR"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite");

  console.log("MONGO CONNECTION OPEN");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/posts", async (req, res) => {
  const posts = await Post.find({});
  res.render("POSTS/index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("POSTS/new");
});

app.post("/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.redirect(`/posts/${newPost._id}`);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  // TODO: it is uppercase !! why?
  res.render("POSTS/show", { post });
});

app.get("/posts/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("posts/edit", { post });
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/posts/${post._id}`);
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  res.redirect("/posts");
});

app.listen(5000, () => {
  console.log("APP IS LISTENING ON PORT 5000");
});
