import React, { useState, useEffect } from "react";
import styles from "../../styles/checkouts/Address.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "../../reducers/user";
import { clearCart } from "../../reducers/cart";
import { addAnOrder } from "../../reducers/orderHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

const Address = ({ handleRadioChange, shipping, total, isFreeDelevery }) => {
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  const router = useRouter();

  const [firstname, setFirstName] = useState(user.address?.firstname || "");
  const [lastname, setLastname] = useState(user.address?.lastname || "");
  const [address, setAddress] = useState(user.address?.address || "");
  const [postalCode, setPostalCode] = useState(user.address?.postalCode || "");
  const [city, setCity] = useState(user.address?.city || "");
  const [phoneNumber, setPhoneNumber] = useState(
    user.address?.phoneNumber || ""
  );
  const [creditCard, setCreditCard] = useState(true);
  const [payPal, setPaypal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.articles.length === 0) {
      router.push("/");
    }
  }, []);

  const handleCheckRadioPayment = (value) => {
    if (value === "card") {
      setCreditCard(true);
      setPaypal(false);
    } else {
      setCreditCard(false);
      setPaypal(true);
    }
  };

  const handlePay = async () => {
    try {
      await addAddressToUser();
      await addCartToHistory();
      router.push("/account");
    } catch (error) {
      console.log(error.message);
      setError(true);
      setErrorMessage(error.message);
    }
  };

  const addAddressToUser = async () => {
    try {
      if (!user.token) {
        throw new Error("Vous devez être connecté pour passer au paiement");
      }
      if (
        !firstname ||
        !lastname ||
        !address ||
        !postalCode ||
        !city ||
        !phoneNumber
      ) {
        throw new Error("Tous les champs requis doivent être remplis");
      }

      const response = await fetch(
        "https://sunny-case-back.vercel.app/users/address",
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            address,
            postalCode,
            city,
            phoneNumber,
            token: user.token,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      if (data.result) {
        dispatch(addAddress(data.newAddress));
        dispatch(clearCart());
        console.log(data);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      throw error;
    }
  };

  const addCartToHistory = async () => {
    try {
      if (cart.articles.length === 0) {
        throw new Error(
          "Vous ne pouvez pas passer au paiement si votre panier est vide."
        );
      }

      const payment = creditCard ? "Carte de crédit" : "PayPal";

      const formattedCart = cart.articles.map((element) => {
        return { article: element._id, quantity: Number(element.quantity) };
      });

      const newOrder = {
        payment,
        token: user.token,
        shipping,
        total,
        cart: formattedCart,
      };

      const response = await fetch(
        "https://sunny-case-back.vercel.app/orderHistories/addOrder",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newOrder),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      if (data.result) {
        dispatch(addAnOrder(data.order));
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      throw error;
    }
  };

  return (
    <div className={styles.adressContainer}>
      {!user.token && !user.email ? (
        <div className={styles.infoContainer}>
          <h3 className={styles.title}>
            Connectez vous pour poursuivre vos achats
          </h3>
          <Link
            href={{ pathname: "/connection", query: { from: "checkouts" } }}
          >
            <a className={styles.link}>Ouvrir une session</a>
          </Link>
        </div>
      ) : (
        <div className={styles.infoContainer}>
          <h3>Contact</h3>
          <p>{user.email}</p>
          <Link
            href={{ pathname: "/connection", query: { from: "checkouts" } }}
          >
            <a className={styles.link}>Changer de compte</a>
          </Link>
        </div>
      )}

      <div className={styles.infoContainer}>
        <h3 className={styles.title}>Livraison</h3>
        <input
          type="text"
          className={styles.input}
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Nom"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Adresse"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <input
          type="number"
          className={styles.input}
          placeholder="Code Postale"
          onChange={(e) => setPostalCode(e.target.value)}
          value={postalCode}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Ville"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Numéro de téléphone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
      </div>
      <div className={styles.inputRadioContainer}>
        <h3 className={styles.title} style={{ marginBottom: "1rem" }}>
          Mode d'expédition
        </h3>
        <div
          className={styles.inputRadio}
          onClick={() => handleRadioChange("standard")}
          style={
            shipping === "standard"
              ? { borderColor: "blue", backgroundColor: "#F0F5FF" }
              : { borderColor: "grey" }
          }
        >
          <div className={styles.inputRadioWrap}>
            <div style={{ display: "flex" }}>
              <input
                type="radio"
                name="shippingMode"
                value="standard"
                checked={"standard" === shipping}
                onChange={() => handleRadioChange("standard")}
              />
              <p>Livraison standard</p>
            </div>

            <h4>{isFreeDelevery ? "Gratuit" : "5.95 €"}</h4>
          </div>
          <div>
            <span>3-9 jours ouvrables après expédition</span>
          </div>
        </div>
        <div
          className={styles.inputRadio}
          onClick={() => handleRadioChange("prioritaire")}
          style={
            shipping === "prioritaire"
              ? { borderColor: "blue", backgroundColor: "#F0F5FF" }
              : { borderColor: "grey" }
          }
        >
          <div className={styles.inputRadioWrap}>
            <div style={{ display: "flex" }}>
              <input
                type="radio"
                name="shippingMode"
                value="prioritaire"
                checked={"prioritaire" === shipping}
                onChange={() => handleRadioChange("prioritaire")}
              />
              <p>Livraison prioritaire</p>
            </div>

            <h4>9,95 €</h4>
          </div>
          <div>
            <span>3-5 jours ouvrables après expépidition</span>
          </div>
        </div>
        <div
          className={styles.inputRadio}
          onClick={() => handleRadioChange("express")}
          style={
            shipping === "express"
              ? { borderColor: "blue", backgroundColor: "#F0F5FF" }
              : { borderColor: "grey" }
          }
        >
          <div className={styles.inputRadioWrap}>
            <div style={{ display: "flex" }}>
              <input
                type="radio"
                name="shippingMode"
                value="express"
                checked={"express" === shipping}
                onChange={() => handleRadioChange("express")}
              />
              <p>Livraison express</p>
            </div>

            <h4>14,95 €</h4>
          </div>
          <div>
            <span>1-2 jours ouvrables après expépidition</span>
          </div>
        </div>
      </div>
      <div className={styles.inputRadioContainer}>
        <div className={styles.infoContainer}>
          <h3 className={styles.title}>Paiement</h3>
        </div>
        <div
          className={styles.inputRadio}
          onClick={() => handleCheckRadioPayment("card")}
          style={
            creditCard
              ? { borderColor: "blue", backgroundColor: "#F0F5FF" }
              : { borderColor: "grey" }
          }
        >
          <div className={styles.inputRadioWrap} style={{ margin: 0 }}>
            <div style={{ display: "flex" }}>
              <input
                type="radio"
                name="payment"
                value={creditCard}
                checked={creditCard}
                onChange={() => handleCheckRadioPayment("card")}
              />
              <p>Carte de crédit</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faCcVisa}
                className={styles.creditCardIcon}
              />
              <FontAwesomeIcon
                icon={faCcMastercard}
                className={styles.creditCardIcon}
              />
            </div>
          </div>
        </div>
        <div
          className={styles.inputRadio}
          onClick={() => handleCheckRadioPayment("payPal")}
          style={
            payPal
              ? { borderColor: "blue", backgroundColor: "#F0F5FF" }
              : { borderColor: "grey" }
          }
        >
          <div className={styles.inputRadioWrap} style={{ margin: 0 }}>
            <div style={{ display: "flex" }}>
              <input
                type="radio"
                name="payment"
                value={payPal}
                checked={payPal}
                onChange={() => handleCheckRadioPayment("payPal")}
              />
              <p>PayPal</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faCcPaypal}
                className={styles.creditCardIcon}
              />
            </div>
          </div>
        </div>
      </div>

      <p className={styles.generalCondition}>
        En cliquant sur le bouton "passer la commande", vous confirmez que vous
        avez lu, compris et accepté nos{" "}
        <span style={{ fontWeight: "bold" }}>Conditions Générales</span>.
      </p>
      {error && <span className="error-message">{errorMessage}</span>}
      <button className={styles.btnPayment} onClick={handlePay}>
        Payer maintenant
      </button>
    </div>
  );
};

export default Address;
