import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { GlobalButton } from "../../../theme/theme";
import usePaymentStore from "../../../store/paymentStore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Helmet } from "react-helmet";

export default function HelpSection() {
  const { value, setValue, description, setDescription, charitablePayment } =
    usePaymentStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await charitablePayment();

    //логика перенаправления  на страницу благотворительного пожертвования
    if (response.error) {
      console.error(response.error);
      return;
    }

    window.location.href = response.result;

    //отчистка полей
    setValue("");
    setDescription("");
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Helmet>
        <title>Помощь фонду - Ваши благотворительные взносы</title>
        <meta
          name="description"
          content="Присоединяйтесь к нашим проектам и помогите тем, кто нуждается в вашей поддержке."
        />
        <meta
          name="keywords"
          content="благотворительность, помощь, фонд, пожертвование"
        />
      </Helmet>
      <Box
        sx={{
          position: "absolute",
          top: 65,
          left: -50,
          width: { xs: 100, sm: 100, md: 200, lg: 300 },
          height: { xs: 100, sm: 100, md: 200, lg: 300 },
          backgroundColor: "#F7F01B",
          opacity: 0.2,
          zIndex: 0,
          transform: "rotate(45deg)",
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
          top: 0,
          right: 0,
          width: { xs: 100, sm: 100, md: 200, lg: 300 },
          height: { xs: 100, sm: 100, md: 200, lg: 300 },
          borderRadius: "50%",
          backgroundColor: "#D46EFF",
          opacity: 0.2,
          zIndex: -10,
        }}
      ></Box>
      <Container>
        <Typography variant="h3" component="h1" sx={{ mb: 5 }}>
          Помощь фонду
        </Typography>
        <Box
          sx={{
            mb: 5,
            display: "flex",
            flexDirection: "column",
            gridGap: "30px",
          }}
        >
          <Accordion
            sx={{
              background: "#E2CB4A",
              color: "#fff",
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  fontSize="medium"
                  sx={{
                    color: "#fff",
                  }}
                />
              }
            >
              Помочь от бизнеса
            </AccordionSummary>
            <AccordionDetails
              sx={{
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              <Typography variant="h5" component="h2">
                Стать попечителем фонда: переводить деньги каждый месяц на
                уставную деятельность, принимать участие в попечительских
                собраниях и помогать опытом и советов лидерам фонда, лично
                встречаться с женщинами и помогать им во время бесед и
                тренингов.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              background: "#E2CB4A",
              color: "#fff",
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  fontSize="medium"
                  sx={{
                    color: "#fff",
                  }}
                />
              }
            >
              Подарить вещам вторую жизнь
            </AccordionSummary>
            <AccordionDetails
              sx={{
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              <Typography variant="h5" component="h2">
                Мы принимаем в дар вещи, целые и чистые, пригодные для
                дальнейшего использования.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              background: "#E2CB4A",
              color: "#fff",
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  fontSize="medium"
                  sx={{
                    color: "#fff",
                  }}
                />
              }
            >
              Стать волонтером
            </AccordionSummary>
            <AccordionDetails
              sx={{
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              <Typography variant="h5" component="h2">
                Волонтер - кто он? Волонтер — это человек, который безвозмездно
                занимается помощью другим людям.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              background: "#E2CB4A",
              color: "#fff",
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  fontSize="medium"
                  sx={{
                    color: "#fff",
                  }}
                />
              }
            >
              Помочь продуктами
            </AccordionSummary>
            <AccordionDetails
              sx={{
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              <Typography variant="h5" component="h2">
                Продуктовая помощь. Вы можете принести продукты в фонд
                самостоятельно или же заказать доставку к нам в офис
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box>
          <Card
            sx={{
              width: "100%",
            }}
          >
            <CardMedia
              component="img"
              image={"/Group 35 (2).png"}
              alt="Благотворительный проект"
              sx={{
                width: "100%",
                height: { xs: "300px", sm: "300px", md: "400px" },
                objectFit: "cover",
              }}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gridGap: 25,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ mb: 5, mt: 5, textAlign: "center" }}
                >
                  Наши проекты существуют при финансовой поддержке спонсоров,
                  партнеров и благотворителей Не оставайтесь в стороне, вместе
                  сможем помочь тем, кто остро в этом нуждается
                </Typography>
                <TextField
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "35rem", lg: "35rem" },
                  }}
                  label="Сумма"
                  variant="outlined"
                  margin="normal"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <TextField
                  sx={{
                    width: { xs: "100%", sm: "100%", md: "35rem", lg: "35rem" },
                  }}
                  label="ФИО"
                  variant="outlined"
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <GlobalButton onClick={handleSubmit}>Помочь</GlobalButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
