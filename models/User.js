// mongoose
const mongoose = require("mongoose");
//schema
const { Schema, model } = mongoose;
//creation schema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  gender: { type: String, required: true },
  CIN: { type: Number, required: true },
  password: { type: String, required: false },
  phone: { type: Number },
  adresse: { type: String },
  civilité: { type: String, required: false },
  naissance: { type: String, required: false },
  photo: { type: String, required: false },
  photo2: { type: String, required: false },
  ville: { type: String },

  compte: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "compte",
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin", "agent"],
    default: "user",
    required: true,
  },
});
//export to the DB model
module.exports = User = model("user", UserSchema);
