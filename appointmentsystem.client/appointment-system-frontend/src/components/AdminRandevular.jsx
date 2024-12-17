import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Psikologlar.css";
import { useNavigate } from "react-router-dom";

const Randevular = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("https://localhost:7200/api/admin/appointment");
                setAppointments(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("An error occurred while fetching appointments.");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    if (loading) return <div>Yukleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;
    if (appointments.length === 0) return <div>Randevu bulunmamaktadýr.</div>;

    return (
        <div className="table-container">
            <h2>Randevular</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                        <th>Doktor</th>
                        <th>Hasta</th>
                        <th>Durum</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => {
                            const dateTime = new Date(appointment.dateTime);
                            const formattedDate = dateTime.toLocaleDateString();
                            const formattedTime = dateTime.toLocaleTimeString();

                            return (
                                <tr key={appointment.appointmentId}>
                                    <td>{appointment.appointmentId}</td>
                                    <td>{formattedDate}</td>
                                    <td>{appointment.doctorName || "Bilgi Yok"}</td>
                                    <td>{appointment.patientName || "Bilgi Yok"}</td>
                                    <td>{formattedTime}</td>
                                    <td>{appointment.status ? "Aktif" : "Randevu saati gecti"}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Randevu bulunmadý</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Randevular;

