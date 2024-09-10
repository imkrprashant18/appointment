import { userModel } from "../models/user.models.js";
import { doctorModel } from "../models/doctor.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// user resgistration
const registerController = async (req, res) => {
  try {
    // check if user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
    // hash password || encrypted password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    // creating new user
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Registration`,
      error,
    });
  }
};

// user login
const loginController = async (req, res) => {
  try {
    // check the user is exist or not
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(201).send({
        success: false,
        message: "User not found",
      });
    }
    // check if password is correct or not
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(201).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Login`,
      error,
    });
  }
};

// user auth
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error,
    });
  }
};

// applyfor doctor callback

const applyDoctor = async (req, res) => {
  try {
    const newDoctor = await doctorModel({
      ...req.body,
      status: "pending",
    });
    await newDoctor.save();

    // send notification to admin
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for doctor",
    });
  }
};

// get all notifications
const getAllNotification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notifications marked as read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all notifications",
    });
  }
};
// delete all notification
const deleteAllNotification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications deleted successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting all notifications",
    });
  }
};
export {
  registerController,
  loginController,
  authController,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
};
