// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const store = require("../db/store.js");

// set up express app
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/assets/index.html"))
);

router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notse);
    })
    .catch((err) => res.status(500).json(err));
});

// app.get("/notes", (req, res) =>
//   res.sendFile(path.join(__dirname, "./public/assets/notes.html"))
// );

// app.get("/api/notes", (req, res) => {
//   fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
//     if (err) throw err;
//     res.json(JSON.parse(data));
//   });
// });

// takes in JSON input
app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    const db = JSON.parse(data);
    // empty array for new data that has been parsed.
    const newDB = [];

    // req.body host is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    db.push(req.body);

    for (let i = 0; i < db.length; i++) {
      const newNote = {
        title: db[i].title,
        text: db[i].text,
      };

      newDB.push(newNote);
    }
  });

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  console.log(newCharacter);

  characters.push(newCharacter);
  res.json(newCharacter);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
