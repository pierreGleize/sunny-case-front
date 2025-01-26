import React from "react";
import styles from "../../styles/commun/FollowInsta.module.css";

const FollowInsta = () => {
  return (
    <div className={styles.container}>
      <img src="/insta-logo.svg" alt="instagram logo" className={styles.logo} />
      <p className={styles.text}>
        Rejoingez <span style={{ fontWeight: 600 }}>+ de 920K</span> abonnés en
        suivant <span style={{ fontWeight: 600 }}>@burgaofficiel</span>
      </p>
    </div>
  );
};

export default FollowInsta;
