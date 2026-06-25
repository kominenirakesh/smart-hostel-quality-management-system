import dotenv from "dotenv";
dotenv.config();

import ai from "./src/config/gemini.config.js";

try {

    const imageUrl =
        "https://res.cloudinary.com/dxjvgc3jx/image/upload/v1782382049/smart-hostel-complaints/akeyfpseywusdaxmgafx.png";
        

    const prompt = `
You are a hostel food quality inspector.

Analyze this image.

Return ONLY valid JSON.

{
  "predictedCategory":"",
  "confidence":0,
  "summary":"",
  "issues":[],
  "severity":""
}
`;

    const response =
        await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: [

                {
                    role: "user",

                    parts: [

                        {
                            text: prompt
                        },

                        {
                            fileData: {
                                mimeType: "image/png",
                                fileUri: imageUrl
                            }
                        }

                    ]

                }

            ]

        });

    console.log(response.text);

}
catch (error) {

    console.dir(error, {
        depth: null
    });

}