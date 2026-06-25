import fs from "fs";
import path from "path";
import https from "https";
import cloudinary from "../config/cloudinary.config.js";

// WHY THIS AGENT EXISTS:
// Node's global HTTPS agent uses keepAlive: true by default. After the first
// successful Cloudinary upload, the socket is kept alive and returned to the
// pool. On Windows, Cloudinary's server closes that socket from their end
// shortly after. Node doesn't detect the closure immediately and tries to
// reuse the dead socket for the next upload. The request hangs silently for
// 60 seconds, then the SDK fires its internal timeout → 499 TimeoutError.
// Fix: a dedicated agent with keepAlive: false forces a fresh TCP connection
// for every upload, completely avoiding dead-socket reuse.
const cloudinaryAgent = new https.Agent({ keepAlive: false });

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    throw new Error("Local file path is required");
  }

  try {
    // Read file into memory and convert to base64 data URI.
    // This avoids the SDK's fs.createReadStream().pipe() path which stalls
    // on Windows inside Express (post_request.end() is never called explicitly
    // in that path). A data URI is treated as a "remote URL" by the SDK,
    // sent as a plain form field, and post_request.end() IS called explicitly.
    const fileBuffer = fs.readFileSync(localFilePath);

    const ext = path.extname(localFilePath).toLowerCase();
    const mimeMap = {
      ".jpg":  "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png":  "image/png",
      ".webp": "image/webp",
    };
    const mimeType = mimeMap[ext] || "image/jpeg";

    const dataUri = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "smart-hostel-complaints",
      resource_type: "image",
      agent: cloudinaryAgent,   // fresh socket every time, no dead-socket reuse
    });

    return result;

  } finally {
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (err) {
      console.log("File delete error:", err.message);
    }
  }
};

export default uploadOnCloudinary;