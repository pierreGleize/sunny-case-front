import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/home/Review.module.css";

const Review = () => {
  let stars = [];

  for (let i = 0; i < 5; i++) {
    let iconStyle = i < 4 ? { color: "#00b67a" } : { color: "grey" };

    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={iconStyle} />);
  }

  return (
    <div className={styles.container}>
      <img src="/rating.avif" alt="Girls with phone" className={styles.image} />
      <p className={styles.text}>
        « La meilleure coque de téléphone ! La qualité est exceptionnelle et les
        designs sont magnifiques. Je recommande ! »
      </p>
      <div className={styles.containerStars}>
        {stars}
        <p className={styles.notes}>4/5 sur + de 15 000 avis</p>
      </div>
    </div>
  );
};

export default Review;
