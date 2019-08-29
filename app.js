// JavaScript source code
const express = require("express"),
    app = express(),
    http = require("http").Server(app).listen(3306),
    mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "keyblade",
    database: "photo_gallery"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


function getHomePage (req, res){
    con.query("SELECT *, DATE_FORMAT(photo.date_uploaded, '%d-%m-%Y') AS upload_date FROM photo INNER JOIN album ON album.id = photo.album_id ORDER BY photo.date_uploaded DESC", function (err, result) {
        if (err) throw err;
        res.render("index.ejs", {
            photo: result
        });
    });
};

function getAlbumsPage(req, res) {
    con.query("SELECT album.id, album.name, DATE_FORMAT(album.date_created, '%d-%m-%Y') AS created_date, max(photo.path) AS photo_path, max(DATE_FORMAT(photo.date_uploaded, '%d-%m-%y')) AS last_upload FROM photo INNER JOIN album ON album.id=photo.album_id GROUP BY album.id ORDER BY album.date_created DESC;", function (err, result) {
        if (err) throw err;
        res.render("albums.ejs", {
            album: result
        });
    });
};

function getAlbum(req, res) {
    let albumId = req.params.id;
    con.query("SELECT * FROM photo INNER JOIN album ON photo.album_id=album.id WHERE album_id = " + albumId + " ORDER BY photo.id DESC", function (err, result) {
        if (err) throw err;
        res.render("album.ejs", {
            photos: result
        });
    });
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use("/css", express.static("./css"));
app.use("/img", express.static("./img"));
console.log("Server started at port 3306");
app.get("/", getHomePage);
app.get("/albums", getAlbumsPage);
app.get("/album/:id", getAlbum);
