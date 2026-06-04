//create model for profile (create, get and update):-

import { pool } from "../config/db.js";

//create profile:-
export const createProfile = async(user_id, bioDesc, username) => {
    return await pool.query(
        "INSERT INTO profile(user_id, bioDesc, username) VALUES($1, $2, $3) RETURNING *", [user_id, bioDesc, username]
    );
};


//get profile:-
export const getprofile = async(user_id)=> {
    return await pool.query(
        "SELECT * FROM profile WHERE user_id = $1", [user_id]
    );
};


//Update profile:-
export const updateprofile = async(user_id, username, bioDesc) => {
    return await pool.query(
        "UPDATE profile SET username = $1, bioDesc = $2 WHERE user_id = $3 RETURNING *",
        [username, bioDesc, user_id]
    )
}