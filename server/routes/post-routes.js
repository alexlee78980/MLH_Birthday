import express from "express";
import { allPost, addPost } from "../controllers/post-controller.js";
import fileUpload from "../middleware/file-upload.js";
const PostRouter = express.Router();

PostRouter.get('/allpost', allPost);

PostRouter.post('/addpost',fileUpload.single('image'), addPost);




export default PostRouter;