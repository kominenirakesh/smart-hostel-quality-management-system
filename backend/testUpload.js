import dotenv from "dotenv";
dotenv.config();

import cloudinary from "./src/config/cloudinary.config.js";

try {

    const result =
        await cloudinary.uploader.upload(
            "./public/temp/test.png",
            {
                folder: "test-folder",
            }
        );

    console.log(result);

} catch (err) {

    console.dir(err, {
        depth:null
    });

}