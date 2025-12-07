"use client";

import { Box, Typography, IconButton } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { CustomButton } from "@/components/Button";
import { useRouter } from "next/navigation";
import VideoImg from "../../../assets/images/VideoThumbnail.png";

const TeacherCard: FC<{ teacher: any }> = ({ teacher }) => {
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<any>(null);
  const router = useRouter();

  const videoUrl = teacher?.tutorProfile?.introVideoUrl;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    const isHls = /\.m3u8(\?|$)/i.test(videoUrl);
    let cancelled = false;

    async function setup() {
      if (!video) return;
      if (isHls) {
        if (
          "canPlayType" in video &&
          video.canPlayType("application/vnd.apple.mpegurl")
        ) {
          video.src = videoUrl;
        } else {
          const { default: Hls } = await import("hls.js");
          if (cancelled || !video) return;
          if (Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;
            hls.loadSource(videoUrl);
            hls.attachMedia(video);
          }
        }
      } else {
        video.src = videoUrl;
      }
    }

    setup();

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (video) {
        try {
          video.pause();
          video.removeAttribute("src");
          video.load();
        } catch {}
      }
    };
  }, [videoUrl]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovering && videoUrl) {
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovering, videoUrl]);

  const handlePlayClick = () => {
    const href = teacher?.tutorProfile?.introVideoUrl;
    if (href) {
      window.open(href);
    }
  };

  return (
    <Box
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onDoubleClick={() => router.push(`/tutor-info/${teacher?.id}`)}>
      <div className="w-full mt-[10px] sm:mt-[30px] md:mt-[40px] lg:mt-[50px] grid grid-cols-12 gap-4">
        {/* LEFT COLUMN: Info */}
        <div className="col-span-12 md:col-span-8">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "4px", sm: "6px", md: "8px", lg: "10px" },
              width: { xs: "50%", sm: "50%", md: "50%", lg: "60%" },
            }}>
            <Typography
              sx={{
                fontFamily: "quicksand",
                fontWeight: "bold",
                fontSize: { xs: "10px", sm: "12px", md: "15px", lg: "17px" },
              }}>
              {teacher?.fullName}
            </Typography>

            <Typography
              sx={{
                fontFamily: "quicksand",
                fontWeight: 600,
                fontSize: { xs: "7px", sm: "9px", md: "13px", lg: "15px" },
              }}
              className="text-blue600">
              Gia sư {teacher?.tutorProfile?.subject}
            </Typography>

            <Typography
              sx={{
                fontFamily: "quicksand",
                fontWeight: 500,
                fontSize: { xs: "7px", sm: "9px", md: "13px", lg: "15px" },
              }}>
              {teacher?.tutorProfile?.description || "Không có mô tả"}
            </Typography>
          </Box>

          {/* Rating + Price */}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              width: "40%",
              flexDirection: "column",
              justifyContent: "space-between",
              mt: 1,
            }}>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRight: "1px solid black",
                  px: { xs: "2px", sm: "5px", md: "10px", lg: "10px" },
                }}>
                <Typography
                  sx={{
                    fontFamily: "quicksand",
                    fontSize: {
                      xs: "9px",
                      sm: "9px",
                      md: "11px",
                      lg: "15px",
                    },
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  {teacher?.rating !== 0 ? teacher?.rating : "-"}{" "}
                  <StarRateRoundedIcon
                    sx={{
                      fontSize: {
                        xs: "13px",
                        sm: "15px",
                        md: "22px",
                        lg: "17px",
                      },
                      verticalAlign: "middle",
                    }}
                  />
                </Typography>
                <Typography
                  fontFamily="quicksand"
                  sx={{
                    fontSize: { xs: "7px", sm: "7px", md: "9px", lg: "11px" },
                  }}>
                  {teacher?.cmt} bình luận
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  px: { xs: "5px", sm: "5px", md: "10px", lg: "10px" },
                  flexDirection: "column",
                }}>
                <Typography
                  sx={{
                    fontFamily: "quicksand",
                    fontWeight: 600,
                    fontSize: {
                      xs: "9px",
                      sm: "9px",
                      md: "11px",
                      lg: "15px",
                    },
                  }}>
                  {teacher?.tutorProfile?.price} VND
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "quicksand",
                    fontWeight: 500,
                    fontSize: { xs: "7px", sm: "7px", md: "9px", lg: "11px" },
                  }}>
                  /tháng
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>

        {/* RIGHT COLUMN: Video */}
        <div
          className={`col-span-12 md:col-span-4 ${
            hovering ? "flex" : "hidden"
          }`}>
          <Box
            sx={{
              width: "100%",
              height: { xs: 200, md: 200 },
              borderRadius: 2,
              overflow: "hidden",
              border: "2px solid #CFE7FC",
              position: "relative",
              backgroundColor: "#000",
            }}>
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              preload="metadata"
              poster={videoUrl ? undefined : VideoImg.src}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                if (video.duration > 0.5) {
                  video.currentTime = 0.5;
                }
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: videoUrl ? 1 : 0.3,
                transition: "filter .2s ease, opacity .2s ease",
                filter: hovering ? "none" : "grayscale(0.2) brightness(0.85)",
              }}
            />

            {/* Overlay gradient */}
            <Box
              sx={{
                pointerEvents: "none",
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.00) 55%, rgba(0,0,0,0.45) 100%)",
              }}
            />

            {/* Play button or fallback text */}
            {videoUrl ? (
              <IconButton
                aria-label="Xem video giới thiệu"
                onClick={handlePlayClick}
                sx={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  pointerEvents: "auto",
                  bgcolor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  "&:hover": { bgcolor: "#fff" },
                }}>
                <PlayArrowRoundedIcon />
              </IconButton>
            ) : (
              <Typography
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  fontSize: 14,
                  textAlign: "center",
                  px: 2,
                }}>
                Hiện không có video giới thiệu
              </Typography>
            )}

            {/* Buttons on video */}
            <Box
              sx={{
                position: "absolute",
                left: 10,
                bottom: 10,
                display: "flex",
                flexDirection: "column",
                gap: { xs: "3px", sm: "5px", md: "10px", lg: "10px" },
              }}>
              <CustomButton type="Secondary">Đăng kí ngay</CustomButton>
              <CustomButton
                type="SecondaryOutlined"
                className="border-none"
                onClick={() => router.push(`/tutor-info/${teacher?.id}`)}>
                Xem chi tiết
              </CustomButton>
            </Box>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default TeacherCard;
