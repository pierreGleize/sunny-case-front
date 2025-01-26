import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import styles from "../../styles/commun/ModalMenu.module.css";
import categories from "../../utils/category";
import ModalCategory from "./ModalCategory";

const ModalMenu = ({ closeModalMenu }) => {
  // const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // Vérifie si le clic est en dehors de la modal
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       closeModalMenu();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [closeModalMenu]);

  const categorie = categories.map(({ name, src }) => (
    <ModalCategory name={name} src={src[0]} closeModalMenu={closeModalMenu} />
  ));

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalOverlay} onClick={closeModalMenu}></div>
      <div
        className={styles.modalContainer}
        //  ref={modalRef}
      >
        <div className={styles.modal}>
          <div className={styles.closeModal}>
            <FontAwesomeIcon
              icon={faXmark}
              className={styles.icon}
              onClick={() => closeModalMenu()}
            />
          </div>

          <ul className={styles.navbar}>{categorie}</ul>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ModalMenu;
