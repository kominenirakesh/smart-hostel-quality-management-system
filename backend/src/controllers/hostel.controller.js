import Hostel from "../models/hostel.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateJoinCode from "../utils/generateJoinCode.js";

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

export {
  createHostel
};