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
import { useParams } from "react-router-dom";

export default function UpdateNews() {
  const { id } = useParams();
  const {
    title,
    description,
    photo,
    setTitle,
    setDescription,
    setPhoto,
    putNews,
  } = useNewsStore();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Отправляем данные на сервер
    await putNews(id);

    // Сброс формы
    setTitle("");
    setDescription("");
    setPhoto(null);
  };
  return (
    <Box>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 5 }}>
          <NavBar />
        </Box>
        <Box sx={{ padding: 2, maxWidth: 400, margin: "auto", mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Редактировать новость
          </Typography>
          <form onSubmit={handleSubmit}>
            <Paper sx={{ p: 5 }}>
              <TextField
                fullWidth
                label="Изменить заголовок"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="Изменить описание"
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
                Изменить изображение
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
                Применить
              </Button>
            </Paper>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
