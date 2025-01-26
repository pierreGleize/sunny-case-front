import React from "react";
import CollectionDetail from "../components/collections/CollectionDetail ";
import CoreBenefits from "../components/commun/CoreBenefits";
import FollowInsta from "../components/commun/FollowInsta";
import GallerySlider from "../components/commun/GallerySlider";
import ArticlesList from "../components/collections/ArticlesList";
import { useRouter } from "next/router";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";

const Collections = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <Header />
      <CollectionDetail category={category} />
      <ArticlesList category={category} />
      <CoreBenefits />
      <FollowInsta />
      <GallerySlider />
      <Footer />
    </>
  );
};

export default Collections;
