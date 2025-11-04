import HeroBanner from "./components/BannerSection";
import IntroductSection from "./components/IntroductSection";
import RecommnendTutor from "./components/RecommendTutor/index";
import RoleOptions from "./components/RoleOptions";
import SubjectSection from "./components/Subjects";
import UserComment from "./components/UserComment";

export const HomePageView = () => {
  return (
    <div className="flex flex-col !gap-[20px] sm:!gap-[30px] md:!gap-[50px] lg:!gap-[64px] bg-white">
      <HeroBanner />
      <IntroductSection />
      <RecommnendTutor />
      {/* <SubjectSection /> */}
      <RoleOptions />
      <UserComment />
    </div>
  );
};
