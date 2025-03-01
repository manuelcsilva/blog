const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: false,
  },
  texto: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: false,
  }
});

const PostsModel = mongoose.model("posts", postsSchema);

module.exports = PostsModel;
