import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PsychologistLayout.css";


const Randevular = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const fetchData = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/Doctor/appointments");
            setAppointments(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.message || "Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchData();
        }
    }, [token, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (appointments.length === 0) return <div>Randevu bulunmamaktadýr.</div>;

    return (
        <div className="table-container">
            <h2>Randevular</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarih</th>
                        <th>Hasta</th>
                        <th>Saat</th>
                        <th>Durum</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.appointmentId}</td>
                            <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.status == true ? "Aktif" : "Randevu saati geçti"}</td>
                
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Randevular;

