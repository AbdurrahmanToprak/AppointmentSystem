import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminLayout from "./components/AdminLayout";
import PsychologistLayout from "./components/PsychologistLayout";
import UserLayout from "./components/UserLayout";
import AppointmentsUser from "./components/AppointmentsUser";
import ResultsUser from "./components/ResultsUser";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<div>Dashboard</div>} />
                    <Route path="psikologlar" element={<div>Psikologlar</div>} />
                    <Route path="hastalar" element={<div>Hastalar</div>} />
                    <Route path="randevular" element={<div>Randevular</div>} />
                    <Route path="about" element={<div>About</div>} />
                    <Route path="contact" element={<div>Contact</div>} />
                    <Route path="feedback" element={<div>Feedback</div>} />
                    <Route path="blogs" element={<div>Blogs</div>} />
                </Route>
                <Route path="/psychologist" element={<PsychologistLayout />}>
                    <Route path="randevular" element={<div>Randevular</div>} />
                    <Route path="sonuclar" element={<div>Hastalar�n Sonu�lar�</div>} />
                    <Route path="feedbacks" element={<div>Feedbacks</div>} />
                </Route>
                <Route path="/user" element={<UserLayout />}>
                    <Route path="randevularim" element={<AppointmentsUser />} />
                    <Route path="sonuclarim" element={<ResultsUser />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;