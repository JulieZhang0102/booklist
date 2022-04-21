import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, Fragment } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import BookPreview from "./bookPreview";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const steps = ["Enter Book Name", "Choose Right Book", "Confirm and Submit"];

export default function AddBook(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [bookName, setBookName] = useState();
  const [bookResults, setBookResults] = useState([]);
  const [bookSelect, setBookSelect] = useState("No book selected");
  const [bookSelectID, setBookSelectID] = useState();
  const [finalTitle, setFinalTitle] = useState("");
  const [finalAutor, setFinalAuthor] = useState("");
  const [finalISBN, setFinalISBN] = useState("");
  const [finalImageUrl, setFinalImageUrl] = useState("");
  const { setDisplay, setBooks } = props;

  const testExist = () => {
    let exist = false;
    const readableBooks = JSON.parse(localStorage.books);
    for (let book of readableBooks) {
      if (book["title"] === bookName) {
        exist = true;
        alert("We already have this book!");
        break;
      }
    }
    return exist;
  };

  const bookAPI = () => {
    setBookResults([]);
    setBookSelect("No book selected");
    const bookUrl =
      "https://www.googleapis.com/books/v1/volumes?q=title:" +
      bookName +
      "&maxResults=3&&printType=books";
    axios
      .get(bookUrl)
      .then((response) => {
        setBookResults(response["data"]["items"]);
      })
      .catch(function (error) {
        alert(error);
      });
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const generateBooks = () => {
    const booksToShow = [];

    if (bookResults) {
      bookResults.forEach((book, index) =>
        booksToShow.push(
          <Grid item xs={3} align="center" key={index}>
            <BookPreview
              bookID={index}
              setBookInfo={setBookInfo}
              bookTitle={book["volumeInfo"]["title"]}
              authorName={
                ["authors"] in book["volumeInfo"]
                  ? book["volumeInfo"]["authors"]
                  : "not available"
              }
              ISBN={
                ["industryIdentifiers"] in book["volumeInfo"]
                  ? book["volumeInfo"]["industryIdentifiers"][0]["identifier"]
                  : "not available"
              }
              imageUrl={
                ["thumbnail"] in book["volumeInfo"]["imageLinks"]
                  ? book["volumeInfo"]["imageLinks"]["thumbnail"]
                  : ""
              }
            ></BookPreview>
          </Grid>
        )
      );
    }
    return booksToShow;
  };

  const setBookInfo = (bookInfo) => {
    setBookSelectID(bookInfo);
    setBookSelect(bookResults[bookInfo]["volumeInfo"]["title"]);
  };

  const sendBookInfo = () => {
    let selectedTitle = "";
    let selectedAuthor = "";
    let selectedISBN = "";
    let selectedImageUrl = "";

    if (bookSelectID !== 3) {
      selectedTitle = bookResults[bookSelectID]["volumeInfo"]["title"];
      selectedAuthor =
        ["authors"] in bookResults[bookSelectID]["volumeInfo"]
          ? bookResults[bookSelectID]["volumeInfo"]["authors"]
          : "";
      selectedISBN =
        ["industryIdentifiers"] in bookResults[bookSelectID]["volumeInfo"]
          ? bookResults[bookSelectID]["volumeInfo"]["industryIdentifiers"][0][
              "identifier"
            ]
          : "";
      selectedImageUrl =
        ["thumbnail"] in bookResults[bookSelectID]["volumeInfo"]["imageLinks"]
          ? bookResults[bookSelectID]["volumeInfo"]["imageLinks"]["thumbnail"]
          : "";
    }

    handleNext();
    setFinalTitle(selectedTitle);
    setFinalAuthor(selectedAuthor);
    setFinalISBN(selectedISBN);
    setFinalImageUrl(selectedImageUrl);
  };

  const submitBook = (e) => {
    e.preventDefault();
    const newBook = {
      title: finalTitle,
      author: finalAutor,
      isbn: finalISBN,
      imageURL: finalImageUrl,
      comments: [],
    };
    let exist = false;
    const readableBooks = JSON.parse(localStorage.books);
    for (let book of readableBooks) {
      if (book["title"] === finalTitle) {
        alert("We already have this book!");
        exist = true;
        break;
      }
    }
    if (exist === false) {
      readableBooks.push(newBook);
      localStorage.setItem("books", JSON.stringify(readableBooks));
      setBooks(readableBooks);
      setDisplay(false);
      setActiveStep(0);
      alert("Thank you for your recommendation!");
    }
  };

  return (
    <Box px={2}>
      <Box
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <IconButton onClick={() => setDisplay(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box mt={2} sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 0 ? (
          <Fragment>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!testExist()) {
                  bookAPI();
                }
              }}
            >
              <Typography sx={{ mt: 2, mb: 1 }}>
                Please Enter Book Name
              </Typography>
              <TextField
                id="outlined-basic"
                label="required"
                required
                variant="outlined"
                onChange={(e) => setBookName(e.target.value)}
              />
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button type="submit">Next</Button>
              </Box>
            </form>
          </Fragment>
        ) : (
          ""
        )}

        {activeStep === 1 ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Choose the Right Book</Typography>
            <Grid
              container
              sx={{ mt: 3, mb: 1 }}
              justifyContent="center"
              direction="row"
            >
              {generateBooks()}
              <Grid item xs={5} mt={5}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      setBookSelect(
                        "Book not found. Enter book information manually in next step."
                      );
                      setBookSelectID(3);
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" component="div">
                        My book is not here
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} mt={5}>
                <b>Book Selected: </b>
                {bookSelect}
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Button onClick={sendBookInfo}>Next</Button>
            </Box>
          </Fragment>
        ) : (
          ""
        )}

        {activeStep === 2 ? (
          <Fragment>
            <form onSubmit={submitBook}>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Please Enter/Confirm Book information
              </Typography>
              <Grid container>
                <Grid item xs={12} mt={2}>
                  <TextField
                    xs={12}
                    id="title"
                    label="Book Title"
                    required
                    variant="outlined"
                    value={finalTitle}
                    onChange={(e) => setFinalTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <TextField
                    id="author"
                    label="Author"
                    required
                    variant="outlined"
                    value={finalAutor}
                    onChange={(e) => setFinalAuthor(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <TextField
                    id="isbn"
                    label="ISBN"
                    variant="outlined"
                    value={finalISBN}
                    onChange={(e) => setFinalISBN(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <TextField
                    id="imageURL"
                    label="Image URL"
                    variant="outlined"
                    value={finalImageUrl}
                    onChange={(e) => setFinalImageUrl(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Button type="submit">Finish</Button>
              </Box>
            </form>
          </Fragment>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}
