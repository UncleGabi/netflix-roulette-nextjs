import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

import Image from "next/dist/client/image";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

import movieDetailsStyle from "../styles/MovieDetails.module.css";
// import { selectAllMovies } from "../../features/MoviesSlice";

const MovieDetails = ({ selectedMovieData }) => {
  //   const selectedMovieData = useSelector(selectAllMovies).selectedMovie;

  const minConverter = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes - hrs * 60;
    return `${hrs}h ${mins}min`;
  };

  //   useEffect(() => {
  //     if (JSON.stringify(selectedMovieData[0]) !== "{}") {
  //       const header = document.querySelector("#header");
  //       header.scrollIntoView({ behavior: "smooth", block: "center" });
  //       minConverter(selectedMovieData.runtime);
  //     }
  //   }, [selectedMovieData]);

  //   const navigate = useNavigate();

  return (
    <div id="header" className={movieDetailsStyle.movie_data}>
      <div className={movieDetailsStyle.movie_data__header}>
        <div>netflixroulette</div>
        <Link href="/" prefetch>
          <SearchIcon onClick={() => undefined} />
        </Link>
      </div>
      <div className={movieDetailsStyle.movie_data__content}>
        <Image
          width="500"
          height="400"
          loader={() => `${selectedMovieData?.poster_path}`}
          src={`${selectedMovieData?.poster_path}`}
          unoptimized
          alt=""
        />
        <div className={movieDetailsStyle.movie_data__content_details}>
          <div /** className={movieDetailsStyle.main_details} */>
            <div className={movieDetailsStyle.title_rating}>
              <span className={movieDetailsStyle.title}>
                {selectedMovieData?.title}
              </span>
              <span className={movieDetailsStyle.rating}>
                {selectedMovieData?.vote_average}
              </span>
            </div>
            <div className={movieDetailsStyle.genre}>
              {selectedMovieData?.genres?.join(" & ")}
            </div>
          </div>
          <div className={movieDetailsStyle.release_duration}>
            <div className={movieDetailsStyle.release}>
              {new Date(selectedMovieData?.release_date).getFullYear()}
            </div>
            <div className={movieDetailsStyle.duration}>
              {minConverter(selectedMovieData?.runtime)}
            </div>
          </div>
          <div className={movieDetailsStyle.overview}>
            {selectedMovieData?.overview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
