import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { fbAuth } from "../../services/firebase";
import Movie from "../../data/interfaces";

import MoviesData from "../../data/movies.json";

const Home: React.FC = () => {
  const history = useHistory();

  const [movies, setMovies] = useState<Movie[]>([]);

  const handleLogout = (): void => {
    fbAuth.signOut();
    history.push("/");
  };

  useEffect(() => {
    const obtainedMovies = MoviesData as Movie[];
    setMovies(obtainedMovies);
  }, []);

  return (
    <div>
      <p>This is home</p>
      <p>{movies.length} movies in the database</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
