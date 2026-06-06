//Profile Controller Logic:-

import { createProfile, getprofile, updateprofile } from "../models/profileModel.js";

//create profile:-
export const createprofile = async(req, res) => {
    try {
        const user_id = req.user.id;
        const{username, bioDesc, profile_image} = req.body;
        if(!username || !bioDesc || !profile_image){
            return res.status(400).json({
                success: false,
                message: "Please field empty column"
            })
        }
        const newUserProfile = await createProfile(user_id, bioDesc, profile_image, username);

        return res.status(200).json({
            success: true, 
            message: "Your Profile Has Been Created",
            newUserProfile: newUserProfile.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error Your Profile can't Create Right Now"
        })
    }
}













//get profile controller:-
export const getprofilebyuserId = async(req, res) => {
    try {
        const user_id = req.user.id;
        
        const profile = await getprofile(user_id);
        if(profile.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Profile Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Profile Got Success",
            profile: profile.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}












// update profile controller:-
export const updateprofilebyId = async(req, res) => {
    try {
        const  user_id = req.user.id;
        const {username, bioDesc, profile_image} = req.body;

        if(!username || !bioDesc){
            return res.status(400).json({
                success: false,
                message: "Please filled empty field"
            })
        }
        const upadateprofile = await updateprofile(user_id, username, bioDesc, profile_image);

        //checking updatprofile:-
        if(upadateprofile.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "Profile not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Your profile Updated SuccessFully!",
            updateprofile: upadateprofile.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server Error your Profile not be updated"
        })
    }
}