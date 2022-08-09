import React, { useEffect, useState } from "react";
import Router, { useRouter, useSeachParams } from "next/router";
// import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   filterMovies,
//   selectAllMovies,
//   setMovies,
//   sortMovies,
//   deleteMovie,
//   editMovie,
//   setEditedMoive,
//   searchMovies,
//   setSelectedMovie,
// } from "../../features/MoviesSlice";
import axios from "axios";
import PropTypes from "prop-types";

// import Modal from "../Common/Modal/Modal";
// import Form from "../Common/Modal/Form/Form";
import MovieCard from "./MovieCard";

import movieListStyle from "../styles/MovieList.module.css";

const sortingDropdownData = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "release_date",
    label: "Release date",
  },
];

const getQueries = (query) => Object.fromEntries(Object.entries(query));

function MovieList({ fetchedMovies }) {
  const router = useRouter();
  //   const { filteredMovies, editedMovie } = useSelector(selectAllMovies);
  const [searchParams, setSearchParams] = useState(getQueries(router.query));
  //   const allParams = Object.fromEntries(searchParams.entries());
  //   const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(undefined);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sorting, _setSorting] = useState({ by: "", dir: "" });
  const [activeGenre, setActiveGenre] = useState(router.query.genre);
  const [movieId, setMovieId] = useState(-1);
  const [filteredMovies, setFilteredMovies] = useState(fetchedMovies.data);
  const [sortedMovieData, setSortedMovieData] = useState(filteredMovies);
  //   const dispatch = useDispatch();
  //   const location = useLocation();

  useEffect(() => {
    // fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   useEffect(() => {
  //     const query = router.query;
  //     const titleFilter = router.query.title?.toLowerCase();
  //     const filterMovies = fetchedMovies.data.filter((movie) => {
  //       return movie.title.toLowerCase().includes(titleFilter);
  //     });

  //     setFilteredMovies(titleFilter ? filterMovies : fetchedMovies.data);
  //     console.log("filterMovies", filterMovies);

  //     if (!titleFilter) {
  //       delete router.query.title;
  //       Router.push({ query });
  //     }
  //   }, [router.query.title]);

  //   const deleteSearchParam = (params) => {
  //     setSearchParams(
  //       Object.fromEntries(
  //         Object.entries(allParams).filter(([key]) => !params.includes(key))
  //       )
  //     );
  //   };

  const updateData = () => {
    const params = Object.fromEntries(Object.entries(router.query));
    Object.entries(params).forEach(([key, value]) => {
      if (key === "title") {
        if (value) {
          setFilteredMovies(
            fetchedMovies.data.filter(({ title }) => {
              return title?.toLowerCase().includes(value?.toLowerCase());
            })
          );
          //   dispatch(searchMovies(value));
        } else {
          //   deleteSearchParam([key]);
          const selectedGenre = value || "all";
          const searchedMovies =
            fetchedMovies.data.filter((movie) =>
              movie.title.includes(router.query.title)
            ) || fetchedMovies.data;
          if (selectedGenre === "all") {
            setFilteredMovies(searchedMovies);
          } else {
            setFilteredMovies(
              searchedMovies?.filter(({ genres }) => {
                const lowecaseGenres = genres.map((genre) =>
                  genre?.toLowerCase()
                );
                return lowecaseGenres.includes(selectedGenre);
              })
            );
          }
          //   dispatch(filterMovies(selectedGenre));
        }
      }
      if (key === "genre") {
        if (value) {
          setActiveGenre(value);
          const selectedGenre = value || "all";
          const searchedMovies =
            fetchedMovies.data.filter((movie) =>
              movie.title.includes(router.query.title)
            ) || fetchedMovies.data;
          if (selectedGenre === "all") {
            setFilteredMovies(searchedMovies);
          } else {
            setFilteredMovies(
              searchedMovies?.filter(({ genres }) => {
                const lowecaseGenres = genres.map((genre) =>
                  genre?.toLowerCase()
                );
                return lowecaseGenres.includes(selectedGenre);
              })
            );
          }
          //   dispatch(filterMovies(value));

          if (value === "all") {
            // deleteSearchParam([key]);
            setActiveGenre("All");
          }
        }
      }

      const sortBy = router.query.sortBy;
      const sortDir = router.query.sortDir;
      if (sortBy && sortDir) {
        if (sortDir) {
          setFilteredMovies(
            filteredMovies.sort((a, b) => {
              return sortDir === "asc"
                ? a[sortBy].localeCompare(b[sortBy])
                : -a[sortBy].localeCompare(b[sortBy]);
            })
          );
        } else {
          //   state.filteredMovies = state.filteredMovies;
        }
        // dispatch(sortMovies({ by: sortBy || "", dir: sortDir || "" }));
      } else {
        // deleteSearchParam(["sortBy", "sortDir"]);
      }
    });
  };

  useEffect(() => {
    updateData();
    //   // const params = Object.fromEntries(searchParams.entries());
    //   Object.entries(searchParams).forEach(([key, value]) => {
    //     if (key === "title") {
    //       if (value) {
    //         //   dispatch(searchMovies(value));
    //       } else {
    //         //   deleteSearchParam([key]);
    //         //   const selectedGenre = searchParams.get("genre") || "All";
    //         //   dispatch(filterMovies(selectedGenre));
    //       }
    //     }

    //     if (key === "genre") {
    //       if (value) {
    //         setActiveGenre(value);
    //         //   dispatch(filterMovies(value));

    //         if (value === "All") {
    //           //   deleteSearchParam([key]);
    //           setActiveGenre("All");
    //         }
    //       }
    //     }
    //   });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  //   useEffect(() => {
  //     console.log("activeGenre", activeGenre);
  //     const filterMovies = filteredMovies.filter((movie) =>
  //       movie.genres.includes(activeGenre)
  //     );
  //     setFilteredMovies(filterMovies);
  //     // dispatch(filterMovies(activeGenre));
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [activeGenre]);

  const setSorting = ({ by, dir }) => {
    let direction = "asc";
    _setSorting((prevState) => {
      if (prevState.by === by) {
        switch (prevState.dir) {
          case "asc":
            direction = "desc";
            break;
          case "desc":
            direction = "";
            break;
          case "":
            direction = "asc";
            break;
          default:
            direction = "";
            break;
        }

        // dispatch(sortMovies({ by, dir: direction }));
        Router.push({
          query: { sortingBy: by, sortingDir: direction },
        });
        return { by, dir: direction };
      } else {
        // dispatch(sortMovies({ by, dir }));
        Router.push({
          query: { sortingBy: by, sortingDir: dir },
        });
        return { by, dir };
      }
    });
  };

  useEffect(() => {
    let currentParams = Object.fromEntries(Object.entries(router.query));
    const by = router.query.sortBy;
    const dir = router.query.sortDir;
    if (by) {
      Router.push({
        query: {
          ...router.query,
          sortBy: sorting.by || by,
          sortDir: sorting.dir || dir,
        },
      });
      //   setSearchParams({
      //     ...currentParams,
      //     sortBy: sorting.by || by,
      //     sortDir: sorting.dir || dir,
      //   });
    } else {
      //   deleteSearchParam(["sortBy", "sortDir"]);
    }

    if (sorting.dir.length) {
      const sortMovieData = ({ by, dir }) => {
        const sortedData = sortedMovieData.sort((a, b) => {
          if (a[by] > b[by]) {
            return dir === "asc" ? 1 : -1;
          } else if (a[by] < b[by]) {
            return dir === "asc" ? -1 : 1;
          } else {
            return 0;
          }
        });

        setSortedMovieData(sortedData);
      };

      sortMovieData({ by: sorting.by, dir: sorting.dir });
      setOpenDropdown(false);
    } else {
      const unsortedMovieData = sortedMovieData?.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      });

      setSortedMovieData(unsortedMovieData);
      setOpenDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, sortedMovieData]);

  const renderGenreFilterList = () => {
    const genres = [
      "Drama",
      "Romance",
      "Animation",
      "Adventure",
      "Family",
      "Comedy",
      "Fantasy",
      "Sci-fi",
      "Action",
    ].sort();

    return ["All", ...genres].map((genre) => (
      <li
        key={genre}
        className={`${genre === activeGenre ? movieListStyle.active : ""}`}
        onClick={() => {
          Router.push({
            query: { ...router.query, genre },
          });
          //   const currentParams = Object.fromEntries(searchParams.entries());
          //   setSearchParams({ ...currentParams, genre });
          setActiveGenre(genre);
        }}
      >
        {genre}
      </li>
    ));
  };

  const renderSortingArrow = () => {
    if (sorting.dir) {
      return sorting.dir === "asc" ? (
        <span className={movieListStyle.arrow_up} />
      ) : (
        <span className={movieListStyle.arrow_down} />
      );
    } else {
      return <></>;
    }
  };

  return (
    <main className={movieListStyle.movies__container}>
      <div className={movieListStyle.movies_header}>
        <ul>{renderGenreFilterList()}</ul>
        <div className={movieListStyle.movies_handler}>
          <div>Sort by</div>
          <div className={movieListStyle.release_date}>
            <div onClick={() => setOpenDropdown(!openDropdown)}>
              {sorting.dir
                ? sortingDropdownData.find((item) => item.key === sorting.by)
                    .label
                : "Select"}
              {renderSortingArrow()}
            </div>
            {openDropdown && (
              <div className={movieListStyle.sort_dropdown}>
                <div
                  onClick={() => {
                    setSorting({ by: "title", dir: "asc" });
                  }}
                >
                  Title
                </div>
                <div
                  onClick={() => {
                    setSorting({ by: "release_date", dir: "asc" });
                  }}
                >
                  Release date
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={movieListStyle.movies_found}>
        <span>{filteredMovies?.length}</span> movies found
      </div>
      <div className={movieListStyle.movies_list}>
        {filteredMovies?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              src={movie?.poster_path}
              genre={movie.genres}
              rating={movie.vote_average}
              releaseYear={new Date(movie.release_date).getFullYear()}
              duration={movie.runtime}
              overview={movie.overview}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setMovieId={setMovieId}
            />
          );
        })}
      </div>
      {/* {openModal === "Edit" && (
        <Modal
          title="Edit"
          width={900}
          height={750}
          primaryButtonLabel="Submit"
          primaryButtonFn={() => {
            dispatch(editMovie(editedMovie));
            dispatch(
              setEditedMoive({
                title: "",
                vote_average: 0,
                genres: [],
                release_date: new Date().toLocaleDateString(),
                runtime: 0,
                overview: "",
              })
            );
            setOpenModal(false);
          }}
          secondaryButtonLabel="Reset"
          secondaryButtonFn={() => {
            const emptyEditedMovie = Object.fromEntries(
              Object.entries(editedMovie).map((entry) =>
                entry[0] === "id"
                  ? entry
                  : entry[0] === "release_date"
                  ? [entry[0], new Date().toLocaleDateString()]
                  : [entry[0], ""]
              )
            );
            dispatch(setEditedMoive(emptyEditedMovie));
          }}
          setOpenModal={setOpenModal}
          setMovieId={setMovieId}
        >
          <Form />
        </Modal>
      )} */}
      {/* {openModal === "Delete" && (
        <Modal
          title="Delete"
          primaryButtonLabel="Confirm"
          primaryButtonFn={() => {
            dispatch(deleteMovie(movieId));
            setMovieId(-1);
            setOpenModal(false);
          }}
          setOpenModal={setOpenModal}
          setMovieId={setMovieId}
        >
          Are you sure you want to delete this movie?
        </Modal>
      )} */}
    </main>
  );
}

MovieList.prototype = {
  movieData: {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    genre: PropTypes.number.isRequired,
  },
};

export default MovieList;
