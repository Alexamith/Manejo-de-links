const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1/CRM_API");


const cors = require("cors");

app.use(bodyParser.json());

app.use(
  cors({
    domains: "*",
    methods: "*",
  })
);

// routes
app.use(require('./Routes/index.routes'));


app.listen(3002, () => {
  console.log("El servidor está inicializado en el puerto 3002");
});
