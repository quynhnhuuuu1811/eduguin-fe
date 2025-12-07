import { CustomButton } from "@/components/Button";

const ButtonGroup = () => {
  return (
    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-5 p-4 sm:p-0 !justify-center sm:!justify-start md:!justify-start lg:!justify-start">
      <CustomButton type="PrimaryOutlined">Tìm hiểu thêm</CustomButton>
      <CustomButton type="Primary">Tìm gia sư ngay</CustomButton>
    </div>
  );
};

export default ButtonGroup;
