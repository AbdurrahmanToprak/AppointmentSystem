import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./AdminLayout.css";
import { jwtDecode } from "jwt-decode"; 

const AdminLayout = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        } else {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            } catch (err) {
                console.error("Token decode error:", err);
            }
        }
    }, [navigate]); 
    useEffect(() => {
        if (user) {
            const role = Number(user.role);

            if (role !== 1) {
                navigate("/login");
            }
        }
    }, [user, navigate]);  

    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/"); 
    };


    return (
        <div className="admin-layout">
            <header className="admin-header">
                <h1>Admin Panel</h1>
                <Link to="/" className="header-button">Ana Sayfa</Link>
                <Link to="/admin/profilim" className="header-button">Profilim</Link>
                <button onClick={handleLogout} className="header-button logout-button">
                    cýkýs Yap
                </button>
            </header>
            <div className="admin-container">
                <aside className="admin-sidebar">
                    <ul>
                        <li>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/admin/psikologlar">Psikologlar</Link>
                        </li>
                        <li>
                            <Link to="/admin/hastalar">Hastalar</Link>
                        </li>
                        <li>
                            <Link to="/admin/randevular">Randevular</Link>
                        </li>
                        <li>
                            <Link to="/admin/about">About</Link>
                        </li>
                        <li>
                            <Link to="/admin/contact">Contact</Link>
                        </li>
                        <li>
                            <Link to="/admin/feedbacks">Feedback</Link>
                        </li>
                        <li>
                            <Link to="/admin/blogs">Blogs</Link>
                        </li>
                        <li>
                            <Link to="/admin/roller">Roller</Link>
                        </li>
                    </ul>
                </aside>
                <main className="admin-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
