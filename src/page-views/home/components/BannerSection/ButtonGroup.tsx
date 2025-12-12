"use client";
import { CustomButton } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";

const ButtonGroup = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-5 p-4 sm:p-0 !justify-center sm:!justify-start md:!justify-start lg:!justify-start">
      <CustomButton type="PrimaryOutlined" onClick={() => router.push('/find-tutor')}>
        {t.home.banner.findTutor}
      </CustomButton>
      <CustomButton type="Primary" onClick={() => router.push('/tutor-register')}>
        {t.home.banner.createCV}
      </CustomButton>
    </div>
  );
};

export default ButtonGroup;
