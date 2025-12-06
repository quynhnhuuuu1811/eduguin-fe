import HeroBanner from "./components/BannerSection";
import IntroductSection from "./components/IntroductSection";
import RecommendTutor from "./components/RecommendTutor/index";
import RoleOptions from "./components/RoleOptions";
import UserComment from "./components/UserComment";

export default function HomePageView() {
  return (
    <div className="flex flex-col !gap-[20px] sm:!gap-[30px] md:!gap-[50px] lg:!gap-[64px] bg-white">
      <HeroBanner />
      <IntroductSection />
      <RecommendTutor />
      {/* <SubjectSection /> */}
      <RoleOptions />
      <UserComment />
    </div>
  );
}
