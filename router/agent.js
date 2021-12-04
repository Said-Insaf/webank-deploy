const express = require("express");
const router = express.Router();
const {
  UnverifiedUsers,
  VerificationUsers,
  getAllUsers,
  getOneUser,
  deleteUser,
  EditUser,
  signupAgent,
  GetAllAgents,
  newCompte,
  csltUser,
  histoUser,

} = require("../controllers/agent");
router.put("/ajoutCompte/:_id", VerificationUsers);
router.get("/preverified", UnverifiedUsers);
router.put("/newCompte/:_id", newCompte);
router.get("/accounts", getAllUsers);
router.get("/csltUser", csltUser);
router.get("/histoUser", histoUser);




router.delete("/:_id", deleteUser);
router.put("/:_id", EditUser);
router.get("/allAgents", GetAllAgents);

router.post("/newBankAgent", signupAgent);
router.get("/:_id", getOneUser);

// const isAuth = require("../middlewere/isAuth");
// const { isAgent } = require("../middlewere/Role");
//const {isAdminAgent} =require ("../middlewere/Role")
//const {isStrictAdmin} =require ("../middlewere/Role")
// router.get("/preverified", isAuth, isAdminAgent, UnverifiedUsers);
// router.get("/accounts", isAuth, isAdminAgent, getAllUsers);

// router.get("/getOneUser/:_id", isAuth, isAdminAgent, getOneUser);

// router.put("/ajoutCompte/:_id", isAuth, isAdminAgent, VerificationUsers);
//router.get("/csltUser",isAuth, isAdminAgent, csltUser);
// router.get("/histoUser", isAuth, isAdminAgent, histoUser);

// //router.delete("/:_id",isAuth, isStrictAdmin, deleteUser);
// router.put("/:_id",isAuth, isAdminAgent, EditUser);
// router.get("/allAgents",isAuth, isStrictAdmin, GetAllAgents);

// router.post("/newBankAgent",isAuth, isStrictAdmin, signupAgent);

module.exports = router;
