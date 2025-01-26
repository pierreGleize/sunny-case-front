import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  removeOneItem,
  closeCartModal,
} from "../../reducers/cart";
import styles from "../../styles/commun/ArticleModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ArticleModal = ({
  name,
  product,
  category,
  price,
  images,
  description,
  _id,
  isPayment,
  isHistory,
  quantity,
}) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.value);

  const article = cart.articles.find((element) => element._id === _id);

  const closeModal = () => {
    dispatch(closeCartModal());
  };

  return (
    <div className={styles.container} style={isPayment ? { padding: 0 } : null}>
      <div className={styles.leftContainer}>
        <Link href={{ pathname: "products", query: { articleID: _id } }}>
          <a onClick={closeModal} style={{ position: "relative" }}>
            <img src={images[0]} alt={name} className={styles.image} />
            {isPayment && !isHistory ? (
              <span className={styles.quantityPayment}>{article.quantity}</span>
            ) : (
              isHistory && (
                <span className={styles.quantityPayment}>{quantity}</span>
              )
            )}
          </a>
        </Link>

        <div className={styles.textContainer}>
          <Link href={{ pathname: "products", query: { articleID: _id } }}>
            <a onClick={closeModal}>
              <h3>{name}</h3>
              <p>{product}</p>
              {!isPayment && !isHistory && (
                <h4>
                  {(Number(price) * Number(article.quantity)).toFixed(2)} €
                </h4>
              )}
              {isPayment && isHistory && (
                <h4 style={{ fontWeight: "500" }}>
                  {(Number(price) * Number(quantity)).toFixed(2)} €
                </h4>
              )}
            </a>
          </Link>

          {!isPayment && (
            <div className={styles.inputContainer}>
              <FontAwesomeIcon
                icon={faMinus}
                className={styles.icon}
                onClick={() => dispatch(removeOneItem(_id))}
              />
              <span>{article.quantity}</span>
              <FontAwesomeIcon
                icon={faPlus}
                className={styles.icon}
                onClick={() =>
                  dispatch(
                    addItem({
                      name,
                      product,
                      category,
                      price,
                      images,
                      description,
                      _id,
                    })
                  )
                }
              />
            </div>
          )}
        </div>
      </div>

      <div>
        {!isPayment && !isHistory && (
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.closeIcon}
            onClick={() => dispatch(removeItem(_id))}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
        )}
        {isPayment && !isHistory && (
          <h4 style={{ fontWeight: "500" }}>
            {(Number(price) * Number(article.quantity)).toFixed(2)} €
          </h4>
        )}
        {/* {isPayment && isHistory && (
          <h4 style={{ fontWeight: "500" }}>
            {(Number(price) * Number(quantity)).toFixed(2)} €
          </h4>
        )} */}
      </div>
    </div>
  );
};

export default ArticleModal;
