import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Roller.css";
import { useNavigate } from "react-router-dom"; 



const Roller = () => {
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState({ roleName: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    const apiBaseUrl = "https://localhost:7200/api/admin/role"; 
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const apiClient = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchRoles = async () => {
        try {
            const response = await apiClient.get(apiBaseUrl);
            if (response.data.message) {
                setMessage(response.data.message);
            } else {
                setRoles(response.data);
            }
        } catch (error) {
            console.error("Error fetching roles:", error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchRoles();
        }
    }, [token, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRole({ ...role, [name]: value });
    };


    const createRole = async () => {
        try {
            const response = await apiClient.post(apiBaseUrl, role);
            setMessage(response.data.message);
            setRole({ roleName: "" });
            fetchRoles();
        } catch (error) {
            console.error("Error creating role:", error.response?.data?.message || error.message);
        }
    };


    const editRole = async () => {
        try {
            const response = await apiClient.put(`${apiBaseUrl}/${editingId}`, role);
            setMessage(response.data.message);
            setRole({ roleName: "" });
            setIsEditing(false);
            setEditingId(null);
            fetchRoles();
        } catch (error) {
            console.error("Error editing role:", error.response?.data?.message || error.message);
        }
    };


    const deleteRole = async (id) => {
        if (window.confirm("Bu rolü silmek istediðinizden emin misiniz?")) {
            try {
                const response = await apiClient.delete(`${apiBaseUrl}/${id}`);
                setMessage(response.data.message);
                fetchRoles();
            } catch (error) {
                console.error("Error deleting role:", error.response?.data?.message || error.message);
            }
        }
    };


    const startEdit = (role) => {
        setRole(role);
        setIsEditing(true);
        setEditingId(role.roleId);
    };

    return (
        <div className="container mt-4">
            <h2>Rol Yönetimi</h2>
            {message && <div className="alert alert-success">{message}</div>}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    isEditing ? editRole() : createRole();
                }}
            >
                <div className="mb-3">
                    <label className="form-label">Rol Adý</label>
                    <input
                        type="text"
                        name="roleName"
                        className="form-control"
                        value={role.roleName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="add-role-btn">
                    {isEditing ? "Güncelle" : "Ekle"}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        className="add-role-btn"
                        onClick={() => {
                            setIsEditing(false);
                            setRole({ roleName: "" });
                        }}
                    >
                        Vazgeç
                    </button>
                )}
            </form>

            <table className="roller">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Rol Adý</th>
                        <th>Ýþlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((r, index) => (
                        <tr key={r.roleId}>
                            <td>{index + 1}</td>
                            <td>{r.roleName}</td>
                            <td>
                                <button className="add-role-btn" onClick={() => startEdit(r)}>
                                    Düzenle
                                </button>
                                <button
                                    className="add-role-btn"
                                    onClick={() => deleteRole(r.roleId)}
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

export default Roller;
