import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./UserLayout.css";

const UserLayout = () => {
    return (
        <div className="user-layout">
            <header className="user-header">
                <h1>Kullan�c� Paneli</h1>
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