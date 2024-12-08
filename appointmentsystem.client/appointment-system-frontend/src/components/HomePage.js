import React from "react";
import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const HomePage = () => {
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
                    <button className="cta-button">Randevu Al</button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="about-wrapper">
                    <div className="about-text">
                        <h2>Hakkımızda</h2>
                        <p>
                            MindSphere, bireylerin zihinsel sağlığını iyileştirmek için yenilikçi
                            yaklaşımlar sunar. Deneyimli ekibimizle, güvenilir ve etkili çözümler
                            sağlıyoruz. Her birey için özel, bilimsel temelli terapi yaklaşımları ile
                            hayatınıza yeni bir başlangıç yapın.
                        </p>
                        <div className="about-action">
                            <button className="cta-button">Daha Fazla</button>
                        </div>
                    </div>
                    <div className="about-image-container">
                        <div className="image-wrapper">
                            <img
                                src="https://www.sirpsikoloji.com/wp-content/uploads/2020/01/psikoloji-1.png"
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

            {/* Team Section */}
            <section id="team" className="team-section">
                <h2>Ekibimiz</h2>
                <div className="team-container">
                    <div className="team-member">
                        <div className="name-container">
                            <h3>Dr. Ayşe Yılmaz</h3>
                            <p className="role">Psikolog</p>
                        </div>
                        <p className="bio">
                            Ayşe Yılmaz, bireylerin zihin sağlığını iyileştirmek için 10 yılı aşkın süredir
                            danışmanlık hizmeti vermektedir. Depresyon, anksiyete ve stres yönetimi gibi konularda
                            uzmanlaşmıştır.
                        </p>
                    </div>
                    <div className="team-member">
                        <div className="name-container">
                            <h3>Dr. Mehmet Öztürk</h3>
                            <p className="role">Psikolog</p>
                        </div>
                        <p className="bio">
                            Mehmet Öztürk, çocuk ve ergen terapisi konusunda deneyime sahip bir uzmandır.
                            Aile içi iletişim ve çocuk gelişimi üzerine çalışmaktadır.
                        </p>
                    </div>
                    <div className="team-member">
                        <div className="name-container">
                            <h3>Dr. Elif Demir</h3>
                            <p className="role">Psikolog</p>
                        </div>
                        <p className="bio">
                            Elif Demir, çift terapisi ve ilişki yönetimi konusunda uzmanlaşmış bir terapisttir.
                            İnsanların sağlıklı ilişkiler kurmasına yardımcı olmaktadır.
                        </p>
                    </div>

                    <div className="team-member">
                        <div className="name-container">
                            <h3>Dr. Murat Tok</h3>
                            <p className="role">Psikolog</p>
                        </div>
                        <p className="bio">
                            Murat Tok, aneoreksiya ve anksiyete terapisi ve tedavi yönetimi konusunda uzmanlaşmış bir terapisttir.
                            İnsanların kaygısız bir hayat bir geçirmesine ve sağlıklı bir psikolojiye sahip olmalarına yardımcı olmaktadır.
                        </p>
                    </div>
                </div>
            </section>


            <section id="blogs" class="blogs-section">
                <h2 class="section-title">Bloglarımız</h2>

                <div class="blog-posts-container">
                    <div class="blog-post">
                        <div class="post-content">
                            <h3 class="post-title">Zihinsel Sağlık ve Özgüven</h3>
                            <p class="post-summary">
                                Zihinsel sağlık, sadece beyinle ilgili değil, aynı zamanda beden sağlığınızla da doğrudan ilişkilidir. Özellikle özgüvenimizi geliştirmek için...
                            </p>
                            <a href="#" class="read-more">Devamını Oku</a>
                        </div>
                    </div>

                    <div class="blog-post">
                        <div class="post-content">
                            <h3 class="post-title">Meditasyonun Faydaları</h3>
                            <p class="post-summary">
                                Meditasyonun ruhsal ve bedensel sağlık üzerindeki faydalarını keşfedin. Düzenli meditasyon, stresi azaltır ve odaklanmayı geliştirir...
                            </p>
                            <a href="#" class="read-more">Devamını Oku</a>
                        </div>
                    </div>

                    <div class="blog-post">
                        <div class="post-content">
                            <h3 class="post-title">Kaygı ile Başa Çıkma Yöntemleri</h3>
                            <p class="post-summary">
                                Kaygı, modern dünyada yaygın bir sorun. Ancak kaygı ile başa çıkmak için basit ama etkili yöntemler mevcuttur...
                            </p>
                            <a href="#" class="read-more">Devamını Oku</a>
                        </div>
                    </div>
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
                            <li><strong>Telefon:</strong> +90 123 456 7890</li>
                            <li><strong>Email:</strong> info@psikolog.com</li>
                            <li><strong>Adres:</strong> Psikolog Sokak No: 45, İstanbul</li>
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
                            <li><i class="fas fa-phone-alt"></i> +90 123 456 7890</li>
                            <li><i class="fas fa-envelope"></i> info@psikolog.com</li>
                            <li><i class="fas fa-map-marker-alt"></i> Psikolog Sokak No: 45, İstanbul</li>
                        </ul>
                    </div>

                    <div class="footer-right">
                        <h3>Sosyal Medya</h3>
                        <div class="social-links">
                            <a href="#" class="social-icon"><i class="fa-brands fa-facebook"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; 2024 Psikolog Web. Tüm Hakları Saklıdır.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;