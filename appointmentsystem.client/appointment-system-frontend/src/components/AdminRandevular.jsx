import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Psikologlar.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const Randevular = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("https://localhost:7200/api/admin/appointment"); 
                setAppointments(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (appointments.length === 0) return <div>Randevu bulunmamaktad�r.</div>;

    return (
        <div className="table-container">
            <h2>Randevular</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarih</th>
                        <th>Doktor</th>
                        <th>Hasta</th>
                        <th>Saat</th>
                        <th>Durum</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.appointmentId}>
                            <td>{appointment.appointmentId}</td>
                            <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.patientName}</td>
                            <td>{new Date(appointment.dateTime).toLocaleTimeString()}</td>
                            <td>{appointment.status == true ? "Aktif" : "Randevu saati ge�ti"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Randevular;

export { apiClient };