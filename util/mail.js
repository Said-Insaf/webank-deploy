var nodemailer = require("nodemailer");
// var smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.Mail,
    pass: process.env.Pass,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

exports.verif = async (user, compte, password, res, next) => {
  const sendmail = {
    from: process.env.Mail,
    to: `${user.email}`,
    subject: "Sending Email using Node.js[nodemailer]",
    text: `Cher client,
Bienvenue dans votre banque Webank.
Nous sommes heureux de vous compter parmi nos clients et nous vous remercions vivement de votre confiance.
Votre compte a bien été créé et vous pouvez accéder à votre compte par le RIB suivant  ${compte.RIB} et votre Password est le suivant ${password} Vous pourrez ainsi gérer tous vos comptes à distance.
Cordialement.
`,
  };
  transporter.sendMail(sendmail, (error) => {
    if (error) {
      res.status(400).send ({msg : "mail non envoyé"});
    } else {
      next()
  };
})};

exports.confirm = async (user, password, res, next) => {
  const sendmail = {
    from: process.env.Mail,
    to: `${user.email}`,
    subject: "Sending Email using Node.js[nodemailer]",
    text: `Cher client,
Bienvenue dans votre banque Webank.
Nous sommes heureux de vous compter parmi nos clients et nous vous remercions vivement de votre confiance.
Votre compte a bien été créé et vous pouvez accéder à votre compte le Password suivant
 ${password} Vous pourrez ainsi gérer tous vos comptes à distance.
Cordialement.`,
  };
  transporter.sendMail(sendmail, (error) => {
    if (error) {
     return res.status(400).send ({msg : "mail non envoyé"});
    } else {
      next()
  };
})};
exports.register = async (user,res, next) => {
  const sendmail = {
    from: process.env.Mail,
    to: `${user.email}`,
    subject: "Sending Email using Node.js[nodemailer]",
    text: `Cher client,
Bienvenue dans votre banque Webank.
Nous serions heureux de vous compter parmi nos clients et nous vous remercions vivement de votre confiance.
Votre profile a bien été créé et vous devez déplacez à votre banque le plus proche de vous pour continuer les procédures afin d’ouvrir votre compte.
Cordialement.
`,
  };
  transporter.sendMail(sendmail, (error) => {
    if (error) {
      return res.status(400).send({ msg: "mail non envoyé" });
    } else {
      next();
    }
  });
};
