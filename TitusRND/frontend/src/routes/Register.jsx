import React, {useState} from "react";
import api from '../lib/axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        username: '',
        nama_lengkap: '',
        password: '',
        role: 'user'
    });
    const [message, setmessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/register', form);
            setmessage(res.data.message);
            navigate('/');
        } catch (err) {
            setmessage("Data harus diisi semua");
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create a New Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                        <input type="text" name="username" value={form.username} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Choose a username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="nama_lengkap">Nama Lengkap</label>
                        <input type="text" name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama lengkap"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Create a password" />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200" > Register </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                <div>
                    <p className="mt-4 text-center">Have an account? <a href="/" className="text-blue-500 hover:underline">Login here</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register;
