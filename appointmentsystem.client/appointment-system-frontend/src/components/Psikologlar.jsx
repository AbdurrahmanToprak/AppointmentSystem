import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Psikologlar.css";
import { useNavigate } from "react-router-dom";

const Psikologlar = () => {
    const [psikologlar, setPsikologlar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newDoctor, setNewDoctor] = useState({ name: "", surname: "", email: "", password: "" });
    const [showForm, setShowForm] = useState(false); 
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchDoctors = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/admin/user/doctors");
            setPsikologlar(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Hata:", error.response?.data?.message || "Bir hata oluþtu.");
        }
    };

    const deleteDoctor = async (id) => {
        if (!window.confirm("Bu doktoru silmek istediðinize emin misiniz?")) return;

        try {
            await apiClient.delete(`https://localhost:7200/api/admin/user/doctors/${id}`);
            setPsikologlar(psikologlar.filter((psikolog) => psikolog.userId !== id));
            alert("Doktor baþarýyla silindi.");
        } catch (error) {
            alert(error.response?.data?.message || "Bir hata oluþtu.");
        }
    };

    const addDoctor = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("https://localhost:7200/api/admin/user/doctors", newDoctor);
            setPsikologlar([...psikologlar, response.data]); 
            setNewDoctor({ name: "", surname: "", email: "", password: "" }); 
            setShowForm(false); 
            await fetchDoctors(); 
            alert("Doktor baþarýyla eklendi.");
        } catch (error) {
            alert(error.response?.data?.message || "Bir hata oluþtu.");
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchDoctors();
        }
    }, [token, navigate]);

    return (
        <div className="psikologlar">
            <h1>Psikolog Listesi</h1>

            <button className="action-btn add-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Formu Kapat" : "Yeni Doktor Ekle"}
            </button>

            {showForm && (
                <form className="add-doctor-form" onSubmit={addDoctor}>
                    <h2>Yeni Doktor Ekle</h2>
                    <div>
                        <label>Ad:</label>
                        <input
                            type="text"
                            value={newDoctor.name}
                            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Soyad:</label>
                        <input
                            type="text"
                            value={newDoctor.surname}
                            onChange={(e) => setNewDoctor({ ...newDoctor, surname: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={newDoctor.email}
                            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Þifre:</label>
                        <input
                            type="password"
                            value={newDoctor.password}
                            onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="action-btn add-btn">
                        Kaydet
                    </button>
                </form>
            )}

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <table className="psikolog-table">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>E-mail</th>
                            <th>Ýþlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {psikologlar.length > 0 ? (
                            psikologlar.map((psikolog) => (
                                <tr key={psikolog.userId}>
                                    <td>{`${psikolog.name} ${psikolog.surname}`}</td>
                                    <td>{psikolog.email || "Belirtilmemiþ"}</td>
                                    <td>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => deleteDoctor(psikolog.userId)}
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Hiç psikolog bulunamadý.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Psikologlar;
