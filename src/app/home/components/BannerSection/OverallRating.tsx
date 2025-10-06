import Image from "next/image";
import { Box } from "@mui/material";
import Users from "../../../../assets/images/users.png";

const OverallRating = () => {
  return (
    <div>
      <Box
        sx={{
          position: "relative",
          width: 420,
          height: 292,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#028E4B",
            width: 420,
            height: 292,
            transform: "rotate(-5deg)",
            borderRadius: 8,
          }}
        ></Box>
        <Image
          alt="user"
          src={Users.src}
          fill
          style={{
            objectFit: "cover",
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            transform: "rotate(3deg)",
            borderRadius: 40,
          }}
        />
      </Box>
    </div>
  );
};

export default OverallRating;
