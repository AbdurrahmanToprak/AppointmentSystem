import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PsychologistLayout.css";
import { jwtDecode } from "jwt-decode"; 


const PsychologistLayout = () => {
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

            if (role !== 2) {
                navigate("/login");
            }
        }
    }, [user, navigate]);  

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="psychologist-layout">
            <header className="psychologist-header">
                <h1>Psychologist Panel</h1>
                <div className="header-right">
                    <span>Logo</span>
                    <Link to="/" className="header-button">Ana Sayfa</Link>
                    <Link to="/psychologist/profile" className="header-button">Profilim</Link>
                    <button onClick={handleLogout} className="header-button logout-button">
                        Çýkýþ Yap
                    </button>
                </div>
            </header>
            <div className="psychologist-container">
                <aside className="psychologist-sidebar">
                    <ul>
                        <li>
                            <Link to="/psychologist/randevular">Randevular</Link>
                        </li>
                        <li>
                            <Link to="/psychologist/sonuclar">Hastalarin Sonuclari</Link>
                        </li>
                        <li>
                            <Link to="/psychologist/Patients">Hastalar</Link>
                        </li>
                    </ul>
                </aside>
                <main className="psychologist-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PsychologistLayout;
