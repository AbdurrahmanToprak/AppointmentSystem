import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PsychologistProfile.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const API_URL = "https://localhost:7200/api/doctor/profiles";

const PsychologistProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(""); // Mesaj durumu

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get(API_URL);
            setUser(response.data);
        } catch (error) {
            console.error("Kullanýcý bilgileri yüklenemedi.", error);
            alert("Kullanýcý bilgileri yüklenemedi. Lütfen tekrar deneyin.");
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            axios.post("https://localhost:7200/api/doctor/upload-image", formData)
                .then(response => {
                    setUser((prevUser) => ({
                        ...prevUser,
                        imageUrl: response.data.imageUrl, // Backend'den dönen fotoðraf URL'sini al
                    }));
                })
                .catch(error => {
                    console.error("Fotoðraf yüklenirken hata oluþtu.", error);
                });
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await apiClient.put(API_URL, user);
            if (response.status === 200) {
                setMessage("Bilgiler baþarýyla güncellendi.");
                setIsEditing(false); // Düzenleme modundan çýk
                fetchUserProfile(); // Güncellenen bilgileri yeniden yükle
            } else {
                setMessage("Bir hata oluþtu, lütfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Bilgiler güncellenirken hata oluþtu.", error);
            setMessage("Bir hata oluþtu.");
        }
    };

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
                    {message && <p className="message">{message}</p>}
                    {user.imageUrl && (
                        <img
                            src={user.imageUrl} // Fotoðraf URL'si
                            alt="Profile"
                            className="profile-image"
                        />
                    )}
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
                            <label>Profil Fotoðrafý Yükle:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <button onClick={handleSaveChanges}>Kaydet</button>
                        </div>
                    ) : (
                        <div className="profile-details">
                            <p>
                                <strong>Ad:</strong> {user.name}
                            </p>
                            <p>
                                <strong>Soyad:</strong> {user.surname}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <button onClick={handleEditToggle}>Düzenle</button>
                        </div>
                    )}
                </>
            ) : (
                <p>Yükleniyor...</p>
            )}
        </div>
    );
};

export default PsychologistProfilePage;
