import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { fbAuth } from "../../services/firebase";
import Movie from "../../data/interfaces";

import MoviesData from "../../data/movies.json";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface TableMovieData {
  title: string;
  year: number;
  runtime: number;
  revenue: number;
  rating: number;
  genres: Array<string>;
}

const createData = (
  title: string,
  year: string,
  runtime: string,
  revenue: string,
  rating: string,
  genres: Array<string>
): TableMovieData => {
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

const Home: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = (): void => {
    fbAuth.signOut();
    history.push("/");
  };

  useEffect(() => {
    console.log({ tableRows });
  }, []);

  return (
    <div>
      <p>This is home</p>
      <p>{tableRows.length} movies in the database</p>
      <button onClick={handleLogout}>Logout</button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Runtime</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Genres</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row) => (
              <TableRow key={`${row.revenue}${row.title}`}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">{Moment.utc().startOf('day').add({ minutes: row.runtime }).format('H[h] mm[m]')}</TableCell>
                <TableCell align="right">${row.revenue} M</TableCell>
                <TableCell align="right">{row.rating}</TableCell>
                <TableCell align="right">{row.genres}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
