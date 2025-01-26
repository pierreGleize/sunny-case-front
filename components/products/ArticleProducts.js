import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import styles from "../../styles/products/ArticleProducts.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Accordion from "../commun/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faCircleInfo,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addItem, openCartModal } from "../../reducers/cart";
import Loader from "../loader/Loader";

const ArticleProducts = ({ articleID }) => {
  const [article, setArticle] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!articleID) return;

    fetchArticle();
  }, [articleID]);

  const fetchArticle = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `https://sunny-case-back.vercel.app/articles/articleID/${articleID}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(true);
        setErrorMessage(
          data.message ||
            "Une erreur est survenu lors du chargement de l'article."
        );
      }

      if (data.result) {
        setArticle(data.article);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(
        `Un problème est survenue lors du chargement de l'article. Veuillez réessayer plus tard. ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDotHover = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  const handleDotClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 50,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <>
        <ul className={styles.slickDots}>{dots}</ul>
      </>
    ),
    customPaging: (i) => (
      <div
        className={styles.customDotsContainer}
        onMouseEnter={() => handleDotHover(i)}
        onClick={() => handleDotClick(i)}
      >
        {article.images && article.images[i] ? (
          <img
            src={article.images[i]}
            alt={`Miniature ${i}`}
            className={styles.dotImage}
          />
        ) : null}
      </div>
    ),
  };

  const addItemAndOpenModalCart = () => {
    dispatch(addItem(article));
    dispatch(openCartModal());
  };

  const style = { color: "grey" };
  const accordionData = [
    {
      title: "Description",
      content: article && article.description,
      id: 1,
      icon: <FontAwesomeIcon icon={faCircleInfo} style={style} />,
    },
    {
      title: "Livraison",
      content:
        "Tous nos articles sont fabriqués sur commande pour garantir la perfection et limiter les déchets. 2 à 3 jours ouvrés sont nécessaires pour préparer ta commande avant de l’envoyer. Toutes les commandes sont expédiées depuis notre entrepôt en Lituanie. Les envois sont entièrement suivis, de chez nous à chez vous.",
      icon: <FontAwesomeIcon icon={faTruck} style={style} />,
      id: 2,
    },
    {
      title: "JUSQU'À 12 MOIS DE GARANTIE",
      content:
        "Bien que rien ne soit éternel, nos coques de téléphone sont conçues pour durer dans le temps et nous garantissons une impression haut de gamme. Ainsi, nos motifs uniques sont résistants à la décoloration et ne perdent pas de leur éclat. Votre satisfaction est notre priorité. C’est pourquoi nos coques Tough & Elite bénéficient d’une garantie de 12 mois et nos coques Snap, d’une garantie de 6 mois.",
      id: 3,
      icon: <FontAwesomeIcon icon={faAward} style={style} />,
    },
  ];
  return loading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        {error && <span className="error-message">{errorMessage}</span>}
        <Slider ref={sliderRef} {...settings}>
          {article.images &&
            article.images.map((element, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={element}
                  alt={`Image de présentation ${i}`}
                  className={styles.sliderImage}
                />
              </div>
            ))}
        </Slider>
      </div>
      <div className={styles.rightContainer}>
        <h1 className={styles.articleTitle}>
          {article.name} - {article.product}
        </h1>
        <span style={{ fontWeight: "500", marginBottom: "3rem" }}>
          TYPE :{" "}
          <span style={{ fontWeight: "normal" }}>{article.category}</span>
        </span>
        <button className={styles.btn} onClick={addItemAndOpenModalCart}>
          <img
            src="/shopping-bag-article.svg"
            alt="Add to cart"
            className={styles.cartImage}
          />
          AJOUTER AU PANIER - {article.price} €
        </button>
        <div className={styles.AccordionContainer}>
          {accordionData.map(({ title, content, icon, id }) => (
            <Accordion key={id} title={title} content={content} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleProducts;
