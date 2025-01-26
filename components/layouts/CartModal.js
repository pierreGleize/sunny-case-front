import React, { useEffect } from "react";
import styles from "../../styles/layouts/CartModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { closeCartModal } from "../../reducers/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faLock } from "@fortawesome/free-solid-svg-icons";
import ArticleModal from "../commun/ArticleModal";
import Link from "next/link";

const CartModal = () => {
  const cart = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [cart.isOpen]);

  const total = cart.articles
    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    .toFixed(2);

  const freeDelivery = (70 - Number(total)).toFixed(2);

  const progressValue = (total / 70) * 100;

  const numberArticles = cart.articles.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  return (
    cart.isOpen && (
      <>
        <div
          className={styles.modalOverlay}
          onClick={() => dispatch(closeCartModal())}
        ></div>
        <div className={styles.modalContainer}>
          <div className={styles.topContainer}>
            <div className={styles.cartHeader}>
              <FontAwesomeIcon
                icon={faXmark}
                className={styles.closeIcon}
                onClick={() => dispatch(closeCartModal())}
                style={{ cursor: "pointer" }}
              />
              <h4>Votre panier</h4>
              <span>
                {numberArticles}{" "}
                {cart.articles.length <= 1 ? "article" : "articles"}
              </span>
            </div>
            <p style={{ textAlign: "center" }}>
              {Number(total) <= 70
                ? `Vous êtes à ${freeDelivery} € de la livraison gratuite !`
                : "Félicitations! Vous avez déverrouillé la livraison gratuite!"}
            </p>
            <progress
              value={progressValue}
              max={100}
              className={styles.progress}
            />
          </div>
          <div className={styles.middleContainer}>
            {cart.articles.length === 0 ? (
              <h3 className={styles.emptyCartMessage}>
                Vous n'avez pas d'articles dans votre panier
              </h3>
            ) : (
              cart.articles.map((props) => (
                <ArticleModal key={props._id} {...props} />
              ))
            )}
          </div>

          {cart.articles.length === 0 ? null : (
            <div className={styles.bottomContainer}>
              <div className={styles.totalContainer}>
                <h4>Sous-Total</h4>
                <h4>{total} €</h4>
              </div>
              <Link href={"/checkouts"}>
                <a onClick={() => dispatch(closeCartModal())}>
                  <button className={styles.btn}>
                    <FontAwesomeIcon
                      icon={faLock}
                      style={{ marginRight: "10px" }}
                    />
                    PASSER COMMANDE
                  </button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default CartModal;
