//Middleware for Authentication for Signup and Login:-

import jwt from "jsonwebtoken";

export const Authmiddleware = (req, res, next) => {
    try {
        const Authorization = req.headers.authorization;

        if(!Authorization){
            return res.status(401).json({
                success: false,
                message: "No Token Provided"
            })
        }
        const Token = Authorization.split(" ")[1];

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false, 
            message: "Token is Expired or Invalid"
        })
    }
}

export default Authmiddleware