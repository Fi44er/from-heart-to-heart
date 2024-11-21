import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useNewsStore from "../../../../store/newsStore";
import NavBar from "../NavBar/NavBar";

export default function CreateNews() {
  const {
    news,
    fetchNews,
    title,
    description,
    photo,
    setTitle,
    setDescription,
    setPhoto,
    postNews,
    deleteNews,
  } = useNewsStore();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (photo) {
      formData.append("photo", photo);
    }

    // Отправляем данные на сервер
    await postNews(formData);

    // Сброс формы
    setTitle("");
    setDescription("");
    setPhoto(null);
    fetchNews();
  };
  return (
    <Box>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 5 }}>
          <NavBar />
        </Box>
        <Box sx={{ padding: 2, maxWidth: 400, margin: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Добавить новость
          </Typography>
          <form onSubmit={handleSubmit}>
            <Paper sx={{ p: 5 }}>
              <TextField
                fullWidth
                label="Заголовок"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="Описание"
                variant="outlined"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ margin: "normal" }}
              >
                Загрузить изображение
                <input
                  type="file"
                  hidden
                  accept="photo/*"
                  onChange={handleImageChange}
                />
              </Button>
              {photo && (
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  Выбрано изображение: {photo.name}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Добавить новость
              </Button>
            </Paper>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
