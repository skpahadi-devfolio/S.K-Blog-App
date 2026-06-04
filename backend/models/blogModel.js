//Blog Model for create, get, update, delete:-

import { pool } from "../config/db.js"

//create:-
export const createBlog = async(user_id, title, Blogcontent) => {
    return await pool.query(
        "INSERT INTO blogs(user_id, title, Blogcontent) VALUES($1, $2, $3) RETURNING *",[user_id, title, Blogcontent]
    )
}


//getblogbyUserId:-
export const getblogbyUserId = async(user_id) => {
    return await pool.query(
        "SELECT * FROM blogs WHERE user_id = $1", [user_id]
    )
    
}


//UpdateblogUserId:-
export const UpdateblogbyUserId = async(id, user_id, title, Blogcontent) => {
    return await pool.query(
        "UPDATE blogs SET title = $1, Blogcontent = $2 WHERE id = $3 AND user_id = $4 RETURNING *", [title, Blogcontent, id, user_id]
    )
    
}




//DeleteblogUserId:-
export const DeleteblogbyUserId = async(id, user_id) => {
    return await pool.query(
        "DELETE FROM blogs WHERE id = $1 AND user_id = $2 RETURNING *", [id, user_id]
    )
}