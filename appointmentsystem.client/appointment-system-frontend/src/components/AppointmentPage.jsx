import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios import ediliyor
import { useNavigate } from "react-router-dom";
import "./AppointmentPage.css";

// Token'� localStorage'dan al�p axios ile kullan
//const isAuthenticated = Boolean(localStorage.getItem("token")); 




const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDoctorId, setSelectedDoctorId] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}` // JWT Token'� ba�l��a ekle
        }
    });
    const API_URL = "https://localhost:7200/api/patient/appointment";
    const DOCTOR_API_URL = `${API_URL}/doctors`;

    // Randevular� ve doktorlar� y�kle
    useEffect(() => {
        fetchAppointments();
        fetchDoctors();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await apiClient.get(`${API_URL}/myappointments`);
            console.log(response.data);
            setAppointments(response.data);
        } catch (error) {
            console.error("Randevular y�klenemedi.", error);
            if (error.response && error.response.status === 401) {
                setMessage("Oturumunuz sona erdi. L�tfen tekrar giri� yap�n�z.");
                navigate("/login");
            } else {
                // Di�er hatalar i�in genel bir mesaj g�ster
                setMessage("Randevular y�klenemedi.");
            }
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await apiClient.get(DOCTOR_API_URL);
            setDoctors(response.data);
        } catch (error) {
            console.error("Doktorlar y�klenemedi.", error);
            if (error.response && error.response.status === 401) {
                // Kullan�c� giri� yapmam��sa login sayfas�na y�nlendir
                setMessage("Oturumunuz sona erdi. L�tfen tekrar giri� yap�n�z.");
                navigate("/login");
            } else {
                // Di�er hatalar i�in genel bir mesaj g�ster
                setMessage("Doktorlar y�klenemedi.");
            }
        }
    };

    const handleAddAppointment = async () => {
        if (!selectedDate || !selectedTime || !selectedDoctorId) {
            setMessage("L�tfen tarih, saat ve doktor se�iniz.");
            return;
        }

        const newAppointment = {
            DateTime: `${selectedDate}T${selectedTime}`,
            DoctorId: selectedDoctorId,
        };

        try {
            const response = await apiClient.post(`${API_URL}/create`, newAppointment, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status >= 200 && response.status < 300) {
                setMessage("Randevu ba�ar�yla al�nd�!");
                fetchAppointments();
            } else {
                setMessage("Randevu al�n�rken bir hata olu�tu.");
            }
        } catch (error) {
            console.error("Randevu ekleme hatas�:", error);
            setMessage("Bir hata olu�tu. L�tfen tekrar deneyin.");
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            const response = await apiClient.delete(`${API_URL}/${id}`);
            if (response.status === 200) {
                setMessage("Randevu ba�ar�yla silindi!");
                fetchAppointments();
            } else {
                setMessage("Randevu silinirken bir hata olu�tu.");
            }
        } catch (error) {
            console.error("Randevu silme hatas�:", error);
            setMessage("Bir hata olu�tu. L�tfen tekrar deneyin.");
        }
    };

    return (
        <div className="appointment-page">
            <h1>Randevu Alma</h1>
            <div className="appointment-form">
                <label>Doktor Se�in:</label>
                <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                >
                    <option value="">Bir doktor se�in</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.userId} value={doctor.userId}>
                            {doctor.name} {doctor.surname}
                        </option>
                    ))}
                </select>

                <label>Tarih Se�in:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <label>Saat Se�in:</label>
                <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                />
                <button onClick={handleAddAppointment}>Randevu Al</button>
                {message && <p className="message">{message}</p>}
            </div>

            <h2>Randevular�m</h2>
            <div className="appointments-list">
                {appointments.map((appointment) => (
                    <div key={appointment.appointmentId} className="appointment-card">
                        <p>

                            Doktor: {appointment.doctorName}
                        </p>
                        <p>
                            Tarih: {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </p>
                        <p>
                            Saat: {appointment.appointmentTime}
                        </p>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteAppointment(appointment.appointmentId)}
                        >
                            Sil
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentPage;