//Profile Routes (create, get, update):-

import express from "express";
import { createprofile, getprofilebyuserId, updateprofilebyId } from "../controllers/profilecontroller.js";
import Authmiddleware from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/createprofile", Authmiddleware, createprofile);                   //for created profile
router.get("/getprofile", Authmiddleware, getprofilebyuserId);        //for get profile
router.put("/updateprofile", Authmiddleware, updateprofilebyId);     //for update profile



export default router;