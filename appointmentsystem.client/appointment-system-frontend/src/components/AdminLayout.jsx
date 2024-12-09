import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
    const handleLogout = () => {
        // ��k�� yapma i�lemi i�in gerekli kodlar� buraya ekleyebilirsiniz.
        // �rne�in, kullan�c�n�n giri� bilgilerini temizlemek i�in localStorage veya sessionStorage kullanabilirsiniz.
        localStorage.removeItem("userToken");
        window.location.href = "/"; // Ana sayfaya y�nlendirme
    };
    return (
        <div className="admin-layout">
            <header className="admin-header">
                <h1>Admin Panel</h1>
                <button onClick={handleLogout} className="header-button logout-button">
                    ��k�� Yap
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
                            <Link to="/admin/feedback">Feedback</Link>
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