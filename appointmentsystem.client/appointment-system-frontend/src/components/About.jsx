import React, { useState, useEffect } from "react";
import axios from "axios";
import "./About.css";
import { useNavigate } from "react-router-dom"; 


const Abouts = () => {
    const [abouts, setAbouts] = useState([]);
    const [about, setAbout] = useState({ title: "", content: "", image: null });
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchAbouts = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/admin/about");
            setAbouts(response.data);
        } catch (error) {
            setMessage(error.response?.data?.message || "Bir hata oluþtu.");
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchAbouts();
        }
    }, [token, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAbout((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setAbout((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!about.title || !about.content || !about.image) {
            setMessage("Lütfen baslýk, icerik ve resim ekleyin!");
            return; 
        }

        const formData = new FormData();
        formData.append("title", about.title);
        formData.append("content", about.content);
        if (about.image) {
            formData.append("file", about.image);
        }

        try {
            if (editing) {
                await apiClient.put(`https://localhost:7200/api/admin/about/${about.aboutId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setMessage("About baþarýyla güncellendi!");
            } else {
                await apiClient.post("https://localhost:7200/api/admin/about", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setMessage("About baþarýyla eklendi!");
            }
            setEditing(false);
            setAbout({ title: "", content: "", image: null });
            fetchAbouts();
        } catch (error) {
            setMessage(error.response?.data?.message || "Bir hata oluþtu.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bu aboutu silmek istediginize emin misiniz?")) {
            try {
                await apiClient.delete(`https://localhost:7200/api/admin/about/${id}`);
                setMessage("About basarýyla silindi!");
                setAbouts((prevAbouts) => prevAbouts.filter((b) => b.aboutId !== id));
            } catch (error) {
                setMessage(error.response?.data?.message || "Bir hata olustu.");
            }
        }
    };

    const handleEdit = (aboutToEdit) => {
        setAbout(aboutToEdit);
        setEditing(true);
    };

    return (
        <div className="container">
            <h2>about Yonetimi</h2>
            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Baslýk"
                        value={about.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <textarea
                        name="content"
                        placeholder="Ýcerik"
                        value={about.content}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <button className="add-about-btn" type="submit">{editing ? "Guncelle" : "Ekle"}</button>
            </form>

            <table className="abouts">
                <thead>
                    <tr>
                        <th>Baslýk</th>
                        <th>Ýcerik</th>
                        <th>Resim</th>
                        <th>Ýslemler</th>
                    </tr>
                </thead>
                <tbody>
                    {abouts.map((b) => (
                        <tr key={b.aboutId}>
                            <td>{b.title}</td>
                            <td>{b.content}</td>
                            <td>
                                {b.imageUrl ? (
                                    <img
                                        src={`https://localhost:7200${b.imageUrl}`}
                                        alt="about"
                                        width="100"
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>
                                <button className="add-about-btn" onClick={() => handleEdit(b)}>Duzenle</button>
                                <button className="add-about-btn" onClick={() => handleDelete(b.aboutId)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Abouts;
