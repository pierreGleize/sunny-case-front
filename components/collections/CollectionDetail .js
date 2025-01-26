import React, { useState, useEffect } from "react";
import categories from "../../utils/category";
import styles from "../../styles/categories/CollectionDetail.module.css";

const CollectionDetail = ({ category }) => {
  const [isExpandable, setIsExpandable] = useState(false);

  const filteredCategory =
    category &&
    categories.filter((element) => element.name === category.toUpperCase());

  if (!filteredCategory || filteredCategory.length === 0) {
    return <div>Catégorie non trouvée</div>;
  }

  const details = isExpandable
    ? filteredCategory[0].description
    : filteredCategory[0].description.slice(0, 250) + " ...";

  return (
    <div className={styles.container}>
      <h1>{filteredCategory[0].name}</h1>
      <p>{details}</p>
      <button
        className={styles.btn}
        onClick={() => setIsExpandable(!isExpandable)}
      >
        {isExpandable ? "Voir Moins" : "Voir Plus"}
      </button>
    </div>
  );
};

export default CollectionDetail;
