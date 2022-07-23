import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p86wf.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`).then(
app.listen(process.env.PORT ||5000, ()=>{ console.log("server starting on port 5000")})).catch(err => {
    console.log(err);
  });