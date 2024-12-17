import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Sonuclar.css";

const Sonuclar = () => {
    const [results, setResults] = useState([]); // Ba�lang��ta bo� bir dizi
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
            const errorMessage = err.response?.data?.message || "Randevular bulunamad�.";
            setError(errorMessage);
        }
    };

    const fetchResults = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/Doctor/results");
            console.log("Sonu�lar API Yan�t�:", response.data); // API yan�t�n� kontrol et
            setResults(response.data);
        } catch (err) {
            console.error("Error fetching results:", err);
            const errorMessage = err.response?.data?.message || "Sonu�lar bulunamad�.";
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
            alert("L�tfen hasta se�in ve sonu� girin.");
            return;
        }

        try {
            const response = await apiClient.post("https://localhost:7200/api/Doctor/appointments/result", {
                AppointmentId: selectedAppointmentId.toString(),
                Message: message
            });

            alert("Sonu� ba�ar�yla g�nderildi.");
            fetchResults(); // Sonu� g�nderildikten sonra, g�ncel sonu�lar� �ekmek i�in fetchResults fonksiyonunu �a��r�yoruz
            setMessage(""); // Mesaj alan�n� s�f�rla
            setSelectedAppointmentId(""); // Se�ilen randevu ID'sini s�f�rla
        } catch (err) {
            console.error("Error sending result:", err);
            alert("Sonu� g�nderme s�ras�nda hata olu�tu.");
        }
    };

    // Y�kleniyor durumu
    if (loading) {
        return <div>Y�kleniyor...</div>;
    }

    // Hata durumu
    if (error) {
        return <div>Hata: {error}</div>;
    }

    return (
        <div className="table-container">
            <h2>Hastalar�n Sonu�lar�</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Randevu ID</th>
                        <th>Hasta</th>
                        <th>Sonu�</th>
                    </tr>
                </thead>
                <tbody>
                    {results && results.length > 0 ? (
                        results.map(result => (
                            result && result.resultId ? ( // resultId varsa g�ster
                                <tr key={result.resultId}>
                                    <td>{result.resultId}</td>
                                    <td>{result.appointmentId}</td>
                                    <td>{result.patientName}</td>
                                    <td>{result.message}</td>
                                </tr>
                            ) : null // resultId yoksa sat�r� atla
                        ))
                    ) : (
                        <tr><td colSpan="4">Sonu� bulunamad�.</td></tr> // Sonu� bo�sa
                    )}
                </tbody>
            </table>

            {/* Sonu� G�nderme Formu */}
            <div className="send-result-form">
                <h3>Sonu� G�nder</h3>
                <label>
                    Randevu Se�:
                    <select
                        value={selectedAppointmentId}
                        onChange={(e) => setSelectedAppointmentId(e.target.value)}
                    >
                        <option value="">Se�im Yap�n</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.appointmentId} value={appointment.appointmentId}>
                                {appointment.patientName} - Randevu ID: {appointment.appointmentId}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Sonu� Mesaj�:
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Sonu� mesaj�n�z� yaz�n"
                    ></textarea>
                </label>

                <button onClick={sendResult}>Sonu� G�nder</button>
            </div>
        </div>
    );
};

export default Sonuclar;
