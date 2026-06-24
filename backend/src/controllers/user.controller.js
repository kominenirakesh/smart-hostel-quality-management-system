import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const registerUser = async (req, res, next) => {
try {
const { name, email, password, role } = req.body;


if (!name || !email || !password || !role) {
  return next(new ApiError(400, "All fields are required"));
}

const existingUser = await User.findOne({ email });

if (existingUser) {
  return next(new ApiError(409, "User already exists"));
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
});

const createdUser = await User.findById(user._id).select("-password");

return res.status(201).json(
  new ApiResponse(
    201,
    createdUser,
    "User registered successfully"
  )
);


} catch (error) {
next(error);
}
};

const loginUser = async (req, res, next) => {
try {
const { email, password } = req.body;


if (!email || !password) {
  return next(
    new ApiError(400, "Email and Password are required")
  );
}

const user = await User.findOne({ email });

if (!user) {
  return next(
    new ApiError(404, "User not found")
  );
}

const isPasswordCorrect = await bcrypt.compare(
  password,
  user.password
);

if (!isPasswordCorrect) {
  return next(
    new ApiError(401, "Invalid Credentials")
  );
}

const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

return res.status(200).json(
  new ApiResponse(
    200,
    { token },
    "Login Successful"
  )
);


} catch (error) {
next(error);
}
};

const getProfile = async (req, res, next) => {
try {
return res.status(200).json(
new ApiResponse(
200,
req.user,
"Profile fetched successfully"
)
);
} catch (error) {
next(error);
}
};

export {
registerUser,
loginUser,
getProfile
};
