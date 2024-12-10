import React, { useState, useEffect } from "react";
import axios from "axios";  
import "./Dashboard.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


const Dashboard = () => {
    const [stats, setStats] = useState({
        TotalDoctors: 0,
        TotalPatients: 0,
        TodaysAppointments: 0,
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await apiClient.get("https://localhost:7200/api/admin/dashboard");
                console.log(response.data);
                setStats(response.data); 
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []); 

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            {stats.TotalDoctors === 0 && stats.TotalPatients === 0 && stats.TodaysAppointments === 0 ? (
                <p>Veri yükleniyor...</p>
            ) : (
                <div className="stats-container">
                    <div className="stat-card">
                        <h2>Toplam Doktorlar</h2>
                        <p>{stats.totalDoctors}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Toplam Hastalar</h2>
                        <p>{stats.totalPatients}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Bugünkü Randevular</h2>
                        <p>{stats.todaysAppointments}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
