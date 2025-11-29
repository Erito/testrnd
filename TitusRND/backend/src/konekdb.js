const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "titusrnd_db"
});

db.connect((err) => {
    if(err){
        console.log("GAGAL KONEKSI DATABASE");
    } else{
        console.log("DI DATABASE KONEKSI BERHASIL");
    }
});

module.exports = db;