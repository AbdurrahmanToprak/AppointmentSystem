import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats-container">
                <div className="stat-card">
                    <h2>Toplam Psikologlar</h2>
                    <p>25</p>
                </div>
                <div className="stat-card">
                    <h2>Toplam Hastalar</h2>
                    <p>120</p>
                </div>
                <div className="stat-card">
                    <h2>Bugünkü Randevular</h2>
                    <p>15</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;