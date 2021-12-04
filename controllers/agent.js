const Compte = require("../models/Compte");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const { verif } = require("../util/mail");
exports.UnverifiedUsers = async (req, res) => {
  try {
    // hne cherchina el users eli 3amlou signup en ligne w mzelou mssrtlhmch validation : ( populate bch taffichili les details ta3 reference ta3 les usersss l kooool mm si sans validation w data mt3hom )

    const UnverifiedUsers = await User.find({ role: "user", compte: [] })
      .populate("compte")
      .then((data) => {
        // hen ba3ed ma l9ina el users
        console.log(data);
        return res.status(200).send({ UnverifiedUsers: data });
      });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ errors: [{ msg: "Errors" }] });
  }
};

exports.VerificationUsers = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      return res.status(400).json({ msg: "utilisateur n existe pas" });
    }
    // const RIB = await compte.findOne({ _id: req.params.userId });
    const newCompte = await Compte.create({ ...req.body });
    const randomstring = Math.random().toString(36).slice(-8);
    //explicationde sclice : string.slice(start, end)
    await verif(user, newCompte, randomstring, res, next);
    const saltRounds = 10;
    //hash sur f base d données
    const hashedpassword = await bcrypt.hash(randomstring, saltRounds);
    user.password = hashedpassword;
    user.compte.push(newCompte);
    await user.save();
    console.log(user);
    return res
      .status(200)
      .json({ msg: "compte created successfully", data: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "y'a quelque chose qui cloche" });
  }
};
exports.GetAllAgents = async (req, res) => {
  try {
    const listAgents = await User.find({ role: "agent" });
    if (!listAgents) {
      return res.status(400).send({ msg: "Agent not found" });
    }
    return res.status(200).send({ data: listAgents });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "Errors" }] });
    return;
  }
};
// exports.GetAllAgents = async (req, res) => {
//   try {
//     const listAgents = await User.find({ role: "agent" });
//     res
//       .status(200)
//       .send({ msg: "This is the list of contacts ...", data: listAgents });
//     return;
//   } catch (error) {
//     res.status(400).send({ msg: "Can not get all contacts !!", error });
//     return;
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const table = [];
    const listUsers = await User.find()
      .populate("compte")
      .then((data) => {
        data.forEach((a) => {
          if (a.compte[0] != null) {
            table.push(a);
          }
        });
        // hen ba3ed ma l9ina el users
      });
    console.log(table);
    return res.status(200).send({ listUsers: table });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "Errors" }] });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const usere = await User.findOne({ _id: req.params._id });

    if (!usere) {
      return res.status(400).send({ msg: "user not found" });
    }
    return res.status(200).send({ data: usere });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "Errors" }] });
    return;
  }
};

exports.deleteUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const userToDelete = await User.findOneAndRemove({ _id });
    // console.log(contactToDelete)
    if (!userToDelete) {
      res.status(200).send({ msg: "Contact already deleted ..." });
      return;
    }
    res.status(200).send({ msg: "Contact deleted ...", userToDelete });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Can not delete contact with this id !!", error });
    return;
  }
};

exports.EditUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const userToEdit = await User.updateOne({ _id }, { $set: { ...req.body } });
    console.log(userToEdit);
    if (!userToEdit.nModified) {
      res.status(400).send({
        msg: "Vous n'avez pas modifié les coordonnées du client ",
        userToEdit,
      });
      return;
    }

    res.status(200).send({ msg: "   Edit Success", userToEdit });
    return;
  } catch (error) {
    res.status(400).send({ msg: "  Errors", error });
    return;
  }
};
exports.signupAgent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      CIN,
      position,
    } = req.body;
    const foundAgent = await User.findOne({ email });
    if (foundAgent) {
      return res
        .status(400)
        .send({ errors: [{ msg: " email should be unique" }] });
    }
    const salt = 10;
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      CIN,
      position,
    });
    newUser.password = hashedpassword;
    await newUser.save();

    res
      .status(200)
      .send({ msg: "signup Employee with succefuly", agent: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "cannot register this Employee" }] });
    return;
  }
};
exports.newCompte = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      return res.status(400).json({ msg: "utilisateur n existe pas" });
    }
    // const RIB = await compte.findOne({ _id: req.params.userId });
    const newCompte = await Compte.create({ ...req.body });

    user.compte.push(newCompte);
    await user.save();
    console.log(user);
    return res
      .status(200)
      .json({ msg: "compte created successfully", cptes: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "y'a quelque chose qui cloche là" });
  }
};

exports.csltUser = async (req, res) => {
  try {
    /*  const user = await User.findOne({ CIN: req.body.cin }, function(error, user) {
  if (!user) {
 return res.status(400).send({ msg: "utilisateur n existe pas" })
  }})
      .populate("compte")
      .then((data) => { 
        console.log(data);
        // hen ba3ed ma l9ina el users
       data.comptech((cpt) => {
          if (cpt.RIB === req.body.rib) {
            return res.status(200).send({ msg: "ok", account: cpt });
          }
        });
        // console.log(data.compte);
        return res.status(400).send({ msg: "verifier votre rib" });
      });*/
    //console.log(req.headers);
    const user = await User.findOne({ CIN: req.headers.cin });
    if (!user) {
      return res.status(400).send({ msg: "utilisateur n existe pas" });
    }
    const cpt = await Compte.findOne({ RIB: req.headers.rib });
    if (!cpt) {
      return res.status(400).send({ msg: "verifier votre rib" });
    }

    if (user.compte.indexOf(cpt._id) !== -1) {
      return res.status(200).send({ msg: "ok", compte: cpt });
    }
    return res.status(400).send({ msg: "verifier votre rib" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ errors: [{ msg: "y'a quelque chose qui cloche içi" }] });
  }
};

exports.histoUser = async (req, res) => {
  try {
    const user = await User.findOne({ CIN: req.headers.cin });
    if (!user) {
      return res.status(400).send({ msg: "utilisateur n existe pas" });
    }
    const cpt = await Compte.findOne({ RIB: req.headers.rib }).populate("histos")
      
    if (!cpt) {
      return res.status(400).send({ msg: "verifier votre rib" });
    }

    if (user.compte.indexOf(cpt._id) !== -1) {
      return res.status(200).send({ msg: "ok", compte: cpt });
    }
    return res.status(400).send({ msg: "verifier votre rib" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ errors: [{ msg: "y'a quelque chose qui ne va pas" }] });
  }
};

