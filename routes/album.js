const fs = require("fs");
var message = '';
exports.message = message;

module.exports = {
    getAlbumsPage: (req, res) => {
        message = '';
        let query = "SELECT album.id, album.name, DATE_FORMAT(album.date_created, '%d-%m-%Y') AS created_date, max(photo.path) AS photo_path, max(DATE_FORMAT(photo.date_uploaded, '%d-%m-%y')) AS last_upload FROM photo INNER JOIN album ON album.id=photo.album_id GROUP BY album.id ORDER BY album.date_created DESC;"
        con.query(query, function (err, result) {
            if (err) throw err;
            res.render("albums.ejs", {
                message,
                album: result
            });
        });
    },

    getAlbumPhotos: (req, res) => {
        message = '';
        let albumId = req.params.id;
        let query = "SELECT * FROM photo INNER JOIN album ON photo.album_id=album.id WHERE album_id = " + albumId + " ORDER BY photo.id DESC";
        con.query(query, function (err, result) {
            if (err) throw err;
            res.render("album.ejs", {
                message,
                photos: result
            });
        });
    },

    getAddPhoto: (req, res) => {
        let query = "SELECT * FROM album ORDER BY id DESC";
        con.query(query, function (err, result) {
            if (err) throw err;
            res.render("addphoto.ejs", {
                message,
                albums: result
            });
        });
    },

    postNewAlbum: (req, res) => {
        let albumName = req.body.albumNameInput;
        let albumQuery = "SELECT * FROM album WHERE name = '" + albumName + "'";
        con.query(albumQuery, function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                message = "Album '"+albumName+"' already exists";
                res.redirect("/addphoto");
            } else {
                message = '';
                let query = "INSERT INTO album (name) VALUES ('" + albumName + "')";
                con.query(query, function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect("/addphoto");
                });
            }
        });

    }
};