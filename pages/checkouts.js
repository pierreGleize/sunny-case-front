import React, { useState } from "react";
import styles from "../styles/checkouts/checkouts.module.css";
import Address from "../components/checkouts/Address";
import Cart from "../components/checkouts/Cart";
import Link from "next/link";

const checkouts = () => {
  const [shipping, setShipping] = useState("standard");
  const [total, setTotal] = useState(0);
  const [isFreeDelevery, setIsFreeDelevery] = useState(false);

  const handleRadioChange = (value) => {
    setShipping(value);
  };

  const calculateTheTotal = (totalArticles, shippingSelect) => {
    setTotal((Number(totalArticles) + Number(shippingSelect)).toFixed(2));

    if (totalArticles >= 70) {
      setIsFreeDelevery(true);
    } else {
      setIsFreeDelevery(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={"/"}>
          <a>
            <h1>Sunny Case</h1>
          </a>
        </Link>
      </div>
      <div className={styles.main}>
        <Address
          handleRadioChange={handleRadioChange}
          shipping={shipping}
          total={total}
          isFreeDelevery={isFreeDelevery}
        />
        <Cart
          shipping={shipping}
          calculateTheTotal={calculateTheTotal}
          total={total}
          isFreeDelevery={isFreeDelevery}
        />
      </div>
    </div>
  );
};

export default checkouts;
