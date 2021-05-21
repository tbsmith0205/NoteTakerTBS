const util = require("util");
const fs = require("fs");

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json, JSON.stringify");
  }

  getNotes() {}

  addNote(note) {}

  removeNote(id) {}
}

module.exports = new Store();
