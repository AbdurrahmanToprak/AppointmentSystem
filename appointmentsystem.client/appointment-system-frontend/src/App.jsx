import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminLayout from "./components/AdminLayout";
import PsychologistLayout from "./components/PsychologistLayout";
import UserLayout from "./components/UserLayout";
import AppointmentsUser from "./components/AppointmentsUser";
import ResultsUser from "./components/ResultsUser";
import HomePage from "./components/HomePage"; // Ana sayfa bileþeni eklendi
import Randevular from "./components/Randevular";
import AdminRandevular from "./components/AdminRandevular";
import Sonuclar from "./components/Sonuclar";
import AdminFeedbacks from "./components/AdminFeedbacks";
import Dashboard from "./components/Dashboard";
import Psikologlar from "./components/Psikologlar";
import Hastalar from "./components/Hastalar";
import HastaDetay from "./components/HastaDetay";
import About from "./components/About";
import Contact from "./components/Contact";
import Feedback from "./components/Feedback";
import Blogs from "./components/Blogs";
import Roller from "./components/Roller";
import AppointmentPage from "./components/AppointmentPage";
import ProfilePage from './components/ProfilePage';
import AdminProfilePage from './components/AdminProfilePage';
import PsychologistProfile from './components/PsychologistProfile';


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ana Sayfa */}
                <Route path="/" element={<HomePage />} />
                <Route path="/appointment" element={<AppointmentPage />} />

                {/* Login ve Register */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />

                {/* Admin Paneli */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="psikologlar" element={<Psikologlar />} />
                    <Route path="hastalar" element={<Hastalar />} />
                    <Route path="hastalar/:id" element={<HastaDetay />} />
                    <Route path="randevular" element={<AdminRandevular />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="feedbacks" element={<AdminFeedbacks />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="roller" element={<Roller />} />
                    <Route path="profilim" element={<AdminProfilePage />} />
                </Route>

                {/* Psikolog Paneli */}
                <Route path="/psychologist" element={<PsychologistLayout />}>
                    <Route path="randevular" element={<Randevular />} />
                    <Route path="sonuclar" element={<Sonuclar />} />
                    <Route path="feedbacks" element={<AdminFeedbacks />} />
                    <Route path="profile" element={<PsychologistProfile />} />
                </Route>

                {/* Kullanýcý Paneli */}
                <Route path="/user" element={<UserLayout />}>
                    <Route path="randevularim" element={<AppointmentsUser />} />
                    <Route path="sonuclarim" element={<ResultsUser />} />
                    <Route path="profilim" element={<ProfilePage />} /> 

                </Route>
            </Routes>
        </Router>
    );
};

export default App;