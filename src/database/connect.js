const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose
    .connect(
      `mongodb://localhost:27017/`
    )
    .then(console.log("Conexão efetuada com sucesso!"))
    .catch((error) => {
      console.log("Ocorreu um erro ao realizar a conexão! Erro: ", error);
    });
};

module.exports = connectToDatabase;
