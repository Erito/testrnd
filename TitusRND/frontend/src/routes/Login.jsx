import React, {useState} from "react";
import api from '../lib/axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({username: "", password: ""});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await api.post('/login', form);
            const user = res.data.user;
            localStorage.setItem('user', JSON.stringify(user));
            if (user.role === 'admin') {
                navigate('/adminpage');
            } else {
                navigate('/event');
            }
        } catch (err) {
            setMessage(err.response?.data?.error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Halaman Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={form.username} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="PW"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">Login</button>
                </form>
                {message && <p className="text-red-500 mt-4">{message}</p>}
                <div>
                    <p className="mt-4 text-center">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;