import React from "react";
import categories from "../../utils/category";
import styles from "../../styles/home/ImageGrid.module.css";
import Link from "next/link";
import Image from "next/image";

const ImageGrid = () => {
  const categoriesFiltered = categories.filter(
    (element) => element.name !== "BOUTEILLES ET MUGS"
  );

  const mugImage = categories.find(
    (element) => element.name === "BOUTEILLES ET MUGS"
  );

  return (
    <div className={styles.container}>
      <Link
        href={{
          pathname: "/collections",
          query: { category: "BOUTEILLES ET MUGS" },
        }}
      >
        <a aria-label="Lien interne vers les articles Bouteilles et Mugs">
          <img
            src={mugImage.src[1]}
            alt={mugImage.name}
            className={styles.mugImage}
          />
        </a>
      </Link>

      <div className={styles.gridTop}>
        {categoriesFiltered.slice(0, 2).map((element, i) => (
          <Link
            key={i}
            href={{
              pathname: "/collections",
              query: { category: element.name },
            }}
          >
            <a>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <img
                  src={element.src[1]}
                  alt={element.name}
                  className={styles.imagesTop}
                />
                <div className={styles.selectImage}>
                  <p className={styles.selectText}>{element.name}</p>
                  <button className={styles.selectBtn}>DÉCOUVRIR</button>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className={styles.gridBottom}>
        {categoriesFiltered.slice(2).map((element, i) => (
          <Link
            key={i + 2}
            href={{
              pathname: "/collections",
              query: { category: element.name },
            }}
          >
            <a>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <img
                  src={element.src[1]}
                  alt={element.name}
                  className={styles.imageBottom}
                />
                <div className={styles.selectImage}>
                  <p className={styles.selectText}> {element.name}</p>
                  <button className={styles.selectBtn}>DÉCOUVRIR</button>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
