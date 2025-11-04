import React from "react";
import MathLabel from "../../../../assets/images/Maths.png";
import HistoryLabel from "../../../../assets/images/History.png";
import PhysicsLabel from "../../../../assets/images/Physics.png";
import ChemistryLabel from "../../../../assets/images/Chemistry.png";
import SubjectItem from "./SubjectItem";
import bgImg from "../../../../assets/images/SubjectBg.png";
import penguin from "../../../../assets/images/penguinWrite.png";

const subjects = [
  {
    name: "Toán học",
    labelUrl: MathLabel,
    bgColor: "#F8BF5D",
    bgLabel: "#FBD698",
  },
  {
    name: "Hóa học",
    labelUrl: ChemistryLabel,
    bgColor: "#24C26D",
    bgLabel: "#86E99F",
  },
  {
    name: "Vật lý",
    labelUrl: PhysicsLabel,
    bgColor: "#2E94F1",
    bgLabel: "#B7DBFA",
  },
  {
    name: "Lịch sử",
    labelUrl: HistoryLabel,
    bgColor: "#CF2A2A",
    bgLabel: "#FF9494",
  },
];

const SubjectSection = () => {
  return (
    <div
      className="flex flex-col w-full px-[50px] sm:px-[65px] md:px-[80px] lg:px-[135px] justify-between py-2 sm:py-3 md:py-4 lg:py-5 gap-2 sm:gap-4 md:gap-6 lg:gap-8"
      style={{
        backgroundImage: `url(${bgImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      <span className="w-full flex justify-start !text-[10px] sm:!text-[12px] md:!text-[14px] lg:!text-[16px] !font-semibold">
        Khi các môn học như...
      </span>
      <div className="flex flex-row">
        {subjects.map((subject) => (
          <div key={subject.name} className="flex-1 flex justify-center">
            <SubjectItem
              bgColor={subject.bgColor}
              labelColor={subject.bgLabel}
              img={subject.labelUrl.src}
            >
              {subject.name}
            </SubjectItem>
          </div>
        ))}
      </div>
      <span className="flex w-full justify-end items-end  !text-[10px] sm:!text-[12px] md:!text-[14px] lg:!text-[16px]  !font-semibold">
        ...không còn là những bài tập khó nhằn
        <img
          src={penguin.src}
          className="w-[20px] sm:w-[30px] md:w-[40px] lg:w-[50px]"
        />
      </span>
    </div>
  );
};

export default SubjectSection;
