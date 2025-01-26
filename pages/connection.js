import React, { useEffect } from "react";
import CoreBenefits from "../components/commun/CoreBenefits";
import FollowInsta from "../components/commun/FollowInsta";
import GallerySlider from "../components/commun/GallerySlider";
import AuthForm from "../components/connection/AuthForm";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const account = () => {
  const router = useRouter();
  const { from } = router.query;
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user.email !== null && user.token !== null && from !== "checkouts") {
      router.push("/account");
    }
  }, [user]);

  return (
    <>
      <Header />
      <AuthForm />
      <CoreBenefits />
      <FollowInsta />
      <GallerySlider />
      <Footer />
    </>
  );
};

export default account;
