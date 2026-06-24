import Hostel from "../models/hostel.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateJoinCode from "../utils/generateJoinCode.js";
import User from "../models/user.model.js";

const createHostel = async (req, res, next) => {
  try {
    const { hostelName, address, city } = req.body;

    if (!hostelName || !address || !city) {
      return next(
        new ApiError(
          400,
          "All fields are required"
        )
      );
    }

    const joinCode = generateJoinCode(hostelName);

    const hostel = await Hostel.create({
      hostelName,
      address,
      city,
      joinCode,

      ownerId: req.user.id,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        hostel,
        "Hostel created successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};
const joinHostel = async (req, res, next) => {
  try {

    const { joinCode } = req.body;

    if (!joinCode) {
      return next(
        new ApiError(
          400,
          "Join code is required"
        )
      );
    }

    const user = await User.findById(req.user.id);

    if (user.hostelId) {
      return next(
        new ApiError(
          400,
          "Student already joined a hostel"
        )
      );
    }

    const hostel = await Hostel.findOne({
      joinCode
    });

    if (!hostel) {
      return next(
        new ApiError(
          404,
          "Invalid Join Code"
        )
      );
    }

    user.hostelId = hostel._id;

    await user.save();

    hostel.totalStudents += 1;

    await hostel.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        hostel,
        "Joined hostel successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

export {
  createHostel,joinHostel
};