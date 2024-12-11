import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProfilePage.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const API_URL = "https://localhost:7200/api/admin/profile"; 

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get(API_URL);
            setUser(response.data);
        } catch (error) {
            console.error("Admin bilgileri y�klenemedi.", error);
        }
    };


    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await apiClient.put(API_URL, user);
            if (response.status === 200) {
                setMessage("Bilgiler ba�ar�yla g�ncellendi.");
                fetchUserProfile(); 
            } else {
                setMessage("Bir hata olu�tu, l�tfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Bilgiler g�ncellenirken hata olu�tu.", error);
            setMessage("Bir hata olu�tu.");
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
                   
                  
                </>
            ) : (
                <p>Y�kleniyor...</p>
            )}
        </div>
    );
};

export default ProfilePage;
