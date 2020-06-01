import React from "react";
import { useHistory } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import Moment from "moment";

import { fbAuth } from "../../services/firebase";

import MoviesData from "../../data/movies.json";

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
    customFilterAndSearch: (term, rowData) => rowData.genres.includes(term),
  },
];

const Home: React.FC = () => {
  const history = useHistory();

  const handleLogout = (): void => {
    fbAuth.signOut();
    history.push("/");
  };

  return (
    <div>
      <p>This is home</p>
      <p>{tableRows.length} movies in the database</p>
      <p>{movieGenres}</p>
      <button onClick={handleLogout}>Logout</button>

      <MaterialTable
        title="Movies Information"
        columns={tableColumns}
        data={tableRows}
        options={{ filtering: true, search: false }}
      />
    </div>
  );
};

export default Home;
