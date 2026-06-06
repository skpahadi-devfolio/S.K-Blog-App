//create model for profile (create, get and update):-

import { pool } from "../config/db.js";

//create profile:-
export const createProfile = async(user_id, bioDesc, profile_image, username) => {
    return await pool.query(
        "INSERT INTO profile(user_id, bioDesc, profile_image, username) VALUES($1, $2, $3, $4) RETURNING *", [user_id, bioDesc, profile_image, username]
    );
};


//get profile:-
export const getprofile = async(user_id)=> {
    return await pool.query(
        "SELECT * FROM profile WHERE user_id = $1", [user_id]
    );
};


//Update profile:-
export const updateprofile = async(user_id, username, bioDesc, profile_image) => {
    return await pool.query(
        "UPDATE profile SET username = $1, bioDesc = $2, profile_image = $3 WHERE user_id = $4 RETURNING *",
        [username, bioDesc, profile_image, user_id]
    )
}