// exports.isAdminAgent = async (req, res, next) => {
//   if (req.user.role == admin || req.user.role == agent) {
//     next();
//   } else {
//     res.status(400).json({ msg: "vous n etes pas admin" });
//   }
// };
// exports.isAgent = async (req, res, next) => {
//   if (req.user.role == agent) {
//     next();
//   } else {
//     res.status(400).json({ msg: "vous n etes pas agent" });
//   }
// };
// exports.isStrictAdmin = async (req, res, next) => {
//   if (req.user.role == admin)  {
//     next();
//   } else {
//     res.status(400).json({ msg: "vous n etes pas admin" });
//   }
// };