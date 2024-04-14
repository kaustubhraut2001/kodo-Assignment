import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import { fetchMovies } from "../hooks/usefetchdata";
import { toast } from "react-toastify";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const loadMoreMovies = async () => {
    try {
      const newMovies = await fetchMovies(page + 1);
    //   console.log(newMovies, "new movies");
      if (newMovies.length > 0) {
        toast.success("Movies loaded successfully", {
          position: "top",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

          theme: "light",
        });
      }
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
    //   console.error("Error  ", error.message);
      toast.error("Error fetching data", {
        position: "top",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    loadMoreMovies();
  }, []);

  return (
    <div className="px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={loadMoreMovies}
          className="mt-10 px-4 py-2 bg-blue-500 text-white rounded "
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default MovieList;
