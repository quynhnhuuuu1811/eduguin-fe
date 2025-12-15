import { Card, Icon, Typography } from "@mui/material";
import React from "react";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Img from "../../../../assets/images/teacher.png";
interface TutorProfile {
  description: string;
  price: number;
  introVideoUrl: string | null;
  rating: number;
  subject: string | null;
  grade: number;
}

interface Tutor {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  sex: "male" | "female" | "other" | string;
  birthDate: string;
  role: "tutor" | string;
  tutorProfile: TutorProfile;
}

interface CardItemProps {
  tutor: Tutor;
}

const CardItem = ({ tutor }: CardItemProps) => {
  if (!tutor) {
    return null;
  }
  return (
    <Card
      className="w-[200px] h-[280px] shadow-md flex flex-col justify-center items-center py-2.5"
      style={{
        borderRadius: 20,
        gap: 3,
      }}>
      <img
        src={tutor.avatarUrl || Img.src}
        alt="Teacher"
        className="w-[90%] object-cover rounded-[16px] aspect-square"
      />
      <div className="w-[90%] flex justify-between pt-2">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "14px" },
              fontWeight: 600,
              color: "var(--color-blue800)",
            }}>
            {tutor.fullName}
          </Typography>
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: { xs: "10px", sm: "11px", md: "12px", lg: "13px" },
              color: "var(--color-blue900)",
              fontWeight: 500,
            }}>
            {tutor.tutorProfile.subject}
          </Typography>
        </div>
        <div className="flex items-start gap-0.5">
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: { xs: "10x", sm: "15px", md: "20px", lg: "25px" },
              color: "var(--color-yellow500)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}>
            {tutor.tutorProfile.rating}
          </Typography>
          <StarRateRoundedIcon
            sx={{
              fontSize: { xs: "15px", sm: "20px", md: "25px", lg: "30px" },
              verticalAlign: "middle",
              color: "var(--color-yellow500)",
              marginBlock: 0.5,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
