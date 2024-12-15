import React, { useState, useEffect } from "react";
import axios from "axios"; // Directly import axios
import "./HomePage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";


const HomePage = () => {
    const [about, setAbout] = useState(null);
    //const [services, setServices] = useState([]);
    const [team, setTeam] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [contact, setContact] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data for all sections
    useEffect(() => {
        const fetchData = async () => {
            try {

                const aboutResponse = await axios.get("https://localhost:7200/api/Home/about");
                // const servicesResponse = await axios.get("https://localhost:7200/api/Home/services");
                const teamResponse = await axios.get("https://localhost:7200/api/Home/doctors");
                const blogsResponse = await axios.get("https://localhost:7200/api/Home/blogs");
                const contactResponse = await axios.get("https://localhost:7200/api/Home/contact");

                setAbout(aboutResponse.data);
                // setServices(servicesResponse.data);
                setTeam(teamResponse.data);
                setBlogs(blogsResponse.data);
                setContact(contactResponse.data);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err); // Log the error
                setError("Error fetching data");
                setLoading(false);
            }
        };

        fetchData(); // Fetch data when component mounts
    }, []);

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
                        <li><a href="/login">GİRİS</a></li>
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
            <section id="about" className="about-section">
                <div className="about-wrapper">
                    <div className="about-text">
                        <h2>Hakkımızda</h2>
                        <p>{about ? about.content : "Yükleniyor..."}</p>
                        <div className="about-action">
                            <button className="cta-button">Daha Fazla</button>
                        </div>
                    </div>
                    <div className="about-image-container">
                        <div className="image-wrapper">
                            <img
                                src={about && about.imageUrl ? `https://localhost:7200/${about.imageUrl}` : `https://localhost:7200/default-image.jpg`}
                                alt="About Us"
                                className="about-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

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





            <section id="team" className="team-section">
                <h2>Ekibimiz</h2>
                {team.length > 0 ? (
                    team.slice(0, 5).map((doctor, index) => (
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
                    ))
                ) : (
                    <p>Ekibimiz bilgisi yükleniyor...</p>
                )}
            </section>



            <section id="blogs" class="blogs-section">
                <h2 class="section-title">Bloglarımız</h2>
                <div class="blog-posts-container">
                    {blogs.map((blog, index) => (
                        <div class="blog-post">
                            <div class="post-content">

                                <h3 class="post-title">{blog.title}</h3>
                                <p class="post-summary">
                                    {blog.content}
                                </p>
                                <a href="#" class="read-more">Devamını Oku</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact" class="contact-section">
                <div class="contact-title">
                    <h2>Bizimle İletişime Geçin</h2>
                    <p>Yardımcı olmaktan memnuniyet duyarız! Sorularınız ve talepleriniz için bizimle iletişime geçin.</p>
                </div>
                <div class="contact-wrapper">
                    <div class="contact-form">
                        <form action="#" method="POST">
                            <div class="input-group">
                                <input type="text" id="name" name="name" placeholder="Adınız" required />
                            </div>
                            <div class="input-group">
                                <input type="email" id="email" name="email" placeholder="E-posta Adresiniz" required />
                            </div>
                            <div class="input-group">
                                <textarea id="message" name="message" placeholder="Mesajınızı yazın" required></textarea>
                            </div>
                            <button type="submit" class="submit-btn">Gönder</button>
                        </form>
                    </div>
                    <div class="contact-info">
                        <h3>Bize Ulaşın</h3>
                        <ul>
                            <li><strong>Telefon:</strong> {contact.phoneNumber}</li>
                            <li><strong>Email:</strong> {contact.email}</li>
                            <li><strong>Adres:</strong> {contact.address}</li>
                        </ul>
                    </div>
                </div>

            </section>

            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-left">
                        <h2 class="footer-logo">Psikolog Web</h2>
                        <p>Huzur ve dengeye giden yol, doğru rehberlikten geçer.</p>
                    </div>
                    <div class="footer-center">
                        <h3>İletişim Bilgileri</h3>
                        <ul>
                            <li><i class="fas fa-phone-alt"></i> {contact.phoneNumber}</li>
                            <li><i class="fas fa-envelope"></i> {contact.email}</li>
                            <li><i class="fas fa-map-marker-alt"></i> {contact.address}</li>
                        </ul>
                    </div>
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
                <div class="footer-bottom">
                    <p>&copy; 2024 Psikolog Web. Tüm Hakları Saklıdır.</p>
                </div>
            </footer>


            );











        </div>
    );
};

export default HomePage;
