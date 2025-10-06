import HeroBanner from "./components/BannerSection";
import IntroductSection from "./components/IntroductSection";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-[64px]">
      <HeroBanner />
      <IntroductSection />
    </div>
  );
};

export default HomePage;
