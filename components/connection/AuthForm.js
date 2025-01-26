import React, { useState } from "react";
import styles from "../../styles/connection/AuthForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/user";
import { useRouter } from "next/router";
import { addAllOrders } from "../../reducers/orderHistory";

const AuthForm = () => {
  const router = useRouter();
  const { from } = router.query;
  const [emailSignin, setEmailSignin] = useState("");
  const [passwordSignin, setPasswordSignin] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [validPasswordignup, setValidPasswordSignup] = useState("");
  const [errorSignin, setErrorSignin] = useState(false);
  const [errorSignup, setErrorSignup] = useState(false);
  const [errorMessageSignin, setErrorMessageSignin] = useState("");
  const [errorMessageSignup, setErrorMessageSignup] = useState("");

  const dispatch = useDispatch();

  const handleSignin = async () => {
    if (emailSignin.length === 0 || passwordSignin.length === 0) {
      setErrorSignin(true);
      setErrorMessageSignin("Tous les champs sont requis.");
      return;
    }
    if (!validateEmail(emailSignin)) {
      setErrorSignin(true);
      setErrorMessageSignin("Votre email est n'est pas au bon format");
      emptyLoginFields();
      return;
    }
    try {
      setErrorSignin(false);

      const response = await fetch(
        "https://sunny-case-back.vercel.app/users/signin/",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: emailSignin,
            password: passwordSignin,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorSignin(true);
        setErrorMessageSignin(data.message || "Une erreur est survenue.");
        emptyLoginFields();
        return;
      }

      if (data.result) {
        emptyLoginFields();
        dispatch(
          login({
            email: data.user.email,
            token: data.user.token,
            address: data.user.address,
          })
        );
        dispatch(addAllOrders(data.orderHistory));
        if (from === "checkouts") {
          router.back();
        } else {
          router.push("/account");
        }
      }
    } catch (error) {
      setErrorSignin(true);
      setErrorMessageSignin(
        `Un problème est survenue lors votre tentative de connexion. Veuillez réessayer plus tard. ${error.message}`
      );
      emptyLoginFields();
    }
  };

  const handleSignup = async () => {
    if (emailSignup.length === 0 || passwordSignup.length === 0) {
      setErrorSignup(true);
      setErrorMessageSignup("Tous les champs sont requis.");
      return;
    }
    if (!validateEmail(emailSignup)) {
      emptyRegistrationFields();
      setErrorSignup(true);
      setErrorMessageSignup("Votre email est n'est pas au bon format");
      return;
    }
    if (passwordSignup !== validPasswordignup) {
      setErrorSignup(true);
      setPasswordSignup("");
      setValidPasswordSignup("");
      setErrorMessageSignup("Vos mots de passe doivent être identiques.");
      return;
    }
    try {
      setErrorSignup(false);

      const response = await fetch(
        "https://sunny-case-back.vercel.app/users/signup/",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: emailSignup,
            password: passwordSignup,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorSignup(true);
        setErrorMessageSignup(data.message || "Une erreur est survenue.");
        return;
      }

      if (data.result) {
        emptyRegistrationFields();
        dispatch(
          login({
            email: data.user.email,
            token: data.user.token,
          })
        );
        if (from === "checkouts") {
          router.back();
        } else {
          router.push("/account");
        }
      }
    } catch (error) {
      emptyRegistrationFields();
      setErrorSignup(true);
      setErrorMessageSignup(
        `Un problème est survenue lors votre tentative de connexion. Veuillez réessayer plus tard. ${error.message}`
      );
    }
  };

  function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  const emptyLoginFields = () => {
    setEmailSignin("");
    setPasswordSignin("");
  };

  const emptyRegistrationFields = () => {
    setEmailSignup("");
    setValidPasswordSignup("");
    setPasswordSignup("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.signin}>
        <h2 className={styles.title}>Déjà Client ?</h2>
        <label className={styles.label}>
          E-mail :
          <input
            type="email"
            value={emailSignin}
            placeholder="email"
            className={styles.input}
            onChange={(e) => setEmailSignin(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Mot de passe :
          <input
            type="password"
            value={passwordSignin}
            placeholder="Mot de passe"
            className={styles.input}
            onChange={(e) => setPasswordSignin(e.target.value)}
          />
        </label>
        {errorSignin && <span>{errorMessageSignin}</span>}
        <button className={styles.btnSubmit} onClick={handleSignin}>
          Je me connecte
        </button>
      </div>
      <div className={styles.signup}>
        <h2 className={styles.title}>Nouveau client ?</h2>
        <label className={styles.label}>
          E-mail :
          <input
            type="email"
            value={emailSignup}
            placeholder="email"
            className={styles.input}
            onChange={(e) => setEmailSignup(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Mot de passe :
          <input
            type="password"
            value={passwordSignup}
            placeholder="Mot de passe"
            className={styles.input}
            onChange={(e) => setPasswordSignup(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Confirmez le mot de passe :
          <input
            type="password"
            value={validPasswordignup}
            placeholder="Confirmez le mot de passe"
            className={styles.input}
            onChange={(e) => setValidPasswordSignup(e.target.value)}
          />
        </label>
        {errorSignup && <span>{errorMessageSignup}</span>}
        <button className={styles.btnSubmit} onClick={handleSignup}>
          Je crée un compte
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
