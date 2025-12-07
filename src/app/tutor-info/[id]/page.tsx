import TutorInfo from "@/page-views/tutor-info/page-view";

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
