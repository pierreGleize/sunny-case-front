import React, { useState, useEffect } from "react";
import CoreBenefits from "../components/commun/CoreBenefits";
import FollowInsta from "../components/commun/FollowInsta";
import GallerySlider from "../components/commun/GallerySlider";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import MyOrders from "../components/account/MyOrders";
import styles from "../styles/account/Account.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../components/account/Profile";
import { logout } from "../reducers/user";
import { clearCart } from "../reducers/cart";
import { clearOrders } from "../reducers/orderHistory";

const account = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("orders");
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.email && !user.token) {
      router.push("/connection");
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearOrders());
    router.push("/connection");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return <MyOrders />;
      case "profile":
        return <Profile />;
      default:
        return router.push("/connection");
    }
  };
  return (
    <>
      <Header />
      <nav className={styles.navbar}>
        <a
          onClick={() => setActiveSection("orders")}
          style={
            activeSection === "orders" ? { textDecoration: "underline" } : null
          }
        >
          Mes commandes
        </a>
        <a
          onClick={() => setActiveSection("profile")}
          style={
            activeSection === "profile" ? { textDecoration: "underline" } : null
          }
        >
          Mon profil
        </a>
        <a onClick={handleLogout}>Se déconnecter</a>
      </nav>
      <div>{renderSection()}</div>
      <CoreBenefits />
      <FollowInsta />
      <GallerySlider />
      <Footer />
    </>
  );
};

export default account;
