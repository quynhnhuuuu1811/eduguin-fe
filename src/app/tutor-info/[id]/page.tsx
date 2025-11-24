import TutorInfo from "@/pages/tutor-info/page-view";
import React from "react";

const TutorInfoPage = ({ param }: { param: any }) => {
  return (
    <div>
      <TutorInfo id={param} />
    </div>
  );
};

export default TutorInfoPage;
