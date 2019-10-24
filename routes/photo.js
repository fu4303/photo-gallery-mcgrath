const fs = require('fs');

module.exports = {
    uploadPhoto: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No images were uploaded.");
        }

        let albumId = req.body.albumSelect;
        let uploadedPhoto = req.files.photoSrc;
        let photoPath = uploadedPhoto.name;
        //let fileExtension = uploadedPhoto.mimetype.split('/')[1];

        if (uploadedPhoto.mimetype === 'image/png' || uploadedPhoto.mimetype === 'image/jpg' || uploadedPhoto.mimetype === 'image/jpeg' || uploadedPhoto.mimetype === 'image/gif') {
            uploadedPhoto.mv(`img/${photoPath}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                let query = "INSERT INTO photo (album_id, path) VALUES (" + albumId + ", '" + photoPath + "')";
                con.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/album/' + albumId);
                });
            });    
        } else {
            message = "Invalid file format. Only 'gif', 'jpg', 'jpeg' and 'png' images are allowed";
            res.render('addphoto.ejs', {
                message
            });
        } 
    }
};