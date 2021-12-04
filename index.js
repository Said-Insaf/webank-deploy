console.clear();
// require express
const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
// cross deploiment
var cors = require("cors");
// const AgentRoutes = require('./router/agent');
//cross
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
// instance app
const app = express();
// connect
connectDB();
//corss
app.use(cors(corsOptions));
console.log("server ykhdem")
//routing

//middlewere golobal
app.use(express.json());
//middlewere route
app.use("/api/user", require("./router/user"));
app.use("/api/compte", require("./router/compte"));
// app.use("/api/admin", require("./router/admin"));
app.use("/api/agent", require("./router/agent"));
//cross
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// port et var d'environnement
const PORT = process.env.PORT;
//create server
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is running on ${PORT}`)
);
