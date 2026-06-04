//Blog Routes for create, get, update and delete:-

import express from "express";
import { createblog, DeleteBlogbyBlogId, getblogbyBlogId, UpdateBlogbyBlogId } from "../controllers/blogcontroller.js";
import Authmiddleware from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/createBlog", Authmiddleware, createblog);                    //Route for creating blog
router.get("/yourblogs", Authmiddleware, getblogbyBlogId);                 //Route for Get all blog of user
router.put("/updateblog/:id", Authmiddleware, UpdateBlogbyBlogId);         //Route for update blog by blog id
router.delete("/deleteblog/:id", Authmiddleware, DeleteBlogbyBlogId);      //Route for delete blog by blog id



export default router;