const express = require("express");
const path = require("path");

const sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

const sql_create = `CREATE TABLE IF NOT EXISTS Books (
    Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(100) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Comments TEXT
  );`;
  
  db.run(sql_create, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'Books' table");
  });
// Database seeding
/*const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
(1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
(2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
(3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;
db.run(sql_insert, err => {
    if (err) {
    return console.error(err.message);
    }
    console.log("Successful creation of 3 books");
});*/


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => { {
  console.log("Server started (http://localhost:3000/) !");
}});

app.get("/", (req, res) => { {
    // res.send("Hello world...");
    res.render("index");
  }});
/*
app.get("/", (req, res) => { {
  res.send ("Hello PENIS...");
}});*/

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/data", (req, res) => {
    const test = {
      title: "Test",
      items: ["one", "two", "Penis"]  
    };
    res.render("data", {model: test});
});

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM Books ORDER BY Title"
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render("books", {model: rows});
    });
});