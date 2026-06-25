import ai from "../config/gemini.config.js";

const analyzeComplaintImage = async ({title,description,category, imageUrl, }) => {
        try {

         const prompt = `
                You are an AI food quality inspection assistant.

                Analyze the hostel food image together with the student's complaint.

                Student Complaint

                Title:
                ${title}

                Description:
                ${description}

                Student Selected Category:
                ${category}

                -------------------------------------------------

                Return ONLY valid JSON.

                Do not return markdown.

                Do not explain anything.

                Use ONLY these categories:

                food-quality
                food-hygiene
                quantity
                timing
                other

                Confidence should be between 0 and 100.

                Severity should be:

                low
                medium
                high
                If no food is detected in the image:

            - predictedCategory must be "other"
            - confidence must be 0
            - severity must be "low"
            - explain that the uploaded image is not related to a food complaint.
                JSON Format:

                {
                    "predictedCategory":"",
                    "confidence":0,
                    "summary":"",
                    "issues":[],
                    "severity":""
                }
                `;
 const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",

        contents: [
            {
            role: "user",

            parts: [
                {
                text: prompt,
                },

                {
                fileData: {
                    fileUri: imageUrl,
                },
                },
            ],
            },
        ],
        });

        const text = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        return JSON.parse(text);
    } 
    catch (error) {
        console.log("Gemini AI Error");

        console.log(error);

        return null;
    }
    };

export default analyzeComplaintImage;
