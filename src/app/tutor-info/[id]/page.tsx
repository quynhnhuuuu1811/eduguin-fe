import TutorInfo from "@/pages/tutor-info/page-view";

type TutorInfoPageProps = {
  params: {
    id: string;
  };
};

export default function TutorInfoPage({ params }: TutorInfoPageProps) {
  const { id } = params;

  return (
    <div>
      <TutorInfo id={id} />
    </div>
  );
}
