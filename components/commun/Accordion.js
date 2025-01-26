import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/commun/Accordion.module.css";

const Accordion = ({ title, content, icon }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.container} onClick={() => setIsActive(!isActive)}>
      <div className={styles.visible}>
        {icon}
        <h4 className={styles.title}>{title}</h4>
        <FontAwesomeIcon
          icon={isActive ? faMinus : faPlus}
          style={{ color: "grey" }}
        />
      </div>
      <div className={`${styles.content} ${isActive ? styles.active : ""}`}>
        <br />
        {content}
      </div>
    </div>
  );
};

export default Accordion;
