//Blog Controller for create, get, update and delete:-

import { createBlog, DeleteblogbyUserId, getblogbyUserId, UpdateblogbyUserId } from "../models/blogModel.js";


//create controller logic:-
export const createblog = async(req, res) => {
    try {
        const user_id = req.user.id;
        const {title, Blogcontent} = req.body;
        if(!title || !Blogcontent){
            return res.status(400).json({
                success: false, 
                message: "Filled Empty Column"
            })
        }
        const UserBlog = await createBlog(user_id, title, Blogcontent);

        return res.status(200).json({
            success: true,
            message: "You have cretaed your Blog SuccessFully!",
            blog: UserBlog.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error Please Try Again"
        })
    }
}






//get Blog Controller Logic:-
export const getblogbyBlogId = async(req, res) => {
    try {
        const user_id = req.user.id;
        
        const getBlog = await getblogbyUserId(user_id);
        if(getBlog.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Blog Available"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Your All Blogs",
            getBlog: getBlog.rows
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Server Error Fetching Failed Connection"
        })
    }
}






//Update Blog Controller:-
export const UpdateBlogbyBlogId = async(req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;
        const{title, Blogcontent} = req.body;
        
        const UpdateBlog = await UpdateblogbyUserId(id, user_id, title, Blogcontent);
        
        if(UpdateBlog.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Blog Available for Updation"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Update your Blog SuccessFully!",
            UpdateBlog: UpdateBlog.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Server Error For Upadation unsuccessFull"
        })
    }
}







//Delete Blog Controller Logic:-
export const DeleteBlogbyBlogId = async(req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;
        const Deleteblog = await DeleteblogbyUserId(id, user_id);
    
        if(Deleteblog.rowCount === 0){
            return res.status(404).json({
                success: false,
                message: "No Blog Available for Deletion"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Blog Deleted SuccessFully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}