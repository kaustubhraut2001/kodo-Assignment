import React from "react";

const Movie = ({ movie }) => {
  return (
    <>
      {console.log(movie, "movies in moview componet")}
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

        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          View Details
        </button>
      </div>
    </>
  );
};

export default Movie;
