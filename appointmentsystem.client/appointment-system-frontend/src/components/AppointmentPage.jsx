import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios import ediliyor
import { useNavigate } from "react-router-dom";
import "./AppointmentPage.css";

// Token'ý localStorage'dan alýp axios ile kullan
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
            Authorization: `Bearer ${token}` // JWT Token'ý baþlýða ekle
        }
    });
    const API_URL = "https://localhost:7200/api/patient/appointment";
    const DOCTOR_API_URL = `${API_URL}/doctors`;

    // Randevularý ve doktorlarý yükle
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
            console.error("Randevular yüklenemedi.", error);
            if (error.response && error.response.status === 401) {
                setMessage("Oturumunuz sona erdi. Lütfen tekrar giriþ yapýnýz.");
                navigate("/login");
            } else {
                // Diðer hatalar için genel bir mesaj göster
                setMessage("Randevular yüklenemedi.");
            }
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await apiClient.get(DOCTOR_API_URL);
            setDoctors(response.data);
        } catch (error) {
            console.error("Doktorlar yüklenemedi.", error);
            if (error.response && error.response.status === 401) {
                // Kullanýcý giriþ yapmamýþsa login sayfasýna yönlendir
                setMessage("Oturumunuz sona erdi. Lütfen tekrar giriþ yapýnýz.");
                navigate("/login");
            } else {
                // Diðer hatalar için genel bir mesaj göster
                setMessage("Doktorlar yüklenemedi.");
            }
        }
    };

    const handleAddAppointment = async () => {
        if (!selectedDate || !selectedTime || !selectedDoctorId) {
            setMessage("Lütfen tarih, saat ve doktor seçiniz.");
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
                setMessage("Randevu baþarýyla alýndý!");
                fetchAppointments();
            } else {
                setMessage("Randevu alýnýrken bir hata oluþtu.");
            }
        } catch (error) {
            console.error("Randevu ekleme hatasý:", error);
            setMessage("Bir hata oluþtu. Lütfen tekrar deneyin.");
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            const response = await apiClient.delete(`${API_URL}/${id}`);
            if (response.status === 200) {
                setMessage("Randevu baþarýyla silindi!");
                fetchAppointments();
            } else {
                setMessage("Randevu silinirken bir hata oluþtu.");
            }
        } catch (error) {
            console.error("Randevu silme hatasý:", error);
            setMessage("Bir hata oluþtu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="appointment-page">
            <h1>Randevu Alma</h1>
            <div className="appointment-form">
                <label>Doktor Seçin:</label>
                <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                >
                    <option value="">Bir doktor seçin</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.userId} value={doctor.userId}>
                            {doctor.name} {doctor.surname}
                        </option>
                    ))}
                </select>

                <label>Tarih Seçin:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <label>Saat Seçin:</label>
                <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                />
                <button onClick={handleAddAppointment}>Randevu Al</button>
                {message && <p className="message">{message}</p>}
            </div>

            <h2>Randevularým</h2>
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