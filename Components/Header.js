import React, { useEffect, useState } from "react";
import Router from "next/router";
// import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import {
//   addMovie,
//   selectAllMovies,
//   setEditedMoive,
//   setSearchMovieTitle,
// } from "../../features/MoviesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useAppDispatch, useAppSelector } from "../../app/redux-hooks";

// import Modal from "../Common/Modal/Modal";
// import Form from "../Common/Modal/Form/Form";

// CSS  MUST BE REFACTORED!!!
import headerStyle from "../styles/Header.module.css";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const [title, setTitle] = useState(searchParams.get("title") || "");
  const [title, setTitle] = useState("");
  //   const dispatch = useDispatch();
  //   const { editedMovie, searchMovieTitle } = useSelector(selectAllMovies);

  const handleChange = (e) => {
    setTitle(e.target.value);
    // dispatch(setSearchMovieTitle(e.target.value));
  };

  const handleSearch = () => {
    //   const currentParams = Object.fromEntries(searchParams.entries());
    Router.push({ query: { title } });
  };

  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.header__title}>
        <div className={headerStyle.header__logo}>
          <span>netflix</span>roulette
        </div>
        <button
          onClick={() => {
            setOpenModal(true);
            // dispatch(
            //   setEditedMoive({
            //     title: "",
            //     vote_average: 0,
            //     genres: [],
            //     release_date: new Date().toLocaleDateString(),
            //     runtime: 0,
            //     overview: "",
            //   })
            // );
          }}
        >
          + Add movie
        </button>
      </div>
      <div className={headerStyle.header__searchContainer}>
        <h2>Find your movie</h2>
        <div>
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={title}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }

              if (e.key === "Escape") {
                setTitle("");
              }
            }}
            autoFocus
          />
          <button id="search" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {/* {openModal && (
        <Modal
          title="Add movie"
          width={900}
          height={750}
          primaryButtonFn={() => {
            // dispatch(
            //   addMovie({
            //     id: uuidv4(),
            //     ...editedMovie,
            //     release_date:
            //       editedMovie.release_date || new Date().toLocaleDateString(),
            //   })
            // );
            setOpenModal(undefined);
          }}
          secondaryButtonFn={() => setOpenModal(undefined)}
          setOpenModal={setOpenModal}
        >
          <Form />
        </Modal>
      )} */}
    </header>
  );
};

export default Header;
