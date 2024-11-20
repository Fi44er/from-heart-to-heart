import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  IconButton,
  styled,
  Typography,
  Paper,
  Button,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { Description } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useNewsStore from "../../store/newsStore";
import { urlPictures } from "../../constants/contants";
import { Helmet } from "react-helmet";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const CustomCollapse = styled(Collapse)(({ theme }) => ({
  maxHeight: "300px", // Задайте максимальную высоту, чтобы скроллинг работал
  overflowY: "auto",
}));

export default function News() {
  const { news, fetchNews } = useNewsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 8;

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  // Вычисляем индекс последней и первой новости на текущей странице
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;

  // Получаем текущие новости
  const currentNews =
    news && Array.isArray(news.result)
      ? news.result.slice(indexOfFirstNews, indexOfLastNews)
      : [];

  return (
    <Box>
      <Helmet>
        <title>Новости - Проекты</title>
        <meta
          name="description"
          content="Последние новости и проекты. Узнайте о новых инициативах и событиях."
        />
        <meta name="keywords" content="новости, проекты, инициатива, события" />
        <link rel="canonical" href="https://ваш-сайт/новости" />
      </Helmet>
      <Container
        sx={{ width: "100%", height: "max-content", position: "relative" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m: 4,
          }}
        >
          <Typography variant="h4" component="h1">
            Проекты
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {currentNews.map((data) => {
            return (
              <Grid key={data.ID} size={{ xs: 10, sm: 4, md: 6 }}>
                <article>
                  <Card
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/news/${data.ID}`;
                    }}
                    sx={{ width: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      image={`${urlPictures}/${data.Photo}`}
                      alt={data.Title}
                      sx={{
                        width: "100%",
                        height: { xs: "200px", sm: "300px", md: "400px" },
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <CardHeader title={data.Title} />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {data.Description}
                      </Typography>
                    </CardContent>
                  </Card>
                </article>
              </Grid>
            );
          })}
        </Grid>
        {news && Array.isArray(news.result) && (
          <Pagination
            count={Math.ceil(news.result.length / newsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            sx={{
              mt: 4,
              mb: 4,
              display: "flex",
              justifyContent: "center",
              color: "#C152F0",
            }}
          />
        )}
      </Container>
    </Box>
  );
}
