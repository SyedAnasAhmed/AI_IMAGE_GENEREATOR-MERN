import express, { response } from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const openAI = new OpenAIApi(configuration)

router.route("/").get((request, response) => {
  response.send("Hello from DALL-E!");
});

router.route("/").post(async (request, response) => {
  try {
    const { prompt } = request.body;

    const airesponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      // responseformat: "b64_json",
    });

    const image = airesponse.data[0].b64_json;

    response.status(200).json({ photo: image})

  } catch (error) {
    console.log(error)
    response.status(500).send(error.message)
  }
});

export default router;
