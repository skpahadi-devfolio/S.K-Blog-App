//Creating a databse table for user:-
import { pool } from "../config/db.js";

export const createUser = async(name, email, password) => {
    return await pool.query(
        "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",[name, email, password]
    );
};


//this is for check exitsing user or for not exists:-
export const findbyUser = async(email) => {
    return await pool.query(
        "SELECT * FROM users WHERE email = $1", [email]
    );
};