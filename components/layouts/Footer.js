import React, { useState, useEffect } from "react";
import styles from "../../styles/layouts/Footer.module.css";
import categories from "../../utils/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 790) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.container}>
      {isMobile && (
        <div className={styles.titleContainerMobile}>
          <h2>Sunny Case</h2>
        </div>
      )}
      <div className={styles.wrapper}>
        {!isMobile && (
          <div className={styles.titleContainer}>
            <h2>Sunny Case</h2>
          </div>
        )}

        <div className={styles.products}>
          <h3>Produits</h3>
          <ul className={styles.productList}>
            {categories.map((category, i) => (
              <Link
                key={i}
                href={{
                  pathname: "/collections",
                  query: { category: category.name },
                }}
              >
                <a>
                  <li className={styles.category}>{category.name}</li>
                </a>
              </Link>
            ))}
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <h3>Médias Sociaux</h3>
          <Link href={"https://www.instagram.com/burgaofficial/"}>
            <a target="_blank" rel="noopener noreferrer">
              <div className={styles.media}>
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ color: "#000000" }}
                />
                <p>Insta</p>
                <span>(920 K)</span>
              </div>
            </a>
          </Link>
          <Link href={"https://www.facebook.com/BurgaOfficial/"}>
            <a target="_blank" rel="noopener noreferrer">
              <div className={styles.media}>
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ color: "#000000" }}
                />
                <p>Facebook</p>
                <span>(200 K)</span>
              </div>
            </a>
          </Link>
          <Link href={"https://www.tiktok.com/@burgaofficial"}>
            <a target="_blank" rel="noopener noreferrer">
              <div className={styles.media}>
                <FontAwesomeIcon
                  icon={faYoutube}
                  style={{ color: "#000000" }}
                />
                <p>TikTok</p>
                <span>(325 K)</span>
              </div>
            </a>
          </Link>
          <Link
            href={
              "https://consent.youtube.com/m?continue=https%3A%2F%2Fwww.youtube.com%2F%40burgaofficial%3Fcbrd%3D1&gl=FR&m=0&pc=yt&cm=2&hl=fr&src=1"
            }
          >
            <a target="_blank" rel="noopener noreferrer">
              <div className={styles.media}>
                <FontAwesomeIcon icon={faTiktok} style={{ color: "#000000" }} />
                <p>Youtube</p>
                <span>(2 M)</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.legalNotices}>
        <p>
          © 2025 Sunny Case - Pierre Gleize - Clone de{" "}
          <Link href="https://burga.fr/">
            <a target="_blank" rel="noopener noreferrer">
              Burga
            </a>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
