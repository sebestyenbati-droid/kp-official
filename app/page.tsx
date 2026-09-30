"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type News = {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  author: string;
  createdAt: string;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [news, setNews] = useState<News[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch("/api/hirek", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Nem sikerült betölteni a híreket.");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setNews(data);
        }
      } catch (error) {
        console.error("Hírek betöltési hiba:", error);
      } finally {
        setLoadingNews(false);
      }
    }

    loadNews();
  }, []);

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  }

  return (
    <main className={darkMode ? "dark-mode" : ""}>
      <header className="navbar">
        <Link href="/" className="brand">
          <div className="brand-mark">KP</div>

          <div className="brand-text">
            <strong>KIKÉPZÉSI</strong>
            <span>PARANCSNOKSÁG</span>
          </div>
        </Link>

        <nav className="navigation">
          <Link href="/" className="active">
            Kezdőlap
          </Link>

          <Link href="/allomany">
            Állomány
          </Link>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-button"
            aria-label="Téma váltása"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀" : "☾"}
          </button>
        </div>
      </header>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero">
        <div className="hero-grid" />

        <div className="orbit orbit-hero">
          <div className="orbit-track" />
          <div className="orbit-dot" />
        </div>

        <div className="blue-orb orb-one" />
        <div className="blue-orb orb-two" />

        <div className="hero-content">
          <div className="eyebrow">
            MAGYAR HONVÉDSÉG
          </div>

          <h1>
            Kiképzési
            <br />
            <span>Parancsnokság</span>
          </h1>

          <p>
            A Kiképzési Parancsnokság hivatalos információs
            és állományi felülete.
          </p>

          <div className="hero-actions">
            <Link href="/allomany" className="hero-button">
              Állomány megtekintése
              <span>→</span>
            </Link>

            <a href="#hirek" className="secondary-button">
              Legfrissebb hírek
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          INFORMÁCIÓ
      ========================= */}

      <section className="intro-section section">
        <div>
          <div className="section-label">
            KIKÉPZÉSI PARANCSNOKSÁG
          </div>

          <h2>
            Információ
          </h2>
        </div>

        <div className="intro-side">
          <p className="intro-text">
            A Kiképzési Parancsnokság a Magyar Honvédség (MH) agya és szíve, ami
            a teljes személyi állomány kiképzését és fejlesztését szervezi. Ők
            felelnek a kiképzési stratégiákért, az újoncok alapkiképzésétől a
            speciális továbbképzésekig mindenért. Céljuk, hogy a Honvédség mindig
            felkészült és ütőképes legyen kihívásokkal szemben.
          </p>

          <div className="mini-line">
            <span />
          </div>
        </div>

        <div className="intro-visual">
          <div className="intro-grid" />

          <div className="orbit orbit-intro">
            <div className="orbit-track" />
            <div className="orbit-dot" />
          </div>

          <div className="blue-pulse pulse-one" />
          <div className="blue-pulse pulse-two" />
        </div>
      </section>

      {/* =========================
          NEWS
      ========================= */}

      <section id="hirek" className="news-section section">
        <div className="section-heading">
          <div>
            <div className="section-label">
              02 — AKTUALITÁSOK
            </div>

            <h2>
              Legfrissebb hírek
            </h2>
          </div>

          <div className="heading-line" />
        </div>

        {loadingNews ? (
          <div className="news-empty">
            <span className="news-loading-dot" />

            <span>
              Hírek betöltése...
            </span>
          </div>
        ) : news.length === 0 ? (
          <div className="news-empty">
            <strong>
              Nincs jelenleg közzétett hír.
            </strong>

            <span>
              Az új hírek a Discordon keresztül jelennek meg.
            </span>
          </div>
        ) : (
          <div className="news-grid">
            {news.map((article, index) => (
              <article
                className="news-card"
                key={article.id}
              >
                {article.image && (
                  <div className="news-image-wrapper">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="news-image"
                    />
                  </div>
                )}

                <div className="news-card-top">
                  <span className="news-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="news-date">
                    {formatDate(article.createdAt)}
                  </span>
                </div>

                <div>
                  <h3>
                    {article.title}
                  </h3>

                  <p>
                    {article.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer>
        <strong>
          MAGYAR HONVÉDSÉG
        </strong>

        <span>
          Kiképzési Parancsnokság
        </span>
      </footer>
    </main>
  );
}