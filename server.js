// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// const store = require("./db/store.js");
// const store = require("./public/assets/js/index.js");

// set up express app
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  //   console.log("api hit");
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
});

// takes in JSON input
app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    const newDB = JSON.parse(data);
    // empty array for new data that has been parsed.
    // const newDB = [];

    // req.body host is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    newDB.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(newDB), (err, data) => {
      if (err) throw err;
      res.json(newDB);
    });
  });
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
