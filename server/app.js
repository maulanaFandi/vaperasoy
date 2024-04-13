if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(errorHandler);

module.exports = app;
