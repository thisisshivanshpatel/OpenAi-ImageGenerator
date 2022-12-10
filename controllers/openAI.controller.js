const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/** controller used for generating image through openAI DALL-E */
const generateImage = async (req, res) => {
  try {
    const { prompt, size } = req.body;

    if (prompt && size) {
      const imageSize =
        size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024";

      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: imageSize,
      });

      const imageUrl = response.data.data[0].url;

      res.status(200).json({ success: true, data: imageUrl });
    }

    res.status(400).json({ message: "prompt and size are required" });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
    res
      .status(400)
      .json({ success: false, message: "Image generation failed" });
  }
};

module.exports = { generateImage };
