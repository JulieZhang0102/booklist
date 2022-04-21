import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./colorTheme";
import { Grid } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BookComments(props) {
  const {
    openComments,
    setOpenComments,
    bookTitle,
    authorName,
    ISBN,
    imageUrl,
    bookComments,
    setBooks,
  } = props;

  //   const [newComment, setNewComment] = useState("");

  const displayComments = () => {
    const commentsList = [];
    if (bookComments) {
      bookComments.forEach((comment, index) =>
        commentsList.push(
          <Typography
            variant="subtitle1"
            key={index}
            py={3}
            sx={{ borderBottom: "2px solid #000" }}
          >
            {comment}
          </Typography>
        )
      );
    }
    return commentsList;
  };

  const addComment = (e) => {
    e.preventDefault();
    const newComment = e.target[0].value;
    let count = 0;
    const readableBooks = JSON.parse(localStorage.books);
    for (let book of readableBooks) {
      if (book["title"] === bookTitle) {
        readableBooks[count]["comments"].push(newComment);
        localStorage.setItem("books", JSON.stringify(readableBooks));
      }
      count += 1;
    }
    e.target[0].value = "";
    setBooks(readableBooks);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openComments}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container sx={style}>
          <Grid item xs={12} pb={3} sx={{ borderBottom: "2px solid #000" }}>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <img src={imageUrl} alt="no image available" height="150"></img>
              </Grid>
              <Grid item xs={8.5} pl={0.5}>
                <Typography variant="h5">{bookTitle}</Typography>
                <Typography variant="subtitle1">
                  Author: {authorName}
                </Typography>
                <Typography variant="subtitle1">ISBN: {ISBN}</Typography>
              </Grid>
              <Grid item xs={0.5} alignSelf="flex-start">
                <IconButton onClick={() => setOpenComments(false)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={7}
            mt={3}
            px={4}
            align="left"
            sx={{
              borderRight: "2px solid #000",
              height: 400,
              overflow: "auto",
            }}
          >
            <Typography variant="h5" sx={{ textDecoration: "underline" }}>
              Comments
            </Typography>
            {displayComments()}
          </Grid>
          <Grid item xs={5} mt={3} px={4} align="left">
            <form onSubmit={addComment}>
              <Typography
                variant="h5"
                mb={3}
                xs={12}
                sx={{ textDecoration: "underline" }}
              >
                Add a Comment
              </Typography>
              <TextareaAutosize
                xs={12}
                minRows={10}
                maxRows={21}
                placeholder="Please leave your comments here..."
                style={{
                  width: 250,
                  border: "1.5px solid #000",
                  borderRadius: 5,
                }}
              />
              <Grid container>
                <Grid item xs={8.5}></Grid>
                <Grid item xs={3.5} mt={2}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="purple"
                    sx={{ margin: "auto" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Modal>
    </ThemeProvider>
  );
}
