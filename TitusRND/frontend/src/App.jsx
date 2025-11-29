import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/login.jsx";
import Register from "./routes/register.jsx";
import Event from "./routes/event.jsx";
import Adminpage from "./routes/adminpage.jsx";


function App() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/event" element={<Event />} />
            <Route path="/adminpage" element={<Adminpage />} />
        </Routes>
    )
}

export default App;