import { Card, Icon, Typography } from "@mui/material";
import React from "react";
import LocationIcon from "@mui/icons-material/FmdGoodOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
interface CardItemProps {
  tutor: {
    name: string;
    subject: string;
    rating: number;
    img: any;
    location: string;
  };
}

const CardItem = ({
  tutor: { name, subject, rating, img, location },
}: CardItemProps) => {
  return (
    <Card
      className="w-[200px] h-[280px] shadow-md flex flex-col justify-center items-center py-2.5"
      style={{
        borderRadius: 20,
        gap: 1,
      }}
    >
      <img
        src={img.src}
        alt="Teacher"
        className="w-[90%] h-full object-cover rounded-[16px]"
      />
      <div className="w-[90%] flex justify-between pt-2">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "14px" },
              fontWeight: 600,
              color: "var(--color-blue800)",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: { xs: "10px", sm: "11px", md: "12px", lg: "13px" },
              color: "var(--color-blue900)",
              fontWeight: 500,
            }}
          >
            {subject}
          </Typography>
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: { xs: "6px", sm: "7px", md: "8px", lg: "9px" },
              color: "black",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <LocationIcon
              sx={{
                fontSize: { xs: "10px", sm: "11px", md: "12px", lg: "13px" },
              }}
            />
            {location}
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
            }}
          >
            {rating}
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
