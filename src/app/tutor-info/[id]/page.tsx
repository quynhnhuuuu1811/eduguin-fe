import TutorInfo from "@/page-views/tutor-info/page-view";
import { use } from "react";

type TutorInfoPageProps = {
  params: {
    id: string;
  };
};

export default function TutorInfoPage({ params: { id } }: TutorInfoPageProps) {
  return (
    <div>
      <TutorInfo id={id} />
    </div>
  );
}
