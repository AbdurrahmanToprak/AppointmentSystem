import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./PsychologistLayout.css";

const PsychologistLayout = () => {
    const handleLogout = () => {
        // ��k�� yapma i�lemi i�in gerekli kodlar� buraya ekleyebilirsiniz.
        // �rne�in, kullan�c�n�n giri� bilgilerini temizlemek i�in localStorage veya sessionStorage kullanabilirsiniz.
        localStorage.removeItem("userToken");
        window.location.href = "/"; // Ana sayfaya y�nlendirme
    };
    return (
        <div className="psychologist-layout">
            <header className="psychologist-header">
                <h1>Psychologist Panel</h1>
                <div className="header-right">
                    <span>Logo</span>
                    <Link to="/profile" className="profile-link">Profilim</Link>
                    <button onClick={handleLogout} className="header-button logout-button">
                        ��k�� Yap
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
                            <Link to="/psychologist/feedbacks">Feedbacks</Link>
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