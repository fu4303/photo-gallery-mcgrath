// JavaScript source code
const express = require("express"),
    fileUpload = require("express-fileupload"),
    bodyParser = require("body-parser"),
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

global.con = con;

const { getHomePage } = require("./routes/index");
const { getAlbumsPage, getAlbumPhotos, getAddPhoto, postNewAlbum, editAlbumName } = require("./routes/album");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/css", express.static("./css"));
app.use("/img", express.static("./img"));
app.use(fileUpload());

app.get("/", getHomePage);
app.get("/albums", getAlbumsPage);
app.get("/album/:id", getAlbumPhotos);
app.get("/addphoto", getAddPhoto);
app.post("/createalbum", postNewAlbum);
app.post("/edittitle/:id", editAlbumName);
console.log("Server started at port 3306");