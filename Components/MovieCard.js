import React, { useEffect, useState } from "react";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   setSelectedMovie,
//   setEditedMoive,
//   selectAllMovies,
// } from "../../features/MoviesSlice";

import movieCardStyle from "../styles/MovieCard.module.css";

const MovieCard = ({
  id,
  title,
  src,
  genre,
  releaseYear,
  openModal,
  setOpenModal,
  setMovieId,
}) => {
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  //   const dispatch = useDispatch();
  //   const { filteredMovies } = useSelector(selectAllMovies);
  //   const selectedMovieData = filteredMovies?.find((movie) => movie.id === id);
  //   const navigate = useNavigate();

  useEffect(() => {
    setEditDropdownOpen(false);
  }, [openModal]);

  return (
    <Link href="/movies/[id]" as={`/movies/${id}`} prefetch>
      <div
        key={id}
        className={movieCardStyle.movie_card}
        onClick={() => console.log(title)}
      >
        <div className={movieCardStyle.edit_container}>
          {editDropdownOpen ? (
            <div className={movieCardStyle.edit_dropdown}>
              <div
                className={movieCardStyle.close_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditDropdownOpen(false);
                }}
              >
                +
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("Edit");
                  setMovieId(id);
                  // dispatch(setEditedMoive(selectedMovieData));
                }}
                className={movieCardStyle.edit_dropdown__data}
              >
                Edit
              </div>
              <div
                id="delete"
                className={movieCardStyle.edit_dropdown__data}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("Delete");
                  setMovieId(id);
                }}
              >
                Delete
              </div>
            </div>
          ) : (
            <MoreVertIcon
              className={movieCardStyle.edit_icon}
              onClick={(e) => {
                e.stopPropagation();
                setEditDropdownOpen(!editDropdownOpen);
              }}
            />
          )}
        </div>
        <Image
          width="600"
          height="750"
          onClick={() => {
            //   dispatch(setSelectedMovie(id));
          }}
          loader={() => src}
          src={`${src}`}
          unoptimized
          alt={`${title}`}
        />
        <div className={movieCardStyle.movie_details}>
          <div className={movieCardStyle.movie_title}>{title}</div>
          <div className={movieCardStyle.release_year}>{releaseYear}</div>
        </div>
        <div className={movieCardStyle.genres}>
          {Array.isArray(genre) ? genre.join(" & ") : ""}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
