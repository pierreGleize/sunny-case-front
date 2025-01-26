import React, { useState, useEffect } from "react";
import styles from "../../styles/products/RecommandedArticles.module.css";
import ArticleCollections from "../commun/ArticleCollections";

const RecommandedArticles = ({ articleID, title }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!articleID) return;

    fetchRecommandedArtiles();
  }, [articleID]);

  const fetchRecommandedArtiles = async () => {
    setError(false);
    try {
      const URL_ROUTE =
        title === "RECOMMANDÉ POUR VOUS" ? "recommanded" : "alsoLiked";

      const response = await fetch(
        `https://sunny-case-back.vercel.app/articles/${URL_ROUTE}/${articleID}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.result) {
        setArticles(data.documents);
        setError(false);
        setErrorMessage("");
      } else {
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(
        `Une erreur s'est produite. Veuillez réessayer plus tard.`
      );
    }
  };
  console.log([]);
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.underline}></div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.articlesGrid}>
        {error && <span className="error-message">{errorMessage}</span>}
        {!error &&
          articles.length > 0 &&
          articles.map((props) => (
            <ArticleCollections key={props._id} {...props} />
          ))}
      </div>
    </div>
  );
};

export default RecommandedArticles;
