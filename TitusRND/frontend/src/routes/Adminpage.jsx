import React, { useEffect, useState } from 'react';
import api from '../lib/axios';

function formatDate(dateStr) {
    if (!dateStr) return '';
    return dateStr.split('T')[0];
}

function Adminpage() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ event: '', tanggal: '', lokasi: '', kuota: '' });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(1);
    const [detailId, setDetailId] = useState(null);
    const [peserta, setPeserta] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserId(user?.id || 1);
        fetchEvents();
    }, [search]);

    const fetchEvents = () => {
        api.get('/event', { params: { search } })
            .then(res => setEvents(res.data))
            .catch(() => setMessage('Gagal mengambil data event'));
    };

    const fetchPeserta = (todo_id) => {
        api.get('/peserta', { params: { todo_id } })
            .then(res => setPeserta(res.data))
            .catch(() => setPeserta([]));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/event/${editId}`, form);
                setMessage('Event berhasil diupdate');
            } else {
                await api.post('/event', { ...form, user_id: userId });
                setMessage('Event berhasil ditambah');
            }
            setForm({ event: '', tanggal: '', lokasi: '', user_id: userId, kuota: '' });
            setEditId(null);
            fetchEvents();
        } catch {
            setMessage('Gagal simpan event');
        }
    };

    const handleEdit = (ev) => {
        setEditId(ev.id);
        setForm({ event: ev.event, tanggal: formatDate(ev.tanggal), lokasi: ev.lokasi, kuota: ev.Kuota });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin hapus event?')) return;
        try {
            await api.delete(`/event/${id}`);
            setMessage('Event berhasil dihapus');
            fetchEvents();
        } catch {
            setMessage('Gagal hapus event');
        }
    };

    const handleDetail = (id) => {
        setDetailId(id);
        fetchPeserta(id);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex justify-start mb-4">
                <a href="/" className="text-white hover:underline bg-red-500 rounded-xl p-3 ">Log out</a>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard - CRUD Event</h2>
            {message && <div className="text-center text-green-600 mb-4">{message}</div>}
            <form onSubmit={handleSubmit} className="mb-8 max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">{editId ? 'Edit Event' : 'Tambah Event'}</h3>
                <input type="text" name="event" value={form.event} onChange={handleChange} placeholder="Nama Event" className="mb-2 w-full p-2 border rounded" required />
                <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="mb-2 w-full p-2 border rounded" required />
                <input type="text" name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Lokasi" className="mb-2 w-full p-2 border rounded" required />
                <input type="number" name="kuota" value={form.kuota} onChange={handleChange} placeholder="Kuota Awal" className="mb-2 w-full p-2 border rounded" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editId ? 'Update' : 'Tambah'}</button>
                {editId && <button type="button" className="ml-2 bg-gray-400 text-white px-4 py-2 rounded" onClick={() => { setEditId(null); setForm({ event: '', tanggal: '', lokasi: '', kuota: '' }); }}>Batal</button>}
            </form>
            <div className="max-w-2xl mx-auto mb-4">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama event..." className="w-full p-2 border rounded" />
            </div>
            <div className="max-w-2xl mx-auto overflow-x-auto lg:overflow-x-visible">
                <table className="w-full bg-white rounded shadow min-w-max">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Nama Event</th>
                            <th className="p-2">Tanggal</th>
                            <th className="p-2">Lokasi</th>
                            <th className="p-2">Kuota</th>
                            <th className="p-2">Sisa Kuota</th>
                            <th className="p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(ev => (
                            <tr key={ev.id}>
                                <td className="p-2">{ev.event}</td>
                                <td className="p-2">{formatDate(ev.tanggal)}</td>
                                <td className="p-2">{ev.lokasi}</td>
                                <td className="p-2">{ev.Kuota}</td>
                                <td className="p-2">{ev.sisa_kuota}</td>
                                <td className="p-2">
                                    <button className="bg-yellow-400 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(ev)}>Edit</button>
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleDetail(ev.id)}>Detail</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(ev.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {detailId && (
                <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold mb-4">Peserta Yang Mendaftar</h3>
                    {peserta.length === 0 ? (
                        <p className="text-gray-500">Belum ada peserta yang mendaftar.</p>
                    ) : (
                        <ul className="list-disc pl-6">
                            {peserta.map((p, idx) => (
                                <li key={idx}>{p.nama_peserta}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default Adminpage;
