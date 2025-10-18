import HeroBanner from "./components/BannerSection";
import IntroductSection from "./components/IntroductSection";
import SubjectSection from "./components/Subjects";

export const HomePageView = () => {
  return (
    <div className="flex flex-col gap-[64px] bg-white">
      <HeroBanner />
      <IntroductSection />
      <SubjectSection />
    </div>
  );
};
