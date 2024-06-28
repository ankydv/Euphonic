import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import getColors from "get-image-colors";

// Function to fetch the image data from the URL
async function getImageDataFromURL(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching image from URL: ${error.message}`);
  }
}

// Function to get the color palette from the image URL
async function getColorPaletteFromURL(url, numColors) {
  const imageData = await getImageDataFromURL(url);
  const colors = await getColors(imageData, "image/jpeg"); // Adjust the format if needed
  return colors.map((color) => color.hex());
}

// Function to get the dominant color from the image URL
async function getDominantColorFromURL(url) {
  const imageData = await getImageDataFromURL(url);
  const colors = await getColors(imageData, "image/jpeg"); // Adjust the format if needed
  return colors[0].hex(); // Return the hex value of the first color
}

export const getColorPalette = asyncHandler(async (req, res) => {
  const { url, numColors } = req.query;
  try {
    const palette = await getColorPaletteFromURL(url, numColors || 5);
    res.json({ palette });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getDominantColor = asyncHandler(async (req, res) => {
  const { url } = req.query;
  try {
    const dominantColor = await getDominantColorFromURL(url);
    res.json({ dominantColor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
