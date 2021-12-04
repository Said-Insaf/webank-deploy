// require express
const express = require("express");
const {
  CreateAccount,
  Depot,
  Retrait,
  Virements,
  RchercherCmp,
} = require("../controllers/compte");

// express router
const router = express.Router();


router.post("/add",CreateAccount);
router.post("/find", RchercherCmp);
router.put("/depot",Depot);
router.put("/retrait",Retrait)
router.put("/virements", Virements);


// const isAuth = require("../middlewere/isAuth");
// const { isAgent } = require("../middlewere/Role");
//const {isAdminAgent} =require ("../middlewere/Role")
//const {isStrictAdmin} =require ("../middlewere/Role")
// router.get("/preverified", isAuth, isAdminAgent, UnverifiedUsers);
//router.post("/add",isAuth, isAdminAgent, CreateAccount);
//router.post("/find",isAuth, isAdminAgent, RchercherCmp);
//router.put("/depot",isAuth, isAdminAgent, Depot);
//router.put("/retrait",isAuth, isAdminAgent, Retrait);
//router.put("/virements",isAuth, isAdminAgent, Virements);

//export
module.exports = router;
