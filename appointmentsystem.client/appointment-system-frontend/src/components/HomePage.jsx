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
                    <h2 className="section-title">Bloglarımız</h2>
                    <div className="blog-posts-container">
                        {blogs.map((blog, index) => (
                            <div key={index} className="blog-post">
                                <div className="post-content">
                                    <img
                                        src={blog.imageUrl ? `https://localhost:7200/${blog.imageUrl}` : `https://localhost:7200/default-image.jpg`}
                                        alt={blog.title}
                                        className="about-image"
                                    />
                                    <h3 className="post-title">{blog.title}</h3>
                                    <p className="post-excerpt">{blog.shortContent}</p>
                                    <a href="#" className="cta-button">
                                        Devamını Oku
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {contact && (
                <section id="contact" className="contact-section">
                    <h2>İletişim</h2>
                    <div className="contact-info">
                        <p>
                            <strong>Telefon:</strong> {contact.phone}
                        </p>
                        <p>
                            <strong>Email:</strong> {contact.email}
                        </p>
                        <div className="social-links">
                            <a href={contact.facebook}><FaFacebook /></a>
                            <a href={contact.twitter}><FaTwitter /></a>
                            <a href={contact.instagram}><FaInstagram /></a>
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
