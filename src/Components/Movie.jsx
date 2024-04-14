import React, { useState } from "react";
import MoviePopup from "./ViewDetailsPopup";
import axios from "axios";
import { toast } from "react-toastify";

const Movie = ({ movie }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [artists, setArtists] = useState([]);

  const handleViewDetails = async (movie) => {
    setSelectedMovie(movie);
    setIsPopupOpen(true);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";
    // Fetch trailer
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movie?.id}/videos`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      setTrailer(response?.data?.results[0]?.key);
    } catch (error) {
      toast.error("Error fetching trailer", {
        position: "top",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    // Fetch artists
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movie?.id}/credits`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      console.log(response, "artist");
      setArtists(response?.data?.cast?.slice(0, 5)); // Get the first 5 artists
    } catch (error) {
      toast.error("Error fetching artists", {
        position: "top",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      //   console.error("Error fetching artists: ", error);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-md">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          className="rounded-t-md mb-4"
        />

        <h2 className="text-xl font-bold mb-2">{movie?.title}</h2>
        <p className="text-gray-700 mb-2">{movie?.overview}</p>
        <p className="text-gray-700 mb-2">Rating: {movie?.vote_average}</p>
        <p className="text-gray-700 mb-2">Votes: {movie?.vote_count}</p>
        <p className="text-gray-700 mb-2">Popularity: {movie?.popularity}</p>
        <p className="text-gray-700 mb-2">
          Release Date: {movie?.release_date}
        </p>

        <button
          onClick={() => handleViewDetails(movie)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          View Details
        </button>
      </div>

      <MoviePopup
        selectedMovie={selectedMovie}
        trailer={trailer}
        artists={artists}
        isPopupOpen={isPopupOpen}
        handleClosePopup={handleClosePopup}
      />
    </>
  );
};

export default Movie;
