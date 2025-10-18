import React from "react";
import MathLabel from "../../../../assets/images/Maths.png";
import HistoryLabel from "../../../../assets/images/History.png";
import PhysicsLabel from "../../../../assets/images/Physics.png";
import ChemistryLabel from "../../../../assets/images/Chemistry.png";
import SubjectItem from "./SubjectItem";

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
    <div className="flex w-full px-[135px]">
      {subjects.map((subject, index) => (
        <SubjectItem
          bgColor={subject.bgColor}
          labelColor={subject.bgLabel}
          key={subject.name}
        >
          {subject.name}
        </SubjectItem>
      ))}
    </div>
  );
};

export default SubjectSection;
