const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { setHeader } = require("./middleware/setHeader");
const articlesSearch = require("./routes/articles");
const authRoutes = require("./routes/auth");

const port = 8000;

mongoose.connect(
  "mongodb+srv://wshek:1234@cluster0.4u3l6.mongodb.net/nwt_search?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/search", articlesSearch);
app.use("/auth", [setHeader], authRoutes);

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
