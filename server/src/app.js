const express = require('express');
const app = express();
const cors = require('cors');

// Cors is a package that allows you to enable Cross-Origin Resource Sharing (CORS) with various options.
// This is useful for allowing your frontend to communicate with your backend.
// Implemented to temporarily allow all origins to access the server.
app.use(cors());

// Allow json and urlencoded data to be accepted by the server.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRoutes = require("./routes/mainRoute");
app.use("/api", mainRoutes);

module.exports = app;