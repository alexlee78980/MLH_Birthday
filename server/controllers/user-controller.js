import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
import HttpError from "../models/http-error.js";
export const Login = async(req, res, next) =>{
    const { email, password } = req.body;   
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser) {
      const error = new HttpError(
        'There is no user with this email, please sign up instead.',
        403
      );
      return next(error);
    }
  
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new HttpError(
        'Could not log you in, please check your credentials and try again.',
        500
      );
      return next(error);
    }
  
    if (!isValidPassword) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
        res.status(201).json({ userId: existingUser.id,
          name:existingUser.name,
           email: existingUser.email,
            birthday: existingUser.birthday,
           });
  };

//   {
//     "name":"a",
//     "email":"a@gmail.com",
//     "password":"1234",
//     "birthday":"dsd"
//   }
  export const SignUp = async(req, res, next) => {
    const { name, email, password, birthday } = req.body
     console.log(password)
     console.log("aaaaa")
     console.log(req.body)
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        console.log(err)
      const error = new HttpError(
        'Could not create user, please try again.',
        500
      );
      return next(error);
    }
  
    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
        birthday
    });
  
    try {
      await createdUser.save();
    } catch (err) {
        console.log(err);
      const error = new HttpError(
        'Signing up failed, please try again later',
        500
      );
      return next(error);
    }
    res.status(201).json({ userId: createdUser.id,
      name:createdUser.name,
       email: createdUser.email,
       birthday: createdUser.birthday,
       });
  };