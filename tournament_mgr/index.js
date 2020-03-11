const express = require("express");



const path = require("path");

// == Databasehandling == //
const sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "data", "tournament_mgr.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'tournament_mgr.db'");
});

const sql_create_tournaments = `CREATE TABLE IF NOT EXISTS Tournaments (
    Tournament_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Tournament_Name VARCHAR(100) NOT NULL,
    Type VARCHAR(100) NOT NULL,
    Player_Count INT NOT NULL,
    Status VARCHAR(100) NOT NULL,
    Comments TEXT
  );`;
  
  db.run(sql_create_tournaments, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'Tournaments' table");
  });

const sql_create_players = `CREATE TABLE IF NOT EXISTS Players (
Player_ID INTEGER PRIMARY KEY AUTOINCREMENT,
Player_Name VARCHAR(100) NOT NULL
);`;

db.run(sql_create_players, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'Players' table");
  });

const sql_create_map_players_tournaments = `CREATE TABLE IF NOT EXISTS Map_Players_Tournaments (
    Map_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Player_ID INT NOT NULL,
    Tournament_ID INT NOT NULL
    );`;

db.run(sql_create_map_players_tournaments, err => {
if (err) {
    return console.error(err.message);
}
console.log("Successful creation of the 'Map_Players_Tournaments' table");
});
// Database seeding
const sql_insert_tournaments = `INSERT INTO Tournaments (Tournament_ID, Tournament_Name, Type, Player_Count, Status, Comments) VALUES
(1, 'Test1', 'KO-Runde', 4, 'Gestartet', 'eeesf'),
(2, 'Test2', 'Liga - Hin',  7, 'Beendet', 'asdf'),
(3, 'Test3', 'Liga - Hin und Rück', 2, 'Neu', 'nur 2 Spieler, laaaaannnggweilig');`;
db.run(sql_insert_tournaments, err => {
    if (err) {
    return console.error(err.message);
    }
    console.log("Successful creation of 3 Tournaments");
});
const sql_insert_players = `INSERT INTO Players (Player_ID, Player_Name) VALUES
(1, 'Ich'),
(2, 'Du'),
(3, 'Er'),
(4, 'Sie'),
(5, 'ES');`;
db.run(sql_insert_players, err => {
    if (err) {
    return console.error(err.message);
    }
    console.log("Successful creation of 5 Players");
});
const sql_insert_map_players_tournaments = `INSERT INTO Map_Players_Tournaments (Map_ID, Player_ID, Tournament_ID) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 1),
(6, 2, 5);`;
db.run(sql_insert_map_players_tournaments, err => {
    if (err) {
    return console.error(err.message);
    }
    console.log("Successful creation of 5 Players");
});






// == ROUTES Handling == //

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // <--- middleware configuration


app.listen(3000, () => { 
  console.log("Server started (http://localhost:3000/) !");
});

// = Basic Routes = //

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/tournaments", (req, res) => {
    const sql = "SELECT * FROM tournaments"
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(rows);
        res.render("tournaments", {model: rows});
    });
});

app.get("/players", (req, res) => {
    const sql = "SELECT * FROM players"
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render("players", {model: rows});
    });
});

app.get("/leagues", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});


// = Advanced Routes = //

/*app.get("/create_tournament", (req, res) => {
    const sql = "SELECT p.Player_ID, p.Player_Name, MAX(t.Tournament_ID) as Tournament_ID FROM players p, Tournaments t GROUP BY p.Player_ID, p.Player_Name"
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render("create_tournament", {model: rows});
    });
});*/

app.get("/create_tournament", (req, res) => {
    const sql = "SELECT MAX(t.Tournament_ID) as Tournament_ID FROM Tournaments t"
    db.get(sql, [], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        const redirect_route = '/edit_tournament/' + row.Tournament_ID
        console.log("Redirect URL with max Tournament ID: " + redirect_route);
        res.redirect(redirect_route);
    });
});

app.get("/edit_tournament/:id", (req, res) => {
    const sql = "SELECT p.Player_ID, p.Player_Name, MAX(t.Tournament_ID) as Tournament_ID FROM players p, Tournaments t GROUP BY p.Player_ID, p.Player_Name"
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render("edit_tournament", {model: rows});
    });
});
/*
app.get("/edit_tournament/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Tournaments WHERE Tournament_ID = ?";
    db.get(sql, id, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
      res.render("edit_tournament", { model: row });
    });
  });
*/

// POST /edit/5
app.post("/edit_tournament/:id", (req, res) => {
    console.log("post edit_tournament aufgerufen");
    const id = req.params.id;
    console.log("post zum Erstellen von Tournament abgesetzt");
    const sql_tournaments = "INSERT OR REPLACE INTO Tournaments (Tournament_Name, Player_Count, Type, Status, Comments) VALUES (?, ?, ?, ?, ?)";
    const tournament = [id, req.body.Tournament_Name, 3, req.body.Type, req.body.Status, req.body.Comments];
    db.run(sql_tournaments, tournament, err => {
        if (err) {
            return console.error(err.message);
        }
    });
    console.log("Tournament erstellt oder geupdated");
    console.log("post zum Mapping von Tournament nach Spieler abgesetzt");
    const spieler = req.body['spieler'];
    console.log ("Spieler array: " + spieler);
    for (const player in spieler){
        console.log ("player" + player);
        const sql = "INSERT OR REPLACE INTO Map_Players_Tournaments (Player_ID, Tournament_ID) VALUES (?, ?)";
        const map_players_tournaments = [player, id];
        db.run(sql, map_players_tournaments, err => {
            if (err) {
                return console.error(err.message);
            }
        });
    }
    res.redirect("/tournaments");
  });



  // POST /create
/*
app.post("/create_tournament", (req, res) => {
    console.log("post zum Erstellen von Tournament abgesetzt");
    const sql_tournaments = "INSERT INTO Tournaments (Tournament_Name, Player_Count, Type, Status, Comments) VALUES (?, ?, ?, ?, ?)";
    const tournament = [req.body.Tournament_ID, req.body.Tournament_Name, 3, req.body.Type, req.body.Status, req.body.Comments];
    db.run(sql_tournaments, tournament, err => {
        if (err) {
            return console.error(err.message);
        }
    });
    console.log('spieler : ' + req.body['spieler']);*/
/*    if(req.body.checked) {
        console.log('checked : ' + req.body.checked);
      }*/

  /*  const sql_tournaments = "INSERT INTO Map_Players_Tournaments (Player_ID, Tournament_ID) VALUES (?, ?)";
    const tournament = [req.body.Tournament_Name, req.body.Type, req.body.Status, req.body.Comments];
    db.run(sql, tournament, err => {
        if (err) {
            return console.error(err.message);
        }
    });*/
//});