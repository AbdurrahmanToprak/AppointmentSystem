import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./AdminLayout.css";

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); 
        }
    }, [navigate]); 

    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/"); 
    };

    const token = localStorage.getItem("token");
    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <h1>Admin Panel</h1>
                <Link to="/admin/profilim" className="header-button">Profilim</Link>
                <button onClick={handleLogout} className="header-button logout-button">
                    Çýkýþ Yap
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
