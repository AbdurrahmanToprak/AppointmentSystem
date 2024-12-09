import React, { useState, useEffect } from "react";
import "./AppointmentPage.css";

const API_URL = "https://localhost:7200/api/Appointments"; // Randevu API URL
const DOCTOR_API_URL = "https://localhost:7200/api/Doctors"; // Doktorlar API URL

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDoctorId, setSelectedDoctorId] = useState("");
    const [message, setMessage] = useState("");

    // Randevularý yükle
    useEffect(() => {
        fetchAppointments();
        fetchDoctors();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            } else {
                console.error("Randevular yüklenemedi.");
            }
        } catch (error) {
            console.error("Randevu alma hatasý:", error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await fetch(DOCTOR_API_URL);
            if (response.ok) {
                const data = await response.json();
                setDoctors(data);
            } else {
                console.error("Doktorlar yüklenemedi.");
            }
        } catch (error) {
            console.error("Doktor alma hatasý:", error);
        }
    };

    const handleAddAppointment = async () => {
        if (!selectedDate || !selectedTime || !selectedDoctorId) {
            setMessage("Lütfen tarih, saat ve doktor seçiniz.");
            return;
        }

        const newAppointment = {
            date: selectedDate,
            time: selectedTime,
            doctorId: selectedDoctorId,
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAppointment),
            });

            if (response.ok) {
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
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
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
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
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
                    <div key={appointment.id} className="appointment-card">
                        <p>Doktor: {appointment.doctorName}</p>
                        <p>Tarih: {appointment.date}</p>
                        <p>Saat: {appointment.time}</p>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteAppointment(appointment.id)}
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
