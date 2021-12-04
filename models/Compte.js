//mongoose
const mongoose = require("mongoose");

//schema
const { Schema, model } = mongoose;

//creation schema
const CompteSchema = new Schema({
  soldeinitial: { type: Number, required: true },
  nature: {
    type: String,
    enum: ["courant", "entreprise", "epargne"],
    default: "courant",
    required: true,
  },
  RIB: { type: Number, required: true, unique: true },
  histos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "histo",
    },
  ],
});

// export to the data base model
module.exports = Compte = model("compte", CompteSchema);
