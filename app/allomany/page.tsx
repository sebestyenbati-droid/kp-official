"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./allomany.css";

type Member = {
  userId: number;
  username: string;
  displayName?: string;
  role: string;
  image: string;
};

export default function Allomany() {
  const [darkMode, setDarkMode] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    async function loadMembers() {
      try {
        const response = await fetch("/api/allomany", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            "Nem sikerült betölteni az állományt."
          );
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setMembers(data);
        }
      } catch (error) {
        console.error(
          "Állomány betöltési hiba:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadMembers();
  }, []);

  return (
    <main
      className={
        darkMode
          ? "allomany-page dark-mode"
          : "allomany-page"
      }
    >
      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">
        <Link href="/" className="brand">
          <div className="brand-mark">
            KP
          </div>

          <div className="brand-text">
            <strong>KIKÉPZÉSI</strong>
            <span>PARANCSNOKSÁG</span>
          </div>
        </Link>

        <nav className="navigation">
          <Link href="/">
            Kezdőlap
          </Link>

          <Link
            href="/allomany"
            className="active"
          >
            Állomány
          </Link>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-button"
            aria-label="Téma váltása"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? "☀" : "☾"}
          </button>
        </div>
      </header>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero allomany-hero">
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
            Állomány
          </h1>

          <p>
            A Kiképzési Parancsnokság jelenlegi személyi
            állományának nyilvántartása.
          </p>
        </div>
      </section>

      {/* =========================
          ÁLLOMÁNY
      ========================= */}

      <section className="section allomany-section">
        <div className="section-heading">
          <div>
            <div className="section-label">
              KIKÉPZÉSI PARANCSNOKSÁG
            </div>

            <h2>
              Állományi tagok
            </h2>
          </div>

          <div className="heading-line" />
        </div>

        {loading ? (
          <div className="news-empty">
            <span className="news-loading-dot" />

            <span>
              Állomány betöltése...
            </span>
          </div>
        ) : members.length === 0 ? (
          <div className="news-empty">
            <strong>
              Nincs jelenleg megjeleníthető állomány.
            </strong>

            <span>
              Az állomány adatai jelenleg nem érhetők el.
            </span>
          </div>
        ) : (
          <div className="members-grid">
            {members.map((member) => (
              <article
                className="member-card"
                key={member.userId}
              >
                {member.image && (
                  <div className="member-image-wrapper">
                    <img
                      src={member.image}
                      alt={`${member.username} Roblox karaktere`}
                      className="member-image"
                    />
                  </div>
                )}

                <div className="member-card-top">
                  <div className="member-status-area">
                    <span className="member-role-badge">
                      {member.role}
                    </span>

                    <span className="member-status">
                      AKTÍV
                    </span>
                  </div>
                </div>

                <div className="member-information">
                  <h3>
                    {member.username}
                  </h3>

                  {member.displayName &&
                    member.displayName !== member.username && (
                      <span className="member-display-name">
                        {member.displayName}
                      </span>
                    )}

                  <div className="member-user-id">
                    USER ID&nbsp;&nbsp;
                    <strong>
                      {member.userId}
                    </strong>
                  </div>
                </div>

                <div className="member-orbit">
                  <div className="member-orbit-track" />
                  <div className="member-orbit-dot" />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================
          ALSÓ GRID
      ========================= */}

      <section className="allomany-grid-section">
        <div className="allomany-large-grid" />

        <div className="allomany-large-orbit allomany-orbit-left">
          <div className="allomany-large-orbit-track" />
          <div className="allomany-large-orbit-dot" />
        </div>

        <div className="allomany-large-orbit allomany-orbit-right">
          <div className="allomany-large-orbit-track" />
          <div className="allomany-large-orbit-dot" />
        </div>

        <div className="allomany-grid-content">
          <div className="section-label">
            SZEMÉLYI ÁLLOMÁNY
          </div>

          <h2>
            Együtt.
            <br />
            Felkészülten.
          </h2>

          <p>
            A Kiképzési Parancsnokság személyi állománya
            közösen dolgozik a kiképzési feladatok
            végrehajtásán és a Honvédség felkészítésén.
          </p>
        </div>
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