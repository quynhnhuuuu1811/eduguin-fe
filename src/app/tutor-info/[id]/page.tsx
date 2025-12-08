import TutorInfo from "@/page-views/tutor-info/page-view";

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
