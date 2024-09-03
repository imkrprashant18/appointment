import { userModel } from "../models/user.models.js";
import bcrypt from "bcryptjs";
// user resgistration
const registerController = async (req, res) => {
  try {
    // check if user is already register
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", sucsess: false });
    }
    // password encryption
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    //creating new user
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export { registerController };
