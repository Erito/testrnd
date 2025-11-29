const express = require('express');
const app = express();
const db = require('./konekdb');
const cors = require('cors');
const port = 5001;


app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//KALO LIAT DATA USER TINGGAL KLIK HTTP DI TERMINAL \backend\
app.get('/', (req, res) => {
    db.query('SELECT * FROM user', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    })
});


//login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error : 'username ayau password g diisi' });
    }
    const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if(err) {
            return res.status(400).json({ error: 'gagal login' });
        }
        if(results.length === 0) {
            return res.status(401).json({ error: 'username atau password salah' });
        }
        res.status(200).json({ user: results[0] });
    })
});
//register
app.post('/register', (req, res) => {
    const { username, nama_lengkap, password, role } = req.body;
    if (!username || !nama_lengkap || !password || !role) {
        return res.status(400).json({ error: 'data harus diisi semua'});
    }
    const sql = 'INSERT INTO user (username, nama_lengkap, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, nama_lengkap, password, role], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'gagal register' });
        }
        res.status(201).json({ message: 'register berhasil' });
    })
});
//peserta
app.post('/peserta', (req, res) => {
    const { todo_id, nama_peserta } = req.body;
    if (!todo_id || !nama_peserta) {
        return res.status(400).json({ error: 'todo_id dan nama_peserta harus diisi' });
    }
    const sql = 'INSERT INTO peserta (todo_id, nama_peserta) VALUES (?, ?)';
    db.query(sql, [todo_id, nama_peserta], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'gagal daftar peserta' });
        }
        res.status(201).json({ message: 'berhasil daftar peserta' });
    });
});
app.get('/peserta', (req, res) => {
    const { todo_id, nama_peserta } = req.query;
    let sql = 'SELECT * FROM peserta';
    let params = [];
    if (todo_id) {
        sql += ' WHERE todo_id = ?';
        params.push(todo_id);
    } else if (nama_peserta) {
        sql += ' WHERE nama_peserta = ?';
        params.push(nama_peserta);
    }
    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(result);
    });
});



//event
app.get('/event', (req, res) => {
    const search = req.query.search;
    let sql = 'SELECT * FROM todo';
    let params = [];
    if (search) {
        sql += ' WHERE event LIKE ?';
        params.push('%' + search + '%');
    }
    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(result);
    });
});

//ADMIN POST
app.post('/event', (req, res) => {
    const { event, tanggal, lokasi, kuota, user_id } = req.body;
    if (!event || !tanggal || !lokasi || !kuota || !user_id) {
        return res.status(400).json({ error: 'Data harus diisi semua' });
    }
    const sql = 'INSERT INTO todo (event, tanggal, lokasi, Kuota, user_id, sisa_kuota) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [event, tanggal, lokasi, kuota, user_id, kuota], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal tambah event' });
        }
        res.status(201).json({ message: 'Event berhasil ditambah' });
    });
});
//ADMIN PUT
app.put('/event/:id', (req, res) => {
    const { event, tanggal, lokasi, kuota } = req.body;
    const { id } = req.params;
    if (!event || !tanggal || !lokasi || !kuota) {
        return res.status(400).json({ error: 'Data harus diisi semua' });
    }
    const sql = 'UPDATE todo SET event=?, tanggal=?, lokasi=?, Kuota=? WHERE id=?';
    db.query(sql, [event, tanggal, lokasi, kuota, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal update event' });
        }
        res.json({ message: 'Event berhasil diupdate' });
    });
});
//ADMIN DELETE
app.delete('/event/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM todo WHERE id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal hapus event' });
        }
        res.json({ message: 'Event berhasil dihapus' });
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});