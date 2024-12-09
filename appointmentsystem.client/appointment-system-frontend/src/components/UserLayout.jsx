import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./UserLayout.css";

const UserLayout = () => {
    const handleLogout = () => {
        // ��k�� yapma i�lemi i�in gerekli kodlar� buraya ekleyebilirsiniz.
        // �rne�in, kullan�c�n�n giri� bilgilerini temizlemek i�in localStorage veya sessionStorage kullanabilirsiniz.
        localStorage.removeItem("userToken");
        window.location.href = "/"; // Ana sayfaya y�nlendirme
    };

    return (
        <div className="user-layout">
            <header className="user-header">
                <h1>Kullan�c� Paneli</h1>
                <div className="header-buttons">
                    <Link to="/" className="header-button">Ana Sayfa</Link>
                    <Link to="/user/profilim" className="header-button">Profilim</Link>
                    <button onClick={handleLogout} className="header-button logout-button">
                        ��k�� Yap
                    </button>
                </div>
            </header>
            <div className="user-container">
                <aside className="user-sidebar">
                    <ul>
                        <li>
                            <Link to="/user/randevularim">Randevular�m</Link>
                        </li>
                        <li>
                            <Link to="/user/sonuclarim">Sonu�lar�m</Link>
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