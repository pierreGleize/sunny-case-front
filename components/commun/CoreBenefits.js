import React from "react";
import styles from "../../styles/commun/CoreBenefits.module.css";

const CoreBenefits = () => {
  return (
    <div className={styles.container}>
      <div className={styles.coreContainer}>
        <img
          src="/coreBenefits/premium.webp"
          alt="premium"
          className={styles.image}
        />
        <span className={styles.text}>Qualité Premium</span>
      </div>
      <div className={styles.coreContainer}>
        <img
          src="/coreBenefits/plane.webp"
          alt="plane"
          className={styles.image}
        />
        <span className={styles.text}>Qualité Premium</span>
      </div>
      <div className={styles.coreContainer}>
        <img
          src="/coreBenefits/padlock.webp"
          alt="padlock"
          className={styles.image}
        />
        <span className={styles.text}>Qualité Premium</span>
      </div>
      <div className={styles.coreContainer}>
        <img
          src="/coreBenefits/guarentee.webp"
          alt="guarentee"
          className={styles.image}
        />
        <span className={styles.text}>Qualité Premium</span>
      </div>
    </div>
  );
};

export default CoreBenefits;
