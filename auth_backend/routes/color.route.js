import express from "express";
import {
  getColorPalette,
  getDominantColor,
} from "../controllers/color.controller.js";

const app = express();

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Express endpoints
app.get("/color-palette", getColorPalette);

app.get("/dominant-color", getDominantColor);

export default app;
