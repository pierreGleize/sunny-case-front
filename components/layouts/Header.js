import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faBagShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/layouts/Header.module.css";
import ModalMenu from "../commun/ModalMenu";
import categories from "../../utils/category";
import Link from "next/link";
import { openCartModal } from "../../reducers/cart";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);

  const cart = useSelector((state) => state.cart.value);

  console.log(cart);

  const totalArticles = cart.articles.reduce(
    (acc, curr) => acc + Number(curr.quantity),
    0
  );

  const dispatch = useDispatch();

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

  const closeModalMenu = () => setShowModalMenu(false);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.messageBar}>
        Livraison gratuite à partir de 70 €
      </div>
      <div className={styles.headerWrap}>
        <div className={styles.titleContainer}>
          <div>
            {isMobile && (
              <FontAwesomeIcon
                aria-label="Ouvrir une modale pour sélectionner une catégorie d'article"
                icon={faBars}
                style={{ color: "#000000" }}
                className={styles.icon}
                onClick={() => setShowModalMenu(true)}
              />
            )}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#000000" }}
              className={styles.icon}
            />
          </div>
          <Link href={"/"}>
            <a aria-label="Redirection vers la page d'accueil">
              <h1>Sunny Case</h1>
            </a>
          </Link>
          <div className={styles.iconRight}>
            <Link href={"/connection"}>
              <a aria-label="Pour se connecter / Créer un compte">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ color: "#000000" }}
                  className={styles.icon}
                />
              </a>
            </Link>

            <div
              onClick={() => dispatch(openCartModal())}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                aria-label="Ouvrir le panier"
                icon={faBagShopping}
                className={styles.icon}
                style={
                  cart.articles.length > 0
                    ? { color: "green", marginRight: "5px" }
                    : { color: "black", marginRight: "5px" }
                }
              />
              {cart.articles.length > 0 ? (
                <span className={styles.articlesCount}>{totalArticles}</span>
              ) : null}
            </div>
          </div>
        </div>
        {!isMobile && (
          <ul className={styles.navbar}>
            {categories.map((element, i) => (
              <Link
                href={{
                  pathname: "/collections",
                  query: { category: element.name.toLowerCase() },
                }}
                key={i}
              >
                <a aria-label="Voir les articles">
                  <li className={styles.navbarItem}>{element.name}</li>
                </a>
              </Link>
            ))}
          </ul>
        )}
      </div>
      {showModalMenu && showModalMenu && (
        <ModalMenu closeModalMenu={closeModalMenu} />
      )}
    </div>
  );
};

export default Header;
