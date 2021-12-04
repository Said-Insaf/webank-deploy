const Compte = require("../models/Compte");
const User = require("../models/User");
const Histo = require("../models/Historique");
const { confirm } = require("../util/mail");
const bcrypt = require("bcrypt");

exports.CreateAccount = async (req, res, next) => {
  try {
    console.log(req.body);
    // jibli les req.body ta3 User eli 7atinehom f schema w req.body eli 9aad ytapi fih l'agent l kol whda f schema (lastName firstName...etc....)
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email should be unique" }] });
    }
    const user = await User.create({ ...req.body });
    const newCompte = await Compte.create({ ...req.body });
    // jibli les req.body ta3 User eli 7atinehom f schema w req.body eli 9aad ytapi fih l'agent l kol whda f schema (lastName firstName...etc....)

    const randomstring = Math.random().toString(36).slice(-8);
    //explicationde sclice : string.slice(start, end)
    await confirm(user, randomstring, res, next);
    const saltRounds = 10;
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

exports.RchercherCmp = async (req, res) => {
  try {
    //  const comptExist = arr[0](function() {console.log(comptexist)})() ena jrbtha pour résoudre l'error de comptexist is not a function

    const comptExist = await Compte.findOne({ RIB: req.body.RIB });
    if (!comptExist) {
      return res.status(400).json({ msg: "compte n existe pas", cpt: null });
    }

    return res.status(200).json({ msg: "compte existe", cpt: comptExist });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "server down" });
  }
};

exports.Depot = async (req, res) => {
  try {
    //  const comptExist = arr[0](function() {console.log(comptexist)})() ena jrbtha pour résoudre l'error de comptexist is not a function

    const comptExist = await Compte.findOne({ RIB: req.body.RIB });
    if (!comptExist) {
      return res.status(400).json({ msg: "compte n existe pas" });
    }

    let newhisto = {};
    newhisto.date = new Date();
    newhisto.soldeInt = comptExist.soldeinitial;
    newhisto.montant = Number(req.body.montant);
    newhisto.compteId = comptExist._id;
    newhisto.operation = "depot";

    comptExist.soldeinitial =
      Number(comptExist.soldeinitial) + Number(req.body.montant);
    // la meme equation que: comptExist.soldeinitial =req.body.montant + soldeintial
    newhisto.soldeFin = comptExist.soldeinitial;
    const histobd = await Histo.create({ ...newhisto });

    comptExist.histos.push(histobd);
    await comptExist.save();
    console.log(comptExist);
    return res
      .status(200)
      .json({ msg: "depot effectué avec succes", data: comptExist });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "Errors" }] });
  }
};

exports.Retrait = async (req, res) => {
  try {
    // hne cherchina el users eli 3amlou signup en ligne w mzelou mssrtlhmch validation : ( populate bch taffichili les details ta3 reference ta3 les usersss l kooool mm si sans validation w data mt3hom )

    const comptExist = await Compte.findOne({ RIB: req.body.RIB });
    if (!comptExist) {
      return res.status(400).json({ msg: "compte n existe pas" });
    }
    if (comptExist.soldeinitial < req.body.montant) {
      return res.status(400).send({ msg: "votre solde est debiteur" });
    }

    let newhisto = {};
    newhisto.date = new Date();
    newhisto.soldeInt = comptExist.soldeinitial;
    newhisto.montant = Number(req.body.montant);
    newhisto.compteId = comptExist._id;
    newhisto.operation = "retrait";

    comptExist.soldeinitial -= req.body.montant;
    // la mm equation que : comptExist.soldeinitial=soldeinitial - req.body.montant

    newhisto.soldeFin = comptExist.soldeinitial;
    const histobd = await Histo.create({ ...newhisto });

    comptExist.histos.push(histobd);

    await comptExist.save();
    return res
      .status(200)
      .json({ msg: "retrait effectué avec succes", data: comptExist });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "server down" });
  }
};

exports.Virements = async (req, res) => {
  console.log(req.body);
  try {
    const comptExist = await Compte.findOne({ RIB: req.body.RIB1 });
    if (!comptExist) {
      return res.status(400).json({ msg: "compte 1 n existe pas" });
    }
    const compt2Exist = await Compte.findOne({ RIB: req.body.RIB2 });
    if (!compt2Exist) {
      return res.status(400).json({ msg: "compte 2 n existe pas" });
    }

    if (comptExist.soldeinitial < req.body.montant) {
      return res.status(400).send({ msg: "votre solde est debiteur" });
    }
    // Debit de compte 1 (b3ath flous) ************************************
    let newhistoCpt1 = {};
    newhistoCpt1.date = new Date();
    newhistoCpt1.soldeInt = comptExist.soldeinitial;
    newhistoCpt1.montant = Number(req.body.montant);
    newhistoCpt1.compteId = comptExist._id;
    newhistoCpt1.operation = "Débit-virement";
    // operation mta3 el tan9ys
    comptExist.soldeinitial -= req.body.montant;

    newhistoCpt1.soldeFin = comptExist.soldeinitial;
    const histoCpt1bd = await Histo.create({ ...newhistoCpt1 });
    comptExist.histos.push(histoCpt1bd);

    // Credit de compte 2 (tsabetlou flous)  **************************************
    let newhistoCpt2 = {};
    newhistoCpt2.date = new Date();
    newhistoCpt2.soldeInt = compt2Exist.soldeinitial;
    newhistoCpt2.montant = Number(req.body.montant);
    newhistoCpt2.compteId = compt2Exist._id;
    newhistoCpt2.operation = "Credit-virement";

    compt2Exist.soldeinitial =
      Number(compt2Exist.soldeinitial) + Number(req.body.montant);

    newhistoCpt2.soldeFin = compt2Exist.soldeinitial;
    const histoCpt2bd = await Histo.create({ ...newhistoCpt2 });
    compt2Exist.histos.push(histoCpt2bd);
    // compt2Exist.soldeinitial += req.body.montant;
    // la mm equation que : comptExist.soldeinitial=soldeinitial - req.body.montant
    await comptExist.save();
    await compt2Exist.save();
    return res.status(200).json({
      msg: "virements effectué avec succes",
      data: { c1: comptExist, c2: compt2Exist, montant: req.body.montant },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "Errors" }] });
  }
};
