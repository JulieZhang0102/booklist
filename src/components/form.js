import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import theme from "./colorTheme";
import { ThemeProvider } from "@mui/material/styles";
import AddBook from "./addBook";

export default function Form(props) {
  const [display, setDisplay] = useState(false);
  const { setBooks } = props;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => setDisplay(true)}
          variant="outlined"
          color="pink"
        >
          Recommend Book
        </Button>
      </ThemeProvider>
      <Drawer anchor="top" open={display}>
        <AddBook setDisplay={setDisplay} setBooks={setBooks}></AddBook>
      </Drawer>
    </div>
  );
}
