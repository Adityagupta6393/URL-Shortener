import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Landing Page</h1>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;