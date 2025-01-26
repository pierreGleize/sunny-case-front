import React from "react";
import styles from "../../styles/account/MyOrders.module.css";
import { useSelector } from "react-redux";
import ArticleModal from "../commun/ArticleModal";
import moment from "moment";
import { Button, Popover } from "antd";

const MyOrders = () => {
  const orderHistory = useSelector((state) => state.orderHistory.value);
  return (
    <div className={styles.container}>
      <h1>Historique de mes commandes</h1>
      <div className={styles.ordersContainer}>
        {orderHistory.length === 0 && (
          <span>Vous avez aucune commande pour le moment</span>
        )}
        {orderHistory.length > 0 &&
          [...orderHistory]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((order) => {
              const date = order.date;
              const total = order.total;
              const payment = order.payment;
              const id = order.orderNumber;
              const username =
                order.user.address.firstname +
                " " +
                order.user.address.lastname;
              const content = (
                <div className={styles.popHoverContent}>
                  <span>{order.user.address.address}</span>
                  <span>{order.user.address.postalCode}</span>
                  <span>{order.user.address.city}</span>
                  <span>{order.user.address.phoneNumber}</span>
                </div>
              );
              return (
                <div className={styles.order} key={order._id}>
                  <div className={styles.orderDetails}>
                    <div>
                      <p>
                        <span className={styles.bold}>
                          Commande effectué le :{" "}
                        </span>{" "}
                        {moment(date).format("DD MMMM YYYY")}
                      </p>
                      <p>
                        <span className={styles.bold}>N° de commande : </span>
                        {id}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className={styles.bold}>
                          Moyen de paiement :{" "}
                        </span>
                        {payment}
                      </p>
                      <p>
                        <span className={styles.bold}>Livraison à : </span>
                        <span style={{ color: "blue" }}>
                          <Popover
                            content={content}
                            title="Votre adresse de livraison"
                            placement="bottom"
                          >
                            <Button>{username}</Button>
                          </Popover>
                        </span>
                      </p>
                    </div>
                  </div>
                  {order.cart.map((cartArticles) => {
                    const quantity = cartArticles.quantity;
                    return (
                      <div
                        key={cartArticles.article._id}
                        className={styles.article}
                      >
                        <ArticleModal
                          name={cartArticles.article.name}
                          product={cartArticles.article.product}
                          price={cartArticles.article.price}
                          images={cartArticles.article.images}
                          quantity={quantity}
                          _id={cartArticles.article._id}
                          isPayment={true}
                          isHistory={true}
                        />
                      </div>
                    );
                  })}
                  <p>
                    <span className={styles.bold}>Total : </span>
                    {total} €
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default MyOrders;
