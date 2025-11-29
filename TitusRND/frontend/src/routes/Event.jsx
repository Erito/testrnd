import React, { useEffect, useState } from 'react';
import api from '../lib/axios';

function Event() {
    const [event, setEvent] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [search, setSearch] = useState('');
    const [daftarEventIds, setDaftarEventIds] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setNamaLengkap(user?.nama_lengkap || '');
        fetchEvent();
        fetchPeserta(user?.nama_lengkap);
    }, [search]);

    const fetchEvent = () => {
        api.get('/event', { params: { search } })
            .then(res => {
                setEvent(res.data);
            })
            .catch(err => {
                setError('Gagal mengambil data event');
            });
    };

    const fetchPeserta = (nama) => {
        if (!nama) return;
        api.get('/peserta', { params: { nama_peserta: nama } })
            .then(res => {
                setDaftarEventIds(res.data.map(p => p.todo_id));
            })
            .catch(() => setDaftarEventIds([]));
    };

    const handleDaftar = async (todo_id, sisa_kuota) => {
        if (sisa_kuota <= 0) return;
        if (daftarEventIds.includes(todo_id)) {
            setMessage('Anda sudah terdaftar di event ini!');
            return;
        }
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await api.post('/peserta', { todo_id, nama_peserta: user.nama_lengkap });
            setMessage('Berhasil daftar event!');
            fetchEvent();
            fetchPeserta(user.nama_lengkap);
        } catch (err) {
            setMessage('Gagal daftar event');
        }
    };

    function formatDate(tanggal) {
        return new Date(tanggal).toLocaleDateString('id-ID');
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-start mb-4">
                <a href="/" className="text-white hover:underline bg-red-500 rounded-xl p-3 ">Log out</a>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center">Daftar Event</h2>
            {nama_lengkap && <div className="text-center text-lg mb-6">Hi, <span className="font-bold">{nama_lengkap}</span></div>}
            <div className="max-w-2xl mx-auto mb-4">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama event..." className="w-full p-2 border rounded" />
            </div>
            {message && <div className="text-center text-green-600 mb-4">{message}</div>}
            <div className="grid gap-6 max-w-2xl mx-auto">
                {event.map(ev => {
                    const sudahDaftar = daftarEventIds.includes(ev.id);
                    return (
                        <div key={ev.id} className="bg-white p-6 rounded shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{ev.event}</h3>
                            <p><strong>Tanggal:</strong> {formatDate(ev.tanggal)}</p>
                            <p><strong>Lokasi:</strong> {ev.lokasi}</p>
                            <p><strong>Sisa Kuota:</strong> {ev.Kuota}/{ev.sisa_kuota}</p>
                            <button
                                className={`mt-4 w-full py-2 rounded ${ev.sisa_kuota > 0 && !sudahDaftar ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                                disabled={ev.sisa_kuota <= 0 || sudahDaftar}
                                onClick={() => handleDaftar(ev.id, ev.sisa_kuota)}
                            >
                                {ev.sisa_kuota > 0 ? (sudahDaftar ? 'Sudah Terdaftar' : 'Daftar') : 'Kuota Habis'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Event;