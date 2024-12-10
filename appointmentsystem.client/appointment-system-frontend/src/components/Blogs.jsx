import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blogs.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [blog, setBlog] = useState({ title: "", content: "", image: null });
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(false); 

    const fetchBlogs = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/admin/blog");
            setBlogs(response.data);
        } catch (error) {
            setMessage(error.response?.data?.message || "Bir hata olu�tu.");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setBlog((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", blog.title);
        formData.append("content", blog.content);
        if (blog.image) {
            formData.append("file", blog.image);
        }

        try {
            if (editing) {
                await apiClient.put(`https://localhost:7200/api/admin/blog/${blog.blogId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setMessage("Blog ba�ar�yla g�ncellendi!");
            } else {
                await apiClient.post("https://localhost:7200/api/admin/blog", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setMessage("Blog ba�ar�yla eklendi!");
            }
            setEditing(false);
            setBlog({ title: "", content: "", image: null }); 
            fetchBlogs();
        } catch (error) {
            setMessage(error.response?.data?.message || "Bir hata olu�tu.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bu blogu silmek istedi�inize emin misiniz?")) {
            try {
                await apiClient.delete(`https://localhost:7200/api/admin/blog/${id}`);
                setMessage("Blog ba�ar�yla silindi!");
                fetchBlogs();
            } catch (error) {
                setMessage(error.response?.data?.message || "Bir hata olu�tu.");
            }
        }
    };

    const handleEdit = (blogToEdit) => {
        setBlog(blogToEdit);
        setEditing(true);
    };

    return (
        <div className="container">
            <h2>Blog Y�netimi</h2>
            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Ba�l�k"
                        value={blog.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <textarea
                        name="content"
                        placeholder="��erik"
                        value={blog.content}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <button className="add-blog-btn" type="submit">{editing ? "G�ncelle" : "Ekle"}</button>
            </form>

            <table className="blogs">
                <thead>
                    <tr>
                        <th>Ba�l�k</th>
                        <th>��erik</th>
                        <th>Resim</th>
                        <th>��lemler</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((b) => (
                        <tr key={b.blogId}>
                            <td>{b.title}</td>
                            <td>{b.content}</td>
                            <td>
                                {b.imageUrl ? (
                                    <img
                                        src={`https://localhost:7200${b.imageUrl}`}
                                        alt="Blog"
                                        width="100"
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>
                                <button className="add-blog-btn" onClick={() => handleEdit(b)}>D�zenle</button>
                                <button className="add-blog-btn" onClick={() => handleDelete(b.blogId)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Blogs;
