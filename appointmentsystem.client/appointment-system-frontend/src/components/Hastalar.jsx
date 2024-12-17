import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./Hastalar.css";

const Hastalar = () => {
    const [hastalar, setHastalar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchPatients = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/admin/user/patients");
            setHastalar(response.data);
        } catch (error) {
            console.error("Hata:", error.response?.data?.message || "Bir hata oluþtu.");
            setError("Bir hata oluþtu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };


    const deletePatient = async (id) => {
        if (!window.confirm("Bu hastayý silmek istediginize emin misiniz?")) return;

        try {
            await apiClient.delete(`https://localhost:7200/api/admin/user/patients/${id}`);
            setHastalar(hastalar.filter((hasta) => hasta.userId !== id));
            alert("Hasta basarýyla silindi.");
        } catch (error) {
            console.error("Hata:", error.response?.data?.message || "Bir hata olustu.");
            setError("Hasta silinirken bir hata olustu.");
        }
    };


    const viewDetails = (id) => {
        navigate(`${id}`);
    };


    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchPatients();
        }
    }, [token, navigate]);

    if (loading) return <div>Yukleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;
    if (hastalar.length === 0) return <div>Hic hasta bulunamadý.</div>;

    return (
        <div className="hastalar">
            <h1>Hasta Listesi</h1>
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>E-mail</th>
                        <th>Ýslem</th>
                    </tr>
                </thead>
                <tbody>
                    {hastalar.map((hasta) => (
                        <tr key={hasta.userId}>
                            <td>{`${hasta.name} ${hasta.surname}`}</td>
                            <td>{hasta.email || "Belirtilmemiþ"}</td>
                            <td>
                                <button
                                    className="action-btn detail-btn"
                                    onClick={() => viewDetails(hasta.userId)}
                                >
                                    Detaylar
                                </button>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => deletePatient(hasta.userId)}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Hastalar;
