import React, { useEffect } from "react";
import styles from "../../styles/checkouts/Cart.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import ArticleModal from "../commun/ArticleModal";

const Cart = ({ shipping, calculateTheTotal, total, isFreeDelevery }) => {
  const cart = useSelector((state) => state.cart.value);

  const deliveryCosts = {
    standard: isFreeDelevery ? 0 : 5.95,
    prioritaire: 9.95,
    express: 14.95,
  };

  const shippingSelect = deliveryCosts[shipping];

  const totalArticles = cart.articles
    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    .toFixed(2);

  const freeDelivery = (70 - Number(totalArticles)).toFixed(2);

  useEffect(() => {
    calculateTheTotal(totalArticles, shippingSelect);
  }, [shippingSelect, totalArticles]);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.delevery}>
        <FontAwesomeIcon icon={faTruck} />
        {Number(totalArticles) <= 70
          ? `Vous êtes à ${freeDelivery} € de la livraison gratuite !`
          : "Félicitations! Vous avez déverrouillé la livraison gratuite!"}
      </div>
      <div className={styles.articlesList}>
        {cart.articles.length > 0 &&
          cart.articles.map((props) => (
            <ArticleModal key={props._id} {...props} isPayment={true} />
          ))}
      </div>
      <div className={styles.priceDetails}>
        <h5>Sous-total</h5>
        <h5>{totalArticles} €</h5>
      </div>
      <div className={styles.priceDetails}>
        <h5>Expédition</h5>
        <h5>{shippingSelect} €</h5>
      </div>
      <div className={styles.priceDetails}>
        <h3>Total</h3>
        <h3>{total} €</h3>
      </div>
    </div>
  );
};

export default Cart;
