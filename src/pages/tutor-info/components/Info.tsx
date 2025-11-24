import { Box, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import TutorImg from "../../../assets/images/student.png";
import { useUserStore } from "@/zustand/stores/UserStore";

const Info = (id: string) => {
  const { fetchTutorByID } = useUserStore();
  const teacher = fetchTutorByID(id);
  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"}>
      <Grid container width={"100%"}>
        <Grid item size={3}>
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: 80, sm: 140, md: 180, lg: 200 },
              aspectRatio: "1/1",
              borderRadius: 2,
              overflow: "hidden",
              backgroundImage: `url(${TutorImg.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Grid>
        <Grid item size={9}>
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {teacher?.name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Info;
