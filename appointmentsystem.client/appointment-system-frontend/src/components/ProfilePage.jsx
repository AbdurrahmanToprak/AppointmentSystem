import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const API_URL = "https://localhost:7200/api/patient/profile"; // Kullanýcý API URL

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    // Kullanýcýyý ve randevularýný yüklemek
    useEffect(() => {
        fetchUserProfile();
        fetchUserAppointments();
    }, []);

    // Kullanýcý profili verisini API'den çekmek
    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get(API_URL);
            setUser(response.data);
        } catch (error) {
            console.error("Kullanýcý bilgileri yüklenemedi.", error);
        }
    };

    // Randevularý API'den çekmek
    const fetchUserAppointments = async () => {
        try {
            const response = await apiClient.get(`${API_URL}/appointments`);
            setAppointments(response.data);
        } catch (error) {
            console.error("Randevular yüklenemedi.", error);
        }
    };

    // Profil düzenleme açma/kapama iþlemi
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // Profil güncellemelerini API'ye göndermek
    const handleSaveChanges = async () => {
        try {
            const response = await apiClient.put(API_URL, user);
            if (response.status === 200) {
                setMessage("Bilgiler baþarýyla güncellendi.");
                fetchUserProfile(); // Bilgileri tekrar güncelle
            } else {
                setMessage("Bir hata oluþtu, lütfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Bilgiler güncellenirken hata oluþtu.", error);
            setMessage("Bir hata oluþtu.");
        }
    };

    // Kullanýcý bilgilerini form üzerinden almak
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
                            <button onClick={handleEditToggle}>Düzenle</button>
                        </div>
                    )}
                    {message && <p className="message">{message}</p>}
                    <h2>Randevularým</h2>
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
                            <p>Henüz randevunuz bulunmamaktadýr.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Yükleniyor...</p>
            )}
        </div>
    );
};

export default ProfilePage;
