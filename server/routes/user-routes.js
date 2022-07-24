import express from "express";
import { Login, SignUp } from "../controllers/user-controller.js";
const UserRouter = express.Router();

UserRouter.post('/login', Login);
UserRouter.post('/signup', SignUp);






export default UserRouter;