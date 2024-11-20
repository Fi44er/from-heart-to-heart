import Slider from "react-slick";
import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import About from "./components/aboutSection";
import NewsSection from "./components/newsSection";
import GalarySection from "./components/galarySection";
import HelpSection from "./components/helpSection";

const slides = [
  {
    id: 1,
    content: "/public/Slide1.png",
  },
  {
    id: 2,
    content: "/public/Slide2.png",
  },
  {
    id: 3,
    content: "/public/Slide3.png",
  },
  {
    id: 4,
    content: "/public/Slide4.png",
  },
];

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{ position: "absolute", left: 10, top: "50%", zIndex: 1 }}
    >
      <ArrowBackIcon sx={{ color: "white" }} />
    </IconButton>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{ position: "absolute", right: 10, top: "50%", zIndex: 1 }}
    >
      <ArrowForwardIcon sx={{ color: "white" }} />
    </IconButton>
  );
};

export default function Home() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // добавлено для авто перелистывания
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box>
      <Box
        sx={{ maxWidth: { xs: "100%", sm: 600, md: "100%" }, margin: "auto" }}
      >
        <Slider {...settings}>
          {slides.map((slide) => (
            <div
              key={slide.id}
              style={{ position: "relative", textAlign: "center" }}
            >
              <CardMedia
                component="img"
                image={slide.content}
                alt="png"
                sx={{
                  width: "100%",
                  height: { xs: "250px", sm: "500px", md: "800px" },
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>
      </Box>
      <Box id={"about"}>
        <About />
      </Box>
      <Box sx={{ mt: 8, position: "relative" }}>
        <NewsSection />
      </Box>
      <Box id={"help"} sx={{ mt: 8, position: "relative" }}>
        <HelpSection />
      </Box>
      <Box sx={{ mt: 8, mb:6, position: "relative" }}>
        <GalarySection />
      </Box>
    </Box>
  );
}
