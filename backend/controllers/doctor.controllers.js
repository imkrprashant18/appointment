import { doctorModel } from "../models/doctor.models.js";
import { userModel } from "../models/user.models.js";

// get doctor information
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching doctor details",
      error,
    });
  }
};

// // update doctor profile
// const updateDoctorProfile = async () => {
//   try {
//     const doctor = await doctorModel.findOneAndUpdate(
//       { userId: req.body.userId },
//       req.body
//     );
//     res.status(201).send({
//       success: true,
//       message: "Doctor profile updated successfully",
//       data: doctor,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in updating doctor profile",
//       error,
//     });
//   }
// };

// getDoctorById
const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching doctor details",
      error,
    });
  }
};

export { getDoctorInfoController, getDoctorById };
