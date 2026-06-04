//Routers for Auth Controller logic for Signup and Login:-

//Router for Signup:-
import express from "express";
import { LoginCheck, SignupCheck } from "../controllers/authcontroller.js";
const router = express.Router();


router.post("/auth/signup", SignupCheck);
router.post("/auth/login", LoginCheck);

export default router;