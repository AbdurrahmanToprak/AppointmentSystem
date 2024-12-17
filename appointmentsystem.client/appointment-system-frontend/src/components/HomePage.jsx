import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
    const [about, setAbout] = useState(null);
    const [team, setTeam] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [contact, setContact] = useState(null);
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const aboutResponse = await axios.get("https://localhost:7200/api/Home/about");
                setAbout(aboutResponse.data);
            } catch (err) {
                console.error("Error fetching about data:", err);
            }

            try {
                const teamResponse = await axios.get("https://localhost:7200/api/Home/doctors");
                setTeam(teamResponse.data);
            } catch (err) {
                console.error("Error fetching team data:", err);
            }

            try {
                const blogsResponse = await axios.get("https://localhost:7200/api/Home/blogs");
                setBlogs(blogsResponse.data);
            } catch (err) {
                console.error("Error fetching blog data:", err);
            }

            try {
                const contactResponse = await axios.get("https://localhost:7200/api/Home/contact");
                setContact(contactResponse.data);
            } catch (err) {
                console.error("Error fetching contact data:", err);
            }

            const token = localStorage.getItem("token");
            console.log("Token:", token);

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUser(decodedToken);
                } catch (err) {
                    console.error("Token decode error:", err);
                }
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    const handlePanelRedirect = () => {
        console.log("Panel button clicked", user);
        if (user) {
            const role = Number(user.role);

            switch (role) {
                case 1:
                    console.log("Redirecting to Admin Panel...");
                    navigate("/admin/dashboard");
                    break;
                case 2:
                    console.log("Redirecting to Psychologist Panel...");
                    navigate("/psychologist");
                    break;
                case 3:
                    console.log("Redirecting to User Panel...");
                    navigate("/user");
                    break;
                default:
                    console.log("Invalid user role");
                    break;
            }
        }
    };

    const openBlogModal = (blog) => {
        setSelectedBlog(blog);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBlog(null);
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="homepage">
            {/* Header */}
            <header className="homepage-header">
                <div className="logo">Psikosağlık</div>
                <nav>
                    <ul>
                        <li><a href="#hero">Ana Sayfa</a></li>
                        <li><a href="#about">Hakkımızda</a></li>
                        <li><a href="#services">Hizmetler</a></li>
                        <li><a href="#team">Ekibimiz</a></li>
                        <li><a href="#blogs">Blog</a></li>
                        <li><a href="#contact">İletişim</a></li>
                        {!user ? (
                            <li><a href="/login">GİRİS</a></li>
                        ) : (
                            <li>
                                <button className="panel-button" onClick={handlePanelRedirect}>
                                    Panelim
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>

            {/* Hero Section */}
            <section id="hero" className="hero-section">
                <div className="hero-content">
                    <h1>Akıl Sağlığınıza Yatırım Yapın</h1>
                    <div className="scrolling-text">
                        <p>Sağlıklı bir zihin, sağlıklı bir yaşam demektir | Zihinsel iyileşme, hayatın kalitesidir</p>
                    </div>
                    <p>
                        Akıl sağlığınız en değerli varlığınızdır. <br />
                        Bilimsel yöntemler ve uzman terapistlerimizle hayatınızı iyileştirin, her geçen gün daha güçlü bir zihin için yatırım yapın! <br />
                        İyi bir akıl sağlığı, sağlıklı kararlar ve daha mutlu bir yaşamın kapılarını aralar.
                    </p>
                    <button
                        className="cta-button"
                        onClick={() => window.location.href = "/appointment"}
                    >
                        Randevu Al
                    </button>
                </div>
            </section>

            {/* About Section */}
            {about && (
                <section id="about" className="about-section">
                    <div className="about-wrapper">
                        <div className="about-text">
                            <h2>Hakkımızda</h2>
                            <p>{about.content}</p>
                            <div className="about-action">
                                <button className="cta-button">Daha Fazla</button>
                            </div>
                        </div>
                        <div className="about-image-container">
                            <div className="image-wrapper">
                                <img
                                    src={about.imageUrl ? `https://localhost:7200/${about.imageUrl}` : `https://localhost:7200/default-image.jpg`}
                                    alt="About Us"
                                    className="about-image"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Services Section */}
            <section id="services" className="services-section">
                <h2>Hizmetlerimiz</h2>
                <div className="service-cards">
                    <div className="service-card">
                        <div className="icon-container">
                            <i className="fas fa-brain"></i>
                        </div>
                        <h3>Psikolojik Danışmanlık</h3>
                        <p>
                            Bireysel terapiler ile zihinsel sağlığınızı yeniden keşfedin.
                            Kişisel gelişim, stres yönetimi ve duygusal denge sağlamak için
                            profesyonel danışmanlık hizmeti veriyoruz.
                        </p>
                    </div>
                    <div className="service-card">
                        <div className="icon-container">
                            <i className="fas fa-users"></i>
                        </div>
                        <h3>Aile Terapisi</h3>
                        <p>
                            Aile içindeki iletişim sorunlarını çözmek, bağları güçlendirmek
                            ve birlikte daha sağlıklı bir yaşam sürmek için aile terapisi
                            hizmeti sunuyoruz.
                        </p>
                    </div>
                    <div className="service-card">
                        <div className="icon-container">
                            <i className="fas fa-heart"></i>
                        </div>
                        <h3>Çift Terapisi</h3>
                        <p>
                            Çiftlerin karşılaştığı zorluklarla baş edebilmesi için uzman
                            terapistlerle sağlıklı iletişim kurmalarına yardımcı oluyoruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {team.length > 0 && (
                <section id="team" className="team-section">
                    <h2>Ekibimiz</h2>
                    {team.slice(0, 5).map((doctor, index) => (
                        <div key={index} className="team-container">
                            <div className="team-member">
                                <div className="name-container">
                                    <h3>{doctor.name} {doctor.surname}</h3>
                                    <p className="role">Psikolog</p>
                                </div>
                                <p className="bio">
                                    {doctor.bio || "Bu doktor hakkında bilgi bulunmamaktadır."}
                                </p>
                                <p className="email">
                                    <strong>E-posta:</strong> {doctor.email || "E-posta bilgisi yok."}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Blog Section */}
            {blogs.length > 0 && (
                <section id="blogs" className="blogs-section">
                    <h2>Bloglarımız</h2>
                    <div className="blog-container">
                        {blogs.map((blog, index) => (
                            <div key={index} className="blog-card">
                                <img
                                    src={blog.imageUrl ? `https://localhost:7200/${blog.imageUrl}` : "https://localhost:7200/default-image.jpg"}
                                    alt={blog.title}
                                    className="blog-image"
                                />
                                <h3>{blog.title}</h3>
                                <button className="cta-button" onClick={() => openBlogModal(blog)}>
                                    Devamını Oku
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Blog Modal */}
            {showModal && selectedBlog && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2>{selectedBlog.title}</h2>
                        <img
                            src={selectedBlog.imageUrl ? `https://localhost:7200/${selectedBlog.imageUrl}` : "https://localhost:7200/default-image.jpg"}
                            alt={selectedBlog.title}
                        />
                        <p>{selectedBlog.content}</p>
                    </div>
                </div>
            )}

            {/* Contact Section */}
            {contact && (
                <section id="contact" className="contact-section">
                    <div className="contact-title">
                        <h2>Bizimle İletişime Geçin</h2>
                        <p>Yardımcı olmaktan memnuniyet duyarız! Sorularınız ve talepleriniz için bizimle iletişime geçin.</p>
                    </div>
                    <div className="contact-wrapper">
                        <div className="contact-form">
                            <form action="#" method="POST">
                                <div className="input-group">
                                    <input type="text" id="name" name="name" placeholder="Adınız" required />
                                    <input type="email" id="email" name="email" placeholder="E-posta" required />
                                    <textarea id="message" name="message" rows="4" placeholder="Mesajınız" required></textarea>
                                    <button type="submit" className="cta-button">Gönder</button>
                                </div>
                            </form>
                        </div>
                        <div className="contact-details">
                            <h3>İletişim Bilgilerimiz</h3>
                            <ul>
                                <li><strong>Telefon:</strong> {contact.email}</li>
                                <li><strong>Telefon:</strong> {contact.phoneNumber}</li>
                                <li><strong>Adres:</strong> {contact.address}</li>
                            </ul>
                            <div className="footer-right">
                                <h3>Sosyal medya</h3>
                                <div className="social-links">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <FaFacebook />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <FaTwitter />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <FaInstagram />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="homepage-footer">
                <p>© 2024 Psikosağlık. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );
};

export default HomePage;
