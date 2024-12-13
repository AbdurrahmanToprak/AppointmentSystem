import React, { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const AppointmentsUser = () => {
    const [appointments, setappointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
        const fetchData = async () => {
            try {
                const response = await apiClient.get("https://localhost:7200/api/patient/appointment/myappointments");
                console.log(response.data); // Gelen veriyi kontrol edin
                setappointments(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Error fetching data");
            } finally {
                setLoading(false);
            }
        };
    useEffect(() => {  
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="table-container">
            <h2>Randevularým</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarih</th>
                        <th>Doktor Adý</th>
                        <th>Randevu</th>
                        <th>Durum</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments && appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <tr key={appointment.appointmentId}>
                                <td>{appointment.appointmentId}</td>
                                <td>{appointment.appointmentDate}</td>
                                <td>{appointment.doctorName}</td>
                                <td>{appointment.appointmentTime}</td>
                                <td>{appointment.status == true ? "Aktif" : "Randevu saati geçti"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4">No appointments found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>

    );
};



export default AppointmentsUser;    