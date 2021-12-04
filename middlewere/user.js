const { check,validationResult } = require("express-validator");

exports.registervalidation = () => [
  check("firstName", "firstName is required").not().isEmpty(),
  check("lastName", "lastName is required").not().isEmpty(),
  check("email", "enter a valid email").isEmail(),
  check("CIN", "CIN is required").not().isEmpty(),
  // check("password", "enter a valid password").isLength({ min: 6 }),
  check("position", "position is required").not().isEmpty(),
];
exports.loginvalidation = () => [
  check("email", "enter a valid email").isEmail(),
  check("email", "enter a valid email").not().isEmpty(),
  check("password", "enter a valid password").isLength({ min: 6 }),
];


exports.validations=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}