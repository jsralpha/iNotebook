const jwt = require("jsonwebtoken");
const jwtSecret = "Atul@Kumar$Singh";

const fetchuser = (req,res,next)=>{
    // get the user from the jwt token and add id to req object 

    const token = req.header('authtoken');
    // console.log(token);
    if(!token){
        return res.status(401).json({error: "Please authenticate using valid token"})
    }

    try {
        const data = jwt.verify(token,jwtSecret);
        // console.log(data);
        req.user = data.user;
        next();
        
    } catch (error) {
         console.error(error);
         return res.status(401).json({error: "Please authenticate using valid token"})   
    }

}

module.exports = fetchuser;