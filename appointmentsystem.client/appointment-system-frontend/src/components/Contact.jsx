import React, { useEffect, useState } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const Contact = () => {
    const [contact, setContact] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        phoneNumber: "",
        address: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    const apiBaseUrl = "https://localhost:7200/api/admin/contact";

    const fetchContact = async () => {
        try {
            const response = await apiClient.get(apiBaseUrl);
            setContact(response.data);
            setFormData(response.data);
        } catch (error) {
            if (error.response) setMessage(error.response.data.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const response = await apiClient.put(`${apiBaseUrl}/${contact.contactId}`, formData);
                setMessage(response.data.message);
                setIsEditing(false);
            } else {
                const response = await apiClient.post(apiBaseUrl, formData);
                setMessage(response.data.message);
                setContact(response.data.contact);
            }
            fetchContact();
        } catch (error) {
            if (error.response) setMessage(error.response.data.message);
        }
    };


    const handleDelete = async () => {
        try {
            await apiClient.delete(`${apiBaseUrl}/${contact.contactId}`);
            setMessage("Baþarýyla silindi.");
            setContact(null);
            setFormData({ email: "", phoneNumber: "", address: "" });
        } catch (error) {
            if (error.response) setMessage(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Ýletiþim Bilgileri</h1>
            {message && <div className="alert alert-info">{message}</div>}

            {!contact ? (
                <div>
                    <h5>Henüz iletiþim bilgisi eklenmemiþ.</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Telefon Numarasý</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Adres</label>
                            <textarea
                                className="form-control"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Kaydet
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Telefon:</strong> {contact.phoneNumber}</p>
                    <p><strong>Adres:</strong> {contact.address}</p>
                    <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>
                        Düzenle
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Sil
                    </button>
                </div>
            )}

            {isEditing && (
                <div className="mt-4">
                    <h5>Ýletiþim Bilgilerini Güncelle</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Telefon Numarasý</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Adres</label>
                            <textarea
                                className="form-control"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">
                            Güncelle
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                setIsEditing(false);
                                setFormData(contact);
                            }}
                        >
                            Ýptal
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Contact;
