import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Özelleþtirilmiþ CSS

const LoginForm = () => {
    const [tc, setTc] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // API çaðrýsý ile giriþ iþlemi yapýlacak
        console.log("TC:", tc, "Password:", password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>TC:</label>
                    <input
                        type="text"
                        value={tc}
                        onChange={(e) => setTc(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <p onClick={() => navigate("/register")} className="register-link">
                    Don't have an account? Register here
                </p>
            </form>
        </div>
    );
};

export default LoginForm;