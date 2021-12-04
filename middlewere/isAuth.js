const jwt=require("jsonwebtoken")
const user=require("../models/User")
const isAuth =async(req,res,next)=> {

    try {
        
    const token=req.headers["authorization"]
    if(!token) {
        return res.status(401).send({errors:[{msg:"not authorized"}]})
    }

var decoded = jwt.verify(token, process.env.SECRET_KEY);//{id}
const foundUser=await User.findOne({_id:decoded.id})
if(!foundUser){
    return res.status(401).send({ errors: [{ msg: "not authorized" }] });
}
req.user=foundUser
next()
}catch (error) {
  return res.status(401).send({ errors: [{ msg: "not authorized" }] });      
    }
}
module.exports = isAuth

