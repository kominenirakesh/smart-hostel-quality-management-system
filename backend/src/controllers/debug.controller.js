import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

const testCloudinary = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("========== DEBUG ==========");
    console.log(req.file);

    // Use the shared utility so debug route tests the exact same
    // code path as the complaint controller
    const result = await uploadOnCloudinary(req.file.path);

    console.log(result);

    return res.json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {

    console.dir(error, { depth: null });

    return res.status(500).json({
      success: false,
      error,
    });

  }

};

export { testCloudinary };