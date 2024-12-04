import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
  IconButton,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Download } from "@mui/icons-material";

export default function Contacts() {
  return (
    <Container maxWidth="md">
      <Typography sx={{ mt: 4 }} variant="h4" align="left" gutterBottom>
        Контакты
      </Typography>

      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography variant="h6">Адрес</Typography>
        <Typography variant="body1">
          Оренбургская область, город Новотроицк, улица Фрунзе, дом 4
        </Typography>
      </Paper>

      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography variant="h6">Телефоны</Typography>
        <List>
          <ListItem>
            <ListItemText primary="+7 (3537) 66-00-01" />
          </ListItem>
        </List>
      </Paper>

      {/* <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography variant="h6">Эл. почта</Typography>
        <List>
          <ListItem>
            <ListItemText primary="info@podari-zhizn.ru" />
          </ListItem>
          <ListItem>
            <ListItemText primary="help@podari-zhizn.ru — для обращений за помощью" />
          </ListItem>
          <ListItem>
            <ListItemText primary="hr@podari-zhizn.ru — по вопросам трудоустройства" />
          </ListItem>
          <ListItem>
            <ListItemText primary="donate@podari-zhizn.ru — по всем вопросам благотворителей" />
          </ListItem>
          <ListItem>
            <ListItemText primary="spravka@podari-zhizn.ru — для получения справок о совершенных пожертвованиях" />
          </ListItem>
          <ListItem>
            <ListItemText primary="corporate@podari-zhizn — если вопросы возникают у компаний" />
          </ListItem>
        </List>
      </Paper> */}

      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography variant="h6">Для СМИ</Typography>
        <List>
          <ListItem>
            <Link href="https://vk.com/club211949357">Вконтакте</Link>
          </ListItem>
          <ListItem>
            <ListItemText primary="+7 (3537) 66-00-01" />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography variant="h6">
          Реквизиты для рублевых перечислений (₽)
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Название: БЛАГОТВОРИТЕЛЬНЫЙ ФОНД ОТ СЕРДЦА К СЕРДЦУ" />
          </ListItem>
          <ListItem>
            <ListItemText primary="ИНН получателя: 5606021745" />
          </ListItem>
          <ListItem>
            <ListItemText primary="КПП получателя: 560601001" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Номер счета получателя: 40703810829270000034" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Банк получателя: ФИЛИАЛ НИЖЕГОРОДСКИЙ АО АЛЬФА-БАНК" />
          </ListItem>
          <ListItem>
            <ListItemText primary="БИК: 042202824" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Номер корр. счета банка получателя: 30101810200000000824" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Адрес получателя: Оренбургская область, город Новотроицк, улица Фрунзе, дом 4" />
          </ListItem>
        </List>
      </Paper>
      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography variant="h6">Документы</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Договор оферты" />
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                const link = document.createElement("a");
                link.href = "/ПУБЛИЧНАЯ ОФЕРТА.pdf";
                link.download = ""; // Укажите имя файла, если нужно
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <FileDownloadOutlinedIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <ListItemText primary="Документы фонда" />
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                const link = document.createElement("a");
                link.href = "/ul-1175658008734-20241121110831.pdf";
                link.download = ""; // Укажите имя файла, если нужно
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <FileDownloadOutlinedIcon />
            </IconButton>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}
