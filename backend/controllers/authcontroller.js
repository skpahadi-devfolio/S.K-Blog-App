//Auth Controller Logic For Signup and Login:-

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findbyUser } from "../models/userModel.js";


//Signup Controller Logic:-
export const SignupCheck = async(req, res) => {
    try {
        const{name, email, password, confirmpassword} = req.body;
        if(!name || !email || !password || !confirmpassword){
            return res.status(400).json({
                success: false,
                message: "Please Field Empty Field"
            })
        }

        //Exist User:-
        const existUser = await findbyUser(email);

        //CHECK EXITS USER COINDTION:-
        if(existUser.rows.length>0){
            return res.status(400).json({
                success: false, 
                message: "User ALready Exists"
            })
        }

        //confirm USER password:-
            if(password !== confirmpassword){
                return res.status(400).json({
                    success: false,
                    message: "Password Doesn't Match Please Re Enter your Password"
                })
            }

        //hashing password:-
        const hashpassword = await bcrypt.hash(password, 10);
        
        const newUser = await createUser(name, email, hashpassword)

        return res.status(201).json({
            success: true,
            message: "You are Signup SuccessFully!",
            user: newUser.rows[0],
            // token: Token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Connection Failed You can't Login Right Now"
        })
    }
}













//Logic controller Logic:-
export const LoginCheck = async(req, res) => {
    try {
        const{email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please Field empty Column"
            })
        }

        //user not exist:-
        const newUserexist = await findbyUser(email);

        //condition:-
        if(newUserexist.rows.length === 0){
            return res.status(400).json({
                success: false,
                message: "User not Found"
            })
        }

        //password check:-
        const user = newUserexist.rows[0];

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }


        //Add Token for Login:-
        const Token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: "15h"}
        )

        //Login successfully:-
        return res.status(200).json({
            success: true, 
            message: "You are Login SuccessFully!",
            token: Token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error you Can't Login Right Now"
        })
    }
}