import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sonuclar.css";

const token = localStorage.getItem("token");

// Axios istemcisi olu�turma
const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const Sonuclar = () => {
    const [results, setResults] = useState([]); // Sonu�lar
    const [appointments, setAppointments] = useState([]); // Randevular
    const [loading, setLoading] = useState(true); // Y�kleniyor durumu
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(""); // Se�ilen randevu ID'si
    const [message, setMessage] = useState(""); // G�nderilecek mesaj
    const [error, setError] = useState(null); // Hata mesaj�

    // API �a�r�s� ile randevular� ve sonu�lar� �ekme
    useEffect(() => {
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
                setResults(response.data);
            } catch (err) {
                console.error("Error fetching results:", err);
                const errorMessage = err.response?.data?.message || "Sonu�lar bulunamad�.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
        fetchResults();
    }, []);

    // Sonu� g�nderme fonksiyonu (randevuya g�re)
    const sendResult = async () => {
        if (!selectedAppointmentId || !message) {
            alert("L�tfen hasta se�in ve sonu� girin.");
            return;
        }

        try {
            const response = await apiClient.post("https://localhost:7200/api/Doctor/appointments/result", {
                AppointmentId: selectedAppointmentId.toString(), // AppointmentId'yi string format�na �evirin
                Message: message
            });

            alert("Sonu� ba�ar�yla g�nderildi.");
            setResults((prevResults) => [...prevResults, response.data.result]); // Yeni sonucu ekle
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
