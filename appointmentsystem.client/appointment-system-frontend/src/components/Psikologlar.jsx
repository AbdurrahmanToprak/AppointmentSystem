import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Psikologlar.css";
import { useNavigate } from "react-router-dom"; 


const Psikologlar = () => {
    const [psikologlar, setPsikologlar] = useState([]);
    const [loading, setLoading] = useState(true);
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
            await axios.delete(`https://localhost:7200/api/admin/user/doctors/${id}`);
            setPsikologlar(psikologlar.filter((psikolog) => psikolog.userId !== id));
            alert("Doktor baþarýyla silindi.");
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