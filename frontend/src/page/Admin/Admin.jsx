import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useNewsStore from "../../store/newsStore";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useEffect, useState } from "react";
import { urlPictures } from "../../constants/contants";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import NavBar from "./components/NavBar/NavBar";
import Cookies from "js-cookie";



export default function Admin() {
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
  const { Logout } = useAuthStore();

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Box sx={{ height: "100%" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NavBar />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id Новости</TableCell>
                <TableCell align="right">Заголовок</TableCell>
                <TableCell align="right">Изображение</TableCell>
                <TableCell align="right">Управление</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news &&
                Array.isArray(news.result) &&
                news.result.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "black" }}>
                      {row.Title}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        src={`${urlPictures}/${row.Photo}`}
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => deleteNews(row.ID)}>
                        <DeleteOutlineOutlinedIcon
                          fontSize="large"
                          sx={{ color: "red" }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/create-news/${row.ID}`;
                        }}
                      >
                        <EditOutlinedIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Box sx={{ mt: 10, mb: 10 }}></Box>
    </Box>
  );
}
