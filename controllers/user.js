const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register } = require("../util/mail");

exports.signup = async (req, res, next) => {
  try {
    //req.body => newUser
    // const { firstName, lastName, email, position, gender, CIN, phone, adresse } =
    //   req.body;
    console.log(req.body);
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email should be unique" }] });
    }
    console.log(foundUser + "je suis là");

    const newUser = await User.create({ ...req.body });
    // envoi mail

    await register(newUser, res, next);
    return res.status(200).send({ msg: "signup sucess", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      errors: [{ msg: "can not save the user" }],
    });
  }
};
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the email exist
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }
    const checkPassword = await bcrypt.compare(password, foundUser.password);

    if (!checkPassword) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).send({ msg: "login success", user: foundUser, token });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ errors: [{ msg: "can not login" }] });
  }
};
exports.consulter = async (req, res) => {
  try {
    // check if the email exist
    const compte = await Compte.findOne({ RIB: req.headers.rib });

    if (!compte) {
      return res.status(200).send({ msg: `Verifier Votre RIB`, compte: null });
    }

    let userNow = req.user;
    if (userNow.compte.indexOf(compte._id) !== -1) {
      res.status(200).send({
        msg: `succes`,
        compte: compte,
      });
    }

    return res.status(200).send({ msg: `Verifier Votre RIB `, compte: null });
    //const user = await User.findOne({ _id: req.params.userId });
    /*if (!user) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }*/
    /*const token = jwt.sign(
      {
        id: compte._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );*/
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ errors: [{ msg: "y'a quelque chose qui cloche" }] });
  }
};


exports.myHisto = async (req, res) => {
  try {
    const compte = await Compte.findOne({ RIB: req.headers.rib }).populate(
      "histos"
    );

    if (!compte) {
      return res.status(400).send({ msg: "verifier votre rib", compte :null });
    }

     let userNow = req.user;
     if (userNow.compte.indexOf(compte._id) !== -1) {
       res.status(200).send({
         msg: `succes`,
         compte: compte,
       });
     }
    return res.status(400).send({ msg: "verifier votre rib", compte :null });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ errors: [{ msg: "y'a quelque chose qui cloche" }] });
  }
};