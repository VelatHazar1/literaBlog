const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const multer = require("multer");

const Post = require("./models/posts");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite");
  console.log("MONGO CONNECTION OPEN");
}
main().catch((err) => console.log("OH NO MONGO ERROR"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Get all posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find({});
  res.render("posts/index", { posts });
});

// Post a new post
app.post("/posts", upload.single("image"), async (req, res) => {
  const { filename } = req.file;
  const { title, text, author } = req.body;
  const newPost = new Post({
    title,
    text,
    author,

    imagePath: `/uploads/${filename}`,
  });
  await newPost.save();
  res.redirect(`/posts/${newPost._id}`);
});

// Render a form to create a new post
app.get("/posts/new", (req, res) => {
  res.render("POSTS/new");
});

// Get a specific post
app.get("/posts/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("posts/edit", { post });
});

// Render a page to show a specific post
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("posts/show", { post });
});

// Edit a specific post
app.put("/posts/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (req.file) post.imagePath = `/uploads/${req.file.filename}`;
  await post.save();
  res.redirect(`/posts/${post._id}`);
});

// Render a form to delete a specific post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  res.redirect("/posts");
});

app.listen(5000, () => {
  console.log("APP IS LISTENING ON PORT 5000");
});
