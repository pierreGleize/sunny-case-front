import React from "react";
import { useRouter } from "next/router";
import CoreBenefits from "../components/commun/CoreBenefits";
import FollowInsta from "../components/commun/FollowInsta";
import GallerySlider from "../components/commun/GallerySlider";
import ArticleProducts from "../components/products/ArticleProducts";
import RecommandedArticles from "../components/products/RecommandedArticles";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";

const products = () => {
  const router = useRouter();
  const { articleID } = router.query;
  return (
    <>
      <Header />
      <ArticleProducts articleID={articleID} />
      <RecommandedArticles articleID={articleID} title="RECOMMANDÉ POUR VOUS" />
      <RecommandedArticles articleID={articleID} title="VOUS AIMEREZ AUSSI" />
      <CoreBenefits />
      <FollowInsta />
      <GallerySlider />
      <Footer />
    </>
  );
};

export default products;
