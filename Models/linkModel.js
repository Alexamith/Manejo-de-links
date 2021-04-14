const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enlace = new Schema({
  codigo: { type: String },
  enlaceCorto: { type: String },
  enlaceLargo: { type: String },
  cantidadIngresos: { type: Number }
});

module.exports = mongoose.model("enlaces", enlace);