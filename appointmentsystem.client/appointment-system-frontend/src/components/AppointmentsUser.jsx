import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const AppointmentsUser = () => {
    const [appointments, setappointments] = useState([]);
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
        if (!token) {
            navigate("/login");
        } else {
            fetchData();
        }
    }, [token, navigate]);

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
                        <th>Saat</th>
                        <th>Doktor</th>
                        <th>Durum</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments && appointments.length > 0 ? (
                        appointments.map((appointment) => {
                            const dateTime = new Date(appointment.dateTime);
                            const formattedDate = dateTime.toLocaleDateString();
                            const formattedTime = dateTime.toLocaleTimeString();

                            return (
                                <tr key={appointment.appointmentId}>
                                    <td>{appointment.appointmentId}</td>
                                    <td>{formattedDate}</td>
                                    <td>{formattedTime}</td>
                                    <td>{appointment.doctorName || "Bilgi Yok"}</td>
                                    <td>{appointment.status ? "Aktif" : "Randevu saati geçti"}</td>
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



export default AppointmentsUser;    