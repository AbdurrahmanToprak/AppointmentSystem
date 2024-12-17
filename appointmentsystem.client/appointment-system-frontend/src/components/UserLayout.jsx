import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLayout.css";
import { jwtDecode } from "jwt-decode"; 

const UserLayout = () => {
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

            if (role !== 3) {
                navigate("/login");
            }
        }
    }, [user, navigate]);  

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");  
    };

    return (
        <div className="user-layout">
            <header className="user-header">
                <h1>Kullanýcý Paneli</h1>
                <div className="header-buttons">
                    <Link to="/" className="header-button">Ana Sayfa</Link>
                    <Link to="/user/profilim" className="header-button">Profilim</Link>
                    <button onClick={handleLogout} className="header-button logout-button">
                        cýkýs Yap
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
                            <Link to="/user/sonuclarim">Sonuclarým</Link>
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

