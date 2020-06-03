import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import Moment from "moment";
import { useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Avatar,
  Container,
} from "@material-ui/core";

import { RootState } from "../../store";
import { fbAuth } from "../../services/firebase";

import MoviesData from "../../data/movies.json";
import CommentsList from "../CommentsList/CommentsList";

interface TableMovieData {
  title: string;
  year: number;
  runtime: number;
  revenue: number;
  rating: number;
  genres: Array<string>;
}

const movieGenres: Array<string> = [];

const addMovieGenre = (genres: Array<string>): void => {
  genres.forEach((genre) => {
    if (!movieGenres.includes(genre)) movieGenres.push(genre);
  });
};

const createData = (
  title: string,
  year: string,
  runtime: string,
  revenue: string,
  rating: string,
  genres: Array<string>
): TableMovieData => {
  addMovieGenre(genres);
  return {
    title,
    year: parseInt(year, 10),
    runtime: parseInt(runtime, 10),
    revenue: revenue ? parseFloat(revenue) : 0,
    rating: parseFloat(rating),
    genres,
  };
};

const tableRows = MoviesData.map((movie) =>
  createData(
    movie.title,
    movie.year,
    movie.runtime,
    movie.revenue,
    movie.rating,
    movie.genre
  )
);

const tableColumns: Column<TableMovieData>[] = [
  {
    title: "Title",
    field: "title",
  },
  {
    title: "Year",
    field: "year",
    filtering: false,
  },
  {
    title: "Runtime",
    field: "runtime",
    render: (rowData) =>
      Moment.utc()
        .startOf("day")
        .add({ minutes: rowData.runtime })
        .format("H[h] mm[m]"),
    filtering: false,
  },
  {
    title: "Revenue",
    field: "revenue",
    render: (rowData) => `$${rowData.revenue} M`,
    filtering: false,
  },
  {
    title: "Rating",
    field: "rating",
    filtering: false,
  },
  {
    title: "Genres",
    field: "genres",
    render: (rowData) =>
      rowData.genres.map((genre, index) =>
        rowData.genres.length - 1 !== index ? `${genre}, ` : genre
      ),
  },
];

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  userName: {
    paddingLeft: 10,
  },
  userPhoto: {
    border: "1px solid #ccc",
  },
  footerContainer: {
    margin: "15px 0px",
    color: "#777",
  },
}));

const Home: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.loggedUser.user);

  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");

  const handleClose = (): void => {
    setOpen(false);
    setSelectedMovie("");
    setSelectedMovieTitle("");
  };

  const handleOpenMovieComments = (movieData: TableMovieData | TableMovieData[]) => {
    const clickedMovie = movieData as TableMovieData;
    const movieId = clickedMovie.title.toLowerCase().replace(/[\s/:?!-'".,]/g, "_") + "_" + clickedMovie.year;
    setSelectedMovie(movieId);
    setSelectedMovieTitle(clickedMovie.title);
    setOpen(true);
  };

  const handleLogout = (): void => {
    fbAuth.signOut();
    history.push("/");
  };

  return (
    <div>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Movie Chat
          </Typography>
          <Avatar src={user.photo} className={classes.userPhoto} />
          <Typography
            variant="subtitle1"
            color="inherit"
            className={classes.userName}
          >
            {user.name}
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <br />
      <Container maxWidth="xl">
        <MaterialTable
          title="Movies Information"
          columns={tableColumns}
          data={tableRows}
          actions={[
            {
              icon: 'comment',
              tooltip: 'View Comments',
              onClick: (event, rowData) => handleOpenMovieComments(rowData),
            },
          ]}
          options={{
            filtering: true,
            search: false,
            pageSize: 20,
          }}
        />
      </Container>

      <Container maxWidth="xl" className={classes.footerContainer}>
        <Typography variant="subtitle1">Developed by Jose Avilez for Turtle</Typography>
      </Container>

      <CommentsList open={open} handleClose={handleClose} movieId={selectedMovie} movieTitle={selectedMovieTitle} />
    </div>
  );
};

export default Home;
