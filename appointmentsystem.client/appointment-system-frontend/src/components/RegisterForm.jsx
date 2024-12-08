import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css"; // CSS dosyasý

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        tc: "",
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // API çaðrýsý ile kayýt iþlemi yapýlacak
        console.log(formData);
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <div className="form-group">
                    <label>TC:</label>
                    <input
                        type="text"
                        value={formData.tc}
                        onChange={(e) =>
                            setFormData({ ...formData, tc: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                <p onClick={() => navigate("/login")} className="login-link">
                    Already have an account? Login here
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;