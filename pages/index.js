import Carrousel from "../components/home/Carrousel";
import CoreBenefits from "../components/commun/CoreBenefits";
import FollowInsta from "../components/commun/FollowInsta";
import ImageGrid from "../components/home/ImageGrid";
import Review from "../components/home/Review";
import GallerySlider from "../components/commun/GallerySlider";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";

function Index() {
  return (
    <>
      <Header />
      <Carrousel />
      <Review />
      <ImageGrid />
      <CoreBenefits />
      <FollowInsta />
      <GallerySlider />
      <Footer />
    </>
  );
}

export default Index;
