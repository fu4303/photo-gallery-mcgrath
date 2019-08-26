// JavaScript source code
var express = require("express"),
    app = express(),
    http = require("http").Server(app).listen(3306),
    mysql = require("mysql");

var con = mysql.createConnection({
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
    con.query("SELECT * FROM photo INNER JOIN album WHERE album.id = photo.album_id", function (err, result) {
        if (err) throw err;
        res.render(__dirname + "/index.ejs", {
            photo: result
        });
    });
};

app.use("/css", express.static("./css"));
app.use("/img", express.static("./img"));
console.log("Server started at port 3306");
app.get("/", getHomePage);
app.get("/albums", function (req, res) {
    res.render(__dirname + "/albums.ejs");
});
