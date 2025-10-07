import { CustomButton } from "@/components/Button";

const ButtonGroup = () => {
  return (
    <div className="flex gap-[20px]">
      <CustomButton type="PrimaryOutlined">Tìm hiểu thêm</CustomButton>
      <CustomButton type="Primary">Tìm gia sư ngay</CustomButton>
    </div>
  );
};

export default ButtonGroup;
