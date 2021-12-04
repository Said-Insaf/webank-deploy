// mongoose
const mongoose = require("mongoose");
//schema
const { Schema, model } = mongoose;
//creation schema
const HistoSchema = new Schema({
  date: { type: Date, required: true },
  soldeInt: { type: Number, required: true },
  soldeFin: { type: Number, required: true },
  montant: { type: Number, required: true },
  compteId: { type: String, required: true },
  operation: { type: String, required: true },
});
//export to the DB model
module.exports = histo = model("histo", HistoSchema);
