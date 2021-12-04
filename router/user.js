//express
const express = require("express");
const { signup } = require("../controllers/user");
const { signin } = require("../controllers/user");
const isAuth = require("../middlewere/isAuth");
const {
  registervalidation,
  loginvalidation,
  validations,
} = require("../middlewere/user");

const { consulter, myHisto } = require("../controllers/user");

const router = express.Router();
// route user (signup signin)

//sign up
router.post("/signup", registervalidation(), validations, signup);

//sign in
router.post("/signin", loginvalidation(), validations, signin);
//current user
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});
//consulter solde
router.get("/consulter", isAuth, consulter);
//consulter Historique
router.get("/myHisto", isAuth, myHisto);
//export
module.exports = router;
