import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const ModalCategory = ({ name, src, closeModalMenu }) => {
  return (
    <Link href={{ pathname: "/collections", query: { category: name } }}>
      <a style={{ width: "100%" }} onClick={() => closeModalMenu()}>
        <li
          style={{
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            cursor: "pointer",
            color: "black",
          }}
        >
          <Image
            src={src}
            width={80}
            height={80}
            alt={name}
            style={{ borderRadius: "50%" }}
          />
          <p style={{ textAlign: "center", fontSize: 14 }}>{name}</p>

          <FontAwesomeIcon icon={faChevronRight} style={{ color: "#000000" }} />
        </li>
      </a>
    </Link>
  );
};

export default ModalCategory;
