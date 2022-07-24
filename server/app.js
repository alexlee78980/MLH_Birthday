import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fs from 'fs';
import path from 'path'
import HttpError from "./models/http-error.js";
import UserRouter from "./routes/user-routes.js";
import PostRouter from "./routes/post-routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/user', UserRouter)
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/api/post', PostRouter)
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vl9qc.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`).then(
app.listen(process.env.PORT ||5000, ()=>{ console.log("server starting on port 5000")})).catch(err => {
    console.log(err);
  });