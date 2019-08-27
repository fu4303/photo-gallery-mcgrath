// JavaScript source code
const express = require("express"),
    app = express(),
    http = require("http").Server(app).listen(3306),
    mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "photo_gallery"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


function getHomePage (req, res){
    con.query("SELECT * FROM photo INNER JOIN album ON album.id = photo.album_id ORDER BY photo.date_uploaded DESC", function (err, result) {
        if (err) throw err;
        res.render(__dirname + "/index.ejs", {
            photo: result
        });
    });
};

function getAlbumsPage(req, res) {
    con.query("SELECT album.id, album.name, DATE_FORMAT(album.date_created, '%d-%m-%y') AS created_date, max(photo.path) AS photo_path, max(DATE_FORMAT(photo.date_uploaded, '%d-%m-%y')) AS last_upload FROM photo INNER JOIN album ON album.id=photo.album_id GROUP BY album.id ORDER BY album.date_created DESC;", function (err, result) {
        if (err) throw err;
        res.render(__dirname + "/albums.ejs", {
            album: result
        });
    });
};

app.set('view engine', 'ejs');
app.use("/css", express.static("./css"));
app.use("/img", express.static("./img"));
console.log("Server started at port 3306");
app.get("/", getHomePage);
app.get("/albums", getAlbumsPage);
