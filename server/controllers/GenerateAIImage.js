import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    console.log("Generating with FLUX for prompt:", prompt);

    // Auto-enhances short prompts into photorealistic 8K quality
    const enhancedPrompt = `${prompt}, photorealistic, ultra-detailed, 8k resolution, cinematic lighting, sharp focus, masterpiece`;
    const encodedPrompt = encodeURIComponent(enhancedPrompt);

    // High-definition FLUX model (100% free, no token needed)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Image service error: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    console.log(" Image generated successfully!");
    return res.status(200).json({ photo: base64Data });
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({
      message: error?.message || "Failed to generate image",
    });
  }
};