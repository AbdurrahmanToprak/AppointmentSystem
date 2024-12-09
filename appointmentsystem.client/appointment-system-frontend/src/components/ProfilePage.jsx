import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const API_URL = "https://localhost:7200/api/patient/profile"; // Kullan�c� API URL

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    // Kullan�c�y� ve randevular�n� y�klemek
    useEffect(() => {
        fetchUserProfile();
        fetchUserAppointments();
    }, []);

    // Kullan�c� profili verisini API'den �ekmek
    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get(API_URL);
            setUser(response.data);
        } catch (error) {
            console.error("Kullan�c� bilgileri y�klenemedi.", error);
        }
    };

    // Randevular� API'den �ekmek
    const fetchUserAppointments = async () => {
        try {
            const response = await apiClient.get(`${API_URL}/appointments`);
            setAppointments(response.data);
        } catch (error) {
            console.error("Randevular y�klenemedi.", error);
        }
    };

    // Profil d�zenleme a�ma/kapama i�lemi
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // Profil g�ncellemelerini API'ye g�ndermek
    const handleSaveChanges = async () => {
        try {
            const response = await apiClient.put(API_URL, user);
            if (response.status === 200) {
                setMessage("Bilgiler ba�ar�yla g�ncellendi.");
                fetchUserProfile(); // Bilgileri tekrar g�ncelle
            } else {
                setMessage("Bir hata olu�tu, l�tfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Bilgiler g�ncellenirken hata olu�tu.", error);
            setMessage("Bir hata olu�tu.");
        }
    };

    // Kullan�c� bilgilerini form �zerinden almak
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="profile-page">
            {user ? (
                <>
                    <h1>Profilim</h1>
                    {isEditing ? (
                        <div className="profile-form">
                            <label>Ad:</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                            <label>Soyad:</label>
                            <input
                                type="text"
                                name="surname"
                                value={user.surname}
                                onChange={handleChange}
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            <button onClick={handleSaveChanges}>Kaydet</button>
                        </div>
                    ) : (
                        <div className="profile-details">
                            <p><strong>Ad:</strong> {user.name}</p>
                            <p><strong>Soyad:</strong> {user.surname}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button onClick={handleEditToggle}>D�zenle</button>
                        </div>
                    )}
                    {message && <p className="message">{message}</p>}
                    <h2>Randevular�m</h2>
                    <div className="appointments-list">
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <div key={appointment.appointmentId} className="appointment-card">
                                    <p>
                                        <strong>Doktor:</strong> {appointment.doctor.name} {appointment.doctor.surname}
                                    </p>
                                    <p>
                                        <strong>Tarih:</strong> {new Date(appointment.dateTime).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Saat:</strong> {new Date(appointment.dateTime).toLocaleTimeString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Hen�z randevunuz bulunmamaktad�r.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Y�kleniyor...</p>
            )}
        </div>
    );
};

export default ProfilePage;
