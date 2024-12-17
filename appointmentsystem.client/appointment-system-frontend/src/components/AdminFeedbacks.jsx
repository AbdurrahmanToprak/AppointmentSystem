import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminFeedback.css";


const AdminFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [message, setMessage] = useState("");
    const apiBaseUrl = "https://localhost:7200/api/admin/feedback";
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const fetchFeedbacks = async () => {
        try {
            const response = await apiClient.get(apiBaseUrl);
            setFeedbacks(response.data);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Bir hata olustu.");
            }
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await apiClient.put(`${apiBaseUrl}/${id}`, { status });
            setMessage(response.data.message);
            fetchFeedbacks(); 
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Bir hata olustu.");
            }
        }
    };

    const deleteFeedback = async (id) => {
        if (window.confirm("Bu yorumu silmek istediginizden emin misiniz?")) {
            try {
                const response = await apiClient.delete(`${apiBaseUrl}/${id}`);
                setMessage(response.data.message);
                
                if (response.status === 200) {
                    setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((f) => f.feedBackId !== id));
                }
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Bir hata olustu.");
                }
            }
        }
    };


    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchFeedbacks();
        }
    }, [token, navigate]);

    return (
        <div className="container mt-4">
            <h2>Geri Bildirimler</h2>
            {message && <div className="alert alert-info">{message}</div>}
            {feedbacks.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hasta ID</th>
                            <th>Yorum</th>
                            <th>Puan</th>
                            <th>Durum</th>
                            <th>Olusturma Tarihi</th>
                            <th>islemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.feedBackId}>
                                <td>{feedback.feedBackId}</td>
                                <td>{feedback.patientId}</td>
                                <td>{feedback.comment || "Yorum yok"}</td>
                                <td>{feedback.point}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={feedback.status ? "Aktif" : "Pasif"}
                                        onChange={(e) =>
                                            updateStatus(feedback.feedBackId, e.target.value === "Aktif")
                                        }
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Pasif">Pasif</option>
                                    </select>
                                </td>
                                <td>{new Date(feedback.createdDate).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteFeedback(feedback.feedBackId)}
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Geri bildirim bulunamadý.</p>
            )}
        </div>
    );
};

export default AdminFeedbacks;
