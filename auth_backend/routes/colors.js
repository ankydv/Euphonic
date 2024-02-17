const express = require('express');
const axios = require('axios');
const getColors = require('get-image-colors');

const app = express();

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Function to fetch the image data from the URL
async function getImageDataFromURL(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching image from URL: ${error.message}`);
  }
}

// Function to get the color palette from the image URL
async function getColorPaletteFromURL(url, numColors) {
    const imageData = await getImageDataFromURL(url);
    const colors = await getColors(imageData, 'image/jpeg'); // Adjust the format if needed
    return colors.map(color => color.hex());
  }
  
  // Function to get the dominant color from the image URL
  async function getDominantColorFromURL(url) {
    const imageData = await getImageDataFromURL(url);
    const colors = await getColors(imageData, 'image/jpeg'); // Adjust the format if needed
    return colors[0].hex(); // Return the hex value of the first color
  }

// Express endpoints
app.get('/color-palette', async (req, res) => {
  const { url, numColors } = req.query;
  try {
    const palette = await getColorPaletteFromURL(url, numColors || 5);
    res.json({ palette });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/dominant-color', async (req, res) => {
  const {url} = req.query;
  try {
    const dominantColor = await getDominantColorFromURL(url);
    res.json({ dominantColor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;