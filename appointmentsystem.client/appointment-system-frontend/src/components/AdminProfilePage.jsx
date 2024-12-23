import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProfilePage.css";
import { useNavigate } from "react-router-dom";


const API_URL = "https://localhost:7200/api/admin/profile";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchUserProfile();
        }
    }, [token, navigate]);

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
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
                setMessage("Bilgiler basar�yla guncellendi.");
                fetchUserProfile(); 
                setIsEditing(false);
            } else {
                setMessage("Bir hata olustu, lutfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Bilgiler g�ncellenirken hata olustu.", error);
            setMessage("Bir hata olustu.");
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
                console.error("Hata olustu:", error);
                setMessage("Bir hata olustu.");
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
                    {isEditing ? (
                        <div className="profile-form">
                            <label>Profil Foto�raf�:</label>
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
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
                            <label>�ifre:</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                            <button onClick={handleSaveChanges}>Kaydet</button>
                            <button onClick={handleEditToggle} className="cancel-button">
                                �ptal
                            </button>
                        </div>
                    ) : (
                            <div className="profile-details">
                                {user.imageUrl && (
                                    <p>
                                        <strong>Profil Fotograf�:</strong>
                                        <br />
                                        <img
                                            src={`https://localhost:7200${user.imageUrl}`}
                                            alt="Profil Foto�raf�"
                                            className="profile-image"
                                        />
                                    </p>
                                )}
                            <p>
                                <strong>Ad:</strong> {user.name}
                            </p>
                            <p>
                                <strong>Soyad:</strong> {user.surname}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            
                                <button onClick={handleEditToggle}>Duzenle</button>
                                <button onClick={() => deleteProfile("profilePhoto")}>Profil Fotograf�n� Sil</button>
                                <button onClick={() => deleteProfile("account")}>Hesab� Sil</button>
                        </div>
                    )}
                    {message && <p className="message">{message}</p>}
                </>
            ) : (
                <p>Yukleniyor...</p>
            )}
        </div>
    );
};

export default ProfilePage;
