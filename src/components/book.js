import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./colorTheme";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import BookComments from "./bookComments";
import { useState } from "react";

export default function Book(props) {
  const { bookTitle, authorName, ISBN, imageUrl, bookComments, setBooks } =
    props;

  const [openComments, setOpenComments] = useState(false);

  const getBookComments = () => {
    setOpenComments(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minheight: 400, width: 250 }}>
        <CardMedia
          component="img"
          sx={{ height: 250, width: "auto" }}
          image={imageUrl}
          alt="book image unavailable"
        />
        <CardContent
          sx={{
            heght: 100,
            textOverflow: "ellipsis",
          }}
        >
          <Tooltip title={bookTitle} placement="top">
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {bookTitle}
            </Typography>
          </Tooltip>
          <Tooltip title={authorName} placement="top">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Author: {authorName}
            </Typography>
          </Tooltip>
          <Tooltip title={ISBN} placement="top">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              ISBN: {ISBN === "" ? "not available" : ISBN}
            </Typography>
          </Tooltip>
        </CardContent>
        <CardActions sx={{ height: 50, marginTop: -2 }}>
          <Button
            variant="contained"
            color="purple"
            onClick={getBookComments}
            sx={{ margin: "auto" }}
          >
            Comments
          </Button>
          <BookComments
            openComments={openComments}
            setOpenComments={setOpenComments}
            bookTitle={bookTitle}
            authorName={authorName}
            ISBN={ISBN}
            imageUrl={imageUrl}
            bookComments={bookComments}
            setBooks={setBooks}
          ></BookComments>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
