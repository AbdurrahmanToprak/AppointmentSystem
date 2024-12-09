import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./UserLayout.css";

const UserLayout = () => {
    const handleLogout = () => {
        // Çýkýþ yapma iþlemi için gerekli kodlarý buraya ekleyebilirsiniz.
        // Örneðin, kullanýcýnýn giriþ bilgilerini temizlemek için localStorage veya sessionStorage kullanabilirsiniz.
        localStorage.removeItem("userToken");
        window.location.href = "/"; // Ana sayfaya yönlendirme
    };

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