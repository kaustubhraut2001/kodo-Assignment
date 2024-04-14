import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewDetailsPopup = ({
  selectedMovie,
  trailer,
  artists,
  isPopupOpen,
  handleClosePopup,
}) => {
  const [artistArray, setArtistArray] = useState([]);

  useEffect(() => {
    setArtistArray(artists);
  }, [artists]);

  const handleArtistArrayAnimation = () => {
    setArtistArray([...artistArray.slice(1), artistArray[0]]);
  };
  const handlewatchtrailer = () => {
    window.open(`https://www.youtube.com/watch?v=${trailer}`, "_blank");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleArtistArrayAnimation();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [artistArray]);

  return (
    <>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md w-3/4 h-3/4 overflow-y-auto">
            <div className="w-1/2 relative h-full float-left">
              {/* {trailer ? (
                <>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`https://img.youtube.com/vi/${trailer}/0.jpg`}
                      alt="Trailer thumbnail"
                      className="rounded-md cursor-pointer"
                      onClick={() => {
                        const trailerElement = document.querySelector("iframe");
                        trailerElement.contentWindow.postMessage(
                          '{"event":"command","func":"playVideo","args":""}',
                          "*"
                        );
                      }}
                    />
                  </div>
                </>
              ) : ( */}
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`}
                alt={selectedMovie?.title}
                className="rounded-md h-full w-full object-cover"
              />
            </div>
            <div className="w-1/2 pl-4 h-full float-right overflow-y-auto">
              <h2 className="text-xl font-bold mb-2">{selectedMovie?.title}</h2>
              <p className="text-gray-700 mb-2">{selectedMovie?.overview}</p>
              <p className="text-gray-700 mb-2">
                Rating: {selectedMovie?.vote_average}
              </p>
              <p className="text-gray-700 mb-2">
                Votes: {selectedMovie?.vote_count}
              </p>
              <p className="text-gray-700 mb-2">
                Popularity: {selectedMovie?.popularity}
              </p>
              <p className="text-gray-700 mb-2">
                Release Date: {selectedMovie?.release_date}
              </p>

              <h3 className="text-lg font-bold mb-2">Artists:</h3>
              <ul className="flex space-x-2 animate-pulse">
                {artistArray.map((artist) => (
                  <li key={artist.id} className="flex-none">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${artist.profile_path}`}
                      alt={artist.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </li>
                ))}
              </ul>
              <div className="p-2 m-2 flex justify-between">
                <button
                  onClick={handlewatchtrailer}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
                >
                  Watch Trailer
                </button>

                <button
                  onClick={handleClosePopup}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewDetailsPopup;
