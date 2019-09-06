module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT *, DATE_FORMAT(photo.date_uploaded, '%d-%m-%Y') AS upload_date FROM photo INNER JOIN album ON album.id = photo.album_id ORDER BY photo.date_uploaded DESC"
        con.query(query, function (err, result) {
            if (err) throw err;
            res.render("index.ejs", {
                photo: result
            });
        });
    }
};