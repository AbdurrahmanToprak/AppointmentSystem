import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLayout.css";

const UserLayout = () => {
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
        <div className="user-layout">
            <header className="user-header">
                <h1>Kullanýcý Paneli</h1>
                <div className="header-buttons">
                    <Link to="/" className="header-button">Ana Sayfa</Link>
                    <Link to="/user/profilim" className="header-button">Profilim</Link>
                    <button onClick={handleLogout} className="header-button logout-button">
                        Çýkýþ Yap
                    </button>
                </div>
            </header>
            <div className="user-container">
                <aside className="user-sidebar">
                    <ul>
                        <li>
                            <Link to="/user/randevularim">Randevularým</Link>
                        </li>
                        <li>
                            <Link to="/user/sonuclarim">Sonuçlarým</Link>
                        </li>
                    </ul>
                </aside>
                <main className="user-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;