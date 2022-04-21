import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function BookPreview(props) {
  const { bookTitle, authorName, ISBN, imageUrl, bookID, setBookInfo } = props;
  return (
    <Card sx={{ minheight: 300, width: 250 }}>
      <CardActionArea
        onClick={() => {
          setBookInfo(bookID);
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 200, width: "auto" }}
          image={imageUrl}
          alt="book image unavailable"
        />
        <CardContent sx={{ minheight: 100 }}>
          <Typography variant="subtitle1" component="div">
            {bookTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {authorName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ISBN: {ISBN}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
