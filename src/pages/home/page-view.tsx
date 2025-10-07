import HeroBanner from "./components/BannerSection";
import IntroductSection from "./components/IntroductSection";

export const HomePageView = () => {
  return (
    <div className="flex flex-col gap-[64px] bg-white">
      <HeroBanner />
      <IntroductSection />
    </div>
  );
};
