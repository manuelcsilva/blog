const express = require("express");
const ejs = require("ejs");
const connectToDatabase = require("./src/database/connect");
const PostsModel = require("./src/models/posts.model");
const bodyParser = require("body-parser");
const sanitizeHtml = require("sanitize-html");

connectToDatabase();

const port = 8080;

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("./src/js"));
app.use(express.static("./src/css"));
app.use(express.static("./src/assets"));
app.use(express.static("./src/assets"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const posts = await PostsModel.find({});

  res.render("index", { posts });
});

app.get("/posts", async (req, res) => {
  const posts = await PostsModel.find({});

  res.render("posts", { posts });
});

app.get("/admin", async (req, res) => {
  const posts = await PostsModel.find({});

  res.render("admin", { posts });
});

app.post("/admin", async (req, res) => {
  try {
    const clean = {
      titulo: sanitizeHtml(req.body.titulo),
      texto: sanitizeHtml(req.body.texto),
      imagem: sanitizeHtml(req.body.imagem),
    };
    console.log(req.body);
    console.log(clean);
    const post = await PostsModel.create(clean);

    res.redirect("./admin");
  } catch (error) {
    console.log(req.body);
    res.status(500).send(error.message);
  }
});

app.get("/view/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostsModel.findById(id);

    res.render("view", { post });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostsModel.findById(id);

    res.render("edit", { post });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostsModel.findByIdAndDelete(id);

    res.redirect("/posts");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => console.log(`Porta: ${port}`));
