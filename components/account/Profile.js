import React, { useState } from "react";
import styles from "../../styles/account/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "../../reducers/user";

const Profile = () => {
  const user = useSelector((state) => state.user.value);

  const [isEditable, setIsEditable] = useState(false);
  const [firstname, setFirstName] = useState(user.address?.firstname || "");
  const [lastname, setLastname] = useState(user.address?.lastname || "");
  const [address, setAddress] = useState(user.address?.address || "");
  const [postalCode, setPostalCode] = useState(user.address?.postalCode || "");
  const [city, setCity] = useState(user.address?.city || "");
  const [phoneNumber, setPhoneNumber] = useState(
    user.address?.phoneNumber || ""
  );
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleUpdateAddress = async () => {
    if (
      !firstname ||
      !lastname ||
      !address ||
      !postalCode ||
      !city ||
      !phoneNumber
    ) {
      setError(true);
      setErrorMessage("Tous les champs doivent être remplis");
      return;
    }
    try {
      setError(false);

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
        setError(true);
        setErrorMessage(error.message);
      }

      if (data.result) {
        setIsEditable(false);
        dispatch(addAddress(data.newAddress));
      }
    } catch (error) {
      setError(true);
      setErrorMessage(
        `Une erreur est survenue lors de la mise à jour de votre adresse. ${error.message}`
      );
    }
  };
  return (
    <div className={styles.container}>
      <h1>Adresse enregistrée</h1>
      <div className={styles.addressContainer}>
        <div className={styles.edit} onClick={() => setIsEditable(!isEditable)}>
          <FontAwesomeIcon
            icon={faPen}
            style={isEditable ? { color: "green" } : { color: "black" }}
          />
          Edit profile
        </div>
        <input
          type="text"
          className={styles.input}
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={!isEditable}
          style={
            !isEditable
              ? { backgroundColor: "transparent", border: "none" }
              : null
          }
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Nom"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          disabled={!isEditable}
          style={
            !isEditable
              ? { backgroundColor: "transparent", border: "none" }
              : null
          }
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Adresse"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          disabled={!isEditable}
          style={
            !isEditable
              ? { backgroundColor: "transparent", border: "none" }
              : null
          }
        />
        <input
          type="number"
          className={styles.input}
          placeholder="Code Postale"
          onChange={(e) => setPostalCode(e.target.value)}
          value={postalCode}
          disabled={!isEditable}
          style={
            !isEditable
              ? { backgroundColor: "transparent", border: "none" }
              : null
          }
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Ville"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          disabled={!isEditable}
          style={
            !isEditable
              ? { backgroundColor: "transparent", border: "none" }
              : null
          }
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Numéro de téléphone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          disabled={!isEditable}
          style={
            !isEditable
              ? { backgroundColor: "transparent", border: "none" }
              : null
          }
        />
        {error && <span className="error-message">{errorMessage}</span>}

        {isEditable && (
          <button className={styles.btnUpdate} onClick={handleUpdateAddress}>
            MODIFIER MON ADRESSE
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
