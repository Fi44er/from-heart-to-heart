import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Helmet } from "react-helmet";
import { GlobalButton } from "../../../theme/theme";
import useNewsStore from "../../../store/newsStore";
import { urlPictures } from "../../../constants/contants";

export default function NewsSection() {
  // const latestNews = newsArray.slice(-3);
  const { news, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, []);

  const latestNews =
    news && Array.isArray(news.result) ? news.result.slice(-3) : [];

  return (
    <Box sx={{ position: "relative" }}>
      <Helmet>
        <title>Недавние проекты</title>
        <meta
          name="description"
          content="Посмотрите недавние проекты и новости на нашем сайте."
        />
        <meta
          name="keywords"
          content="новости, проекты, недавние новости, проекты"
        />
      </Helmet>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: -50,
          width: { xs: 100, sm: 100, md: 200, lg: 300 },
          height: { xs: 100, sm: 100, md: 200, lg: 300 },
          backgroundColor: "#F7F01B",
          opacity: 0.2,
          zIndex: 0,
          transform: "rotate(45deg)",
          zIndex: -10,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: "40%",
          margin: 0,
          width: { xs: 100, sm: 100, md: 200, lg: 200 },
          height: { xs: 100, sm: 100, md: 200, lg: 200 },
          borderRadius: "50%",
          backgroundColor: "#F7F01B",
          opacity: 0.2,
          zIndex: -10,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "5%",
          width: { xs: 100, sm: 100, md: 200, lg: 300 },
          height: { xs: 100, sm: 100, md: 200, lg: 300 },
          backgroundColor: "#D46EFF",
          opacity: 0.2,
          zIndex: -10,
          transform: "rotate(75deg)",
        }}
      ></Box>
      <Container>
        <Typography
          sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          variant="h3"
          component="h2"
        >
          Недавние проекты
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ mt: 4 }}
        >
          {latestNews.map((data) => (
            <Grid key={data.id} size={{ xs: 10, sm: 4, md: 4 }}>
              <Card
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/news/${data.id}`;
                }}
                sx={{ width: "100%" }}
              >
                <CardMedia
                  component="img"
                  image={`${urlPictures}/${data.photo}`}
                  alt={`Изображение для новости: ${data.title}`}
                  sx={{
                    width: "100%",
                    height: { xs: "200px", sm: "300px", md: "400px" },
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ backgroundColor: "#ECFBFF" }}>
                  <CardHeader title={data.title} />
                  <Typography variant="body2">{data.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "right", mt: 3 }}>
          <GlobalButton
            sx={{
              fontSize: "15px",
            }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/news";
            }}
          >
            Все проекты
          </GlobalButton>
        </Box>
      </Container>
    </Box>
  );
}
