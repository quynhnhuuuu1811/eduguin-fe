import TutorInfo from "@/pages/tutor-info/page-view";
import { use } from "react";

type TutorInfoPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function TutorInfoPage({ params }: TutorInfoPageProps) {
  const { id } = use(params);

  return (
    <div>
      <TutorInfo id={id} />
    </div>
  );
}
