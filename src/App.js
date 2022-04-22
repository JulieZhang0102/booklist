import logo from "./logo.svg";
import "./App.css";
import Book from "./components/book";
import Form from "./components/form";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Theme from "./components/colorTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

function App() {
  const [books, setBooks] = useState([
    {
      title: "Mom & Me & Mom",
      author: "Maya Angelou",
      isbn: "9780679645474",
      imageURL:
        "http://books.google.com/books/content?id=sMg8uIDQPEoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      comments: ["Good Book", "Very interesting stories"],
    },
    {
      title: "Mom's House, Dad's House",
      author: "Isolina Ricci",
      isbn: "9780684830780",
      imageURL:
        "http://books.google.com/books/content?id=Lpxx1-NAOu4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      comments: ["Absolately love it"],
    },
    {
      title: "Think Again",
      author: "Adam Grant",
      isbn: "9781984878106",
      imageURL:
        "http://books.google.com/books/content?id=UhkSEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      comments: ["A lovely book"],
    },
    {
      title: "Don't Make Me Think",
      author: "Steve Krug",
      isbn: "9780321648785",
      imageURL:
        "http://books.google.com/books/content?id=g1QBFJxB_eEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      comments: [
        "After reading it over a couple of hours and putting its ideas to work for the past five years, I can say it has done more to improve my abilities as a Web designer than any other book.",
        "Must Read For Software Developers And UI Designers I already owned the second edition which was printed before mobile devices were common. The author has updated his examples and has added information on mobile devices which he labels as being in the 'Wild West' state currently.",
        "Must Read For Software Developers And UI Designers I already owned the second edition which was printed before mobile devices were common. The author has updated his examples and has added information on mobile devices which he labels as being in the 'Wild West' state currently.",
        "Must Read For Software Developers And UI Designers I already owned the second edition which was printed before mobile devices were common. The author has updated his examples and has added information on mobile devices which he labels as being in the 'Wild West' state currently.",
      ],
    },
    {
      title:
        "Dog Trainer . . . Because Freakin' Awesome Isn't an Official Job Title: Dog Wisdom Quote Journal & Sketchbook - Inspirational Dog Quotes for Life",
      author: "Black Dog Art, Judy A. Burrows",
      isbn: "1720018154",
      imageURL:
        "http://books.google.com/books/content?id=uFe1uwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      comments: ["As a dog lover, you have to read it!"],
    },
  ]);

  const displayBooks = () => {
    const displayBooks = [];
    books.forEach((book, index) =>
      displayBooks.push(
        <Grid item xs={3} mb={6} align="center" key={index}>
          <Book
            bookTitle={book["title"]}
            authorName={book["author"]}
            ISBN={book["isbn"]}
            imageUrl={book["imageURL"]}
            bookComments={book["comments"]}
            setBooks={setBooks}
          ></Book>
        </Grid>
      )
    );
    return displayBooks;
  };

  useEffect(() => {
    if (localStorage.books) {
      setBooks(JSON.parse(localStorage.books));
    } else {
      localStorage.setItem("books", JSON.stringify(books));
    }
  });

  return (
    <main>
      <ThemeProvider theme={Theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="purple">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <img src={logo} alt="App logo" width="50"></img>
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                BookMaster
              </Typography>
              <Form setBooks={setBooks}></Form>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container mt={6}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Grid container>{displayBooks()}</Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </ThemeProvider>
    </main>
  );
}

export default App;
