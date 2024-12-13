import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const API_URL = "https://localhost:7200/api/patient/profile";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchUserProfile();
        fetchUserAppointments();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get(API_URL);
            setUser(response.data);
        } catch (error) {
            console.error("Kullan�c� bilgileri y�klenemedi.", error);
        }
    };

    const fetchUserAppointments = async () => {
        try {
            const response = await apiClient.get(`${API_URL}/appointments`);
            setAppointments(response.data);
        } catch (error) {
            console.error("Randevular y�klenemedi.", error);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append("userId", user.userId);
        formData.append("name", user.name);
        formData.append("surname", user.surname);
        formData.append("email", user.email);
        formData.append("password", user.password);
        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await apiClient.put(API_URL, formData)
            if (response.status === 200) {
                setMessage("Bilgiler ba�ar�yla g�ncellendi.");
                fetchUserProfile();
                setIsEditing(false);
            } else {
                setMessage("Bir hata olu�tu, l�tfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Bilgiler g�ncellenirken hata olu�tu.", error);
            setMessage("Bir hata olu�tu.");
        }
    };

    const deleteProfile = async (deleteType) => {
        try {
            const response = await apiClient.delete(
                `${API_URL}?userId=${user.userId}&deleteType=${deleteType}`
            );

            if (response.status === 200) {
                setMessage(response.data.message);

                if (deleteType === "account") {
                } else {
                    fetchUserProfile();
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const serverMessage = error.response.data.message;
                setMessage(serverMessage);
            } else {
                console.error("Hata olu�tu:", error);
                setMessage("Bir hata olu�tu.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="profile-page">
            {user ? (
                <>
                    <h1>Profilim</h1>
                    {message && <p className="message">{message}</p>}
                    {user.imageUrl && (
                        <img
                            src={user.imageUrl} 
                            alt="Profile"
                            className="profile-image"
                        />)}
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
                            <label>Profil Foto�raf� Y�kle:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <button onClick={handleSaveChanges}>Kaydet</button>
                        </div>
                    ) : (
                        <div className="profile-details">
                            <p><strong>Ad:</strong> {user.name}</p>
                            <p><strong>Soyad:</strong> {user.surname}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                                <button onClick={handleEditToggle}>D�zenle</button>
                                <button onClick={() => deleteProfile("profilePhoto")}>Profil Foto�raf�n� Sil</button>
                                <button onClick={() => deleteProfile("account")}>Hesab� Sil</button>
                        </div>
                    )}
                    
                </>
            ) : (
                <p>Y�kleniyor...</p>
            )}
        </div>
    );
};

export default ProfilePage;
