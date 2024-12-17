import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Sonuclar.css";



const Sonuclar = () => {
    const [results, setResults] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const fetchAppointments = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/Doctor/appointments");
            setAppointments(response.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            const errorMessage = err.response?.data?.message || "Randevular bulunamadý.";
            setError(errorMessage);
        }
    };

    const fetchResults = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/Doctor/results");
            setResults(response.data);
        } catch (err) {
            console.error("Error fetching results:", err);
            const errorMessage = err.response?.data?.message || "Sonuçlar bulunamadý.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchAppointments();
            fetchResults();
        }
    }, [token, navigate]);


    const sendResult = async () => {
        if (!selectedAppointmentId || !message) {
            alert("Lütfen hasta seçin ve sonuç girin.");
            return;
        }

        try {
            const response = await apiClient.post("https://localhost:7200/api/Doctor/appointments/result", {
                AppointmentId: selectedAppointmentId.toString(), // AppointmentId'yi string formatýna çevirin
                Message: message
            });

            alert("Sonuç baþarýyla gönderildi.");
            setResults((prevResults) => [...prevResults, response.data.result]); // Yeni sonucu ekle
            setMessage(""); // Mesaj alanýný sýfýrla
            setSelectedAppointmentId(""); // Seçilen randevu ID'sini sýfýrla
        } catch (err) {
            console.error("Error sending result:", err);
            alert("Sonuç gönderme sýrasýnda hata oluþtu.");
        }
    };


    // Yükleniyor durumu
    if (loading) {
        return <div>Yukleniyor...</div>;
    }

    // Hata durumu
    if (error) {
        return <div>Hata: {error}</div>;
    }

    return (
        <div className="table-container">
            <h2>Hastalarýn Sonuclarý</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Randevu ID</th>
                        <th>Hasta</th>
                        <th>Sonuc</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.resultId}>
                            <td>{result.resultId}</td>
                            <td>{result.appointmentId}</td>
                            <td>{result.patientName}</td>
                            <td>{result.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Sonuç Gönderme Formu */}
            <div className="send-result-form">
                <h3>Sonuç Gönder</h3>
                <label>
                    Randevu Seç:
                    <select
                        value={selectedAppointmentId}
                        onChange={(e) => setSelectedAppointmentId(e.target.value)}
                    >
                        <option value="">Secim Yapýn</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.appointmentId} value={appointment.appointmentId}>
                                {appointment.patientName} - Randevu ID: {appointment.appointmentId}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Sonuc Mesajý:
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Sonuç mesajýnýzý yazýn"
                    ></textarea>
                </label>

                <button onClick={sendResult}>Sonuc Gönder</button>
            </div>
        </div>
    );
};

export default Sonuclar;
