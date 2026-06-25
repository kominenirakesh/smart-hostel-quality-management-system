import dotenv from "dotenv";
dotenv.config();
console.log(process.env.GEMINI_API_KEY);
import ai from "./src/config/gemini.config.js";

try {

    const response =
        await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: `
Say exactly this:

Hello Rakesh 👋

Gemini Connection Successful.
`,

        });

    console.log(response.text);

} catch (error) {

    console.dir(error, {
        depth: null,
    });

}