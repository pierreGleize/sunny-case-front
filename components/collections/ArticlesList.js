import React, { useState, useEffect } from "react";
import ArticleCollections from "../commun/ArticleCollections";
import styles from "../../styles/categories/ArticlesList.module.css";
import Loader from "../loader/Loader";

const ArticlesList = ({ category }) => {
  const [articlesData, setArticlesData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;

    fetchCategory();
  }, [category]);

  const fetchCategory = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `https://sunny-case-back.vercel.app/articles/${category}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(true);
        setErrorMessage(
          data.message ||
            "Une erreur est survenu lors du chargement des articles."
        );
      }

      if (data.result) {
        setArticlesData(data.articles);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(
        `Un problème est survenue lors votre tentative de connexion. Veuillez réessayer plus tard. ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.gridContainer}>
      {error && <span className="error-message">{errorMessage}</span>}
      {loading ? (
        <Loader />
      ) : (
        articlesData.length > 0 &&
        articlesData.map(
          ({ name, product, category, price, images, description, _id }, i) => (
            <ArticleCollections
              key={i}
              name={name}
              product={product}
              category={category}
              price={price}
              images={images}
              description={description}
              _id={_id}
            />
          )
        )
      )}
    </div>
  );
};

export default ArticlesList;
