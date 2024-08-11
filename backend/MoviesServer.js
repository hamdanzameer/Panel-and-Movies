const express = require("express");
const app = express.Router();
const Movie = require("../backend/models/movies.js");
const { GridFSBucket } = require("mongodb");
const multer = require("multer");
const mongoose = require("mongoose");

// Setup GridFS
const conn = mongoose.createConnection(
  "mongodb://localhost:27017/PANELDATA ",
  {}
);

let gfs;
conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, { bucketName: "uploads" });
});

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add a movie with image upload
app.post("/addmovie", upload.single("image"), async (req, resp) => {
  try {
    const { title, genre, quality, downloadUrl } = req.body;
    const image = req.file.buffer;

    // Save image to GridFS
    const uploadStream = gfs.openUploadStream(req.file.originalname);
    uploadStream.end(image);

    const movie = new Movie({
      title,
      genre,
      quality,
      imageId: uploadStream.id, // Store the GridFS file ID in the movie document
      downloadUrl,
    });
    await movie.save();
    resp.status(201).json(movie);
  } catch (error) {
    console.error("Error while adding movie:", error);
    resp
      .status(500)
      .json({ error: "An error occurred while adding the movie." });
  }
});

// Fetch all movies
app.get("/getmovies", async (req, resp) => {
  try {
    const movies = await Movie.find();
    movieWithImageUrls = movies.map((movie) => {
      return {
        ...movie.toObject(),
        imageUrl: `http://localhost:4000/image/${movie.imageId}`,
      };
    });
    resp.status(200).json(movieWithImageUrls);
  } catch (error) {
    console.error("Error Occured while fetching movies", error);
    resp.status(500).json({ error: "Error occures While Fetching Movies" });
  }
});

// GET AN IMAGE BY ITS ID
app.get("/image/:id", async (req, resp) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const downloadStream = gfs.openDownloadStream(fileId);

    downloadStream.on("data", (chunk) => {
      resp.write(chunk);
    });

    downloadStream.on("error", () => {
      resp.status(404).json({ error: "Image not Found" });
    });

    downloadStream.on("end", () => {
      resp.end();
    });
  } catch (error) {
    console.error("Error while fetching image : ", error);
    resp
      .status(500)
      .json({ error: "Error occured while Fetching the Image. " });
  }
});

// Update movie
app.put("/updatemovie/:_id", async (req, resp) => {
  const { id } = req.params;
  const { title, genre, quality, imageUrl, downloadUrl } = req.body;
  const movie = await Movie.findByIdAndUpdate(
    id,
    { title, genre, quality, imageUrl, downloadUrl },
    { new: true }
  );
  resp.status(200).json(movie);
});

// Delete a movie
app.delete("/deletemovie/:_id", async (req, resp) => {
  const { id } = req.params;
  console.log(req.params);
  const movie = await Movie.deleteOne(id);
  resp.status(204).json(movie).end();
});

module.exports = app;
