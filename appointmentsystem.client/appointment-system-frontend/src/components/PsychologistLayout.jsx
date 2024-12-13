import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./PsychologistLayout.css";

const PsychologistLayout = () => {
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        window.location.href = "/";
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