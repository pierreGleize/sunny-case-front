import React from "react";
import styles from "../../styles/commun/ArticleCollections.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openCartModal, addItem } from "../../reducers/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ArticleCollections = ({
  name,
  product,
  category,
  price,
  images,
  description,
  _id,
}) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.value);

  const isArticleInCart = cart.articles.some((element) => element._id === _id);

  const addArticlesandOpenModal = () => {
    dispatch(openCartModal());
    dispatch(
      addItem({ name, product, category, price, images, description, _id })
    );
  };
  return (
    <div className={styles.container}>
      <Link href={{ pathname: "products", query: { articleID: _id } }}>
        <a>
          <img src={images[0]} alt={name} className={styles.image} />
          <h3>{name}</h3>
          <span>{product}</span>
        </a>
      </Link>
      <div className={styles.priceContainer}>
        <h3>{price} €</h3>

        {isArticleInCart ? (
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "#009758", fontSize: 25 }}
            className={styles.bagCheck}
            onClick={addArticlesandOpenModal}
          />
        ) : (
          <img
            src="/bag-plus.png"
            alt="Bag"
            className={styles.bagCheck}
            onClick={addArticlesandOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleCollections;
