import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import PropTypes from "prop-types";
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

function MovieList({ fetchedMovies }) {
  const router = useRouter();
  const { query, pathname } = router;
  const [openModal, setOpenModal] = useState(undefined);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sorting, _setSorting] = useState({ by: "", dir: "" });
  const [activeGenre, setActiveGenre] = useState(query.genre || "All");
  const [movieId, setMovieId] = useState(-1);
  const [filteredMovies, setFilteredMovies] = useState(fetchedMovies.data);
  const [sortedMovieData, setSortedMovieData] = useState(filteredMovies);

  useEffect(() => {
    const titleFilter = query.title?.toLowerCase();
    if (query.genre) {
      const filteredByGenre = fetchedMovies.data.filter((movie) =>
        movie.genres.includes(query.genre)
      );
      const filteredByTitle = filteredByGenre.filter((movie) => {
        return movie.title.toLowerCase().includes(titleFilter);
      });

      setFilteredMovies(titleFilter ? filteredByTitle : filteredByGenre);
      setSortedMovieData(titleFilter ? filteredByTitle : filteredByGenre);
    } else {
      const filteredByTitle = fetchedMovies.data.filter((movie) => {
        return movie.title.toLowerCase().includes(titleFilter);
      });
      setFilteredMovies(titleFilter ? filteredByTitle : fetchedMovies.data);
      setSortedMovieData(titleFilter ? filteredByTitle : fetchedMovies.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.title]);

  useEffect(() => {
    const titleFilter = query.title?.toLowerCase();
    if (activeGenre === "All") {
      if (titleFilter) {
        const filteredByTitle = fetchedMovies.data.filter((movie) => {
          return movie.title.toLowerCase().includes(titleFilter);
        });

        setFilteredMovies(filteredByTitle);
        setSortedMovieData(filteredByTitle);
      } else {
        setFilteredMovies(fetchedMovies.data);
        setSortedMovieData(fetchedMovies.data);
      }

      Object.keys(query).forEach((param) => {
        if (param === "genre") {
          delete query[param];
        }
      });
      router.replace(
        {
          pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    } else {
      if (titleFilter) {
        const filteredByTitle = fetchedMovies.data.filter((movie) => {
          return movie.title.toLowerCase().includes(titleFilter);
        });
        const filteredByGenre = filteredByTitle.filter((movie) =>
          movie.genres.includes(query.genre)
        );
        setFilteredMovies(query.genre ? filteredByGenre : filteredByTitle);
        setSortedMovieData(query.genre ? filteredByGenre : filteredByTitle);
      } else {
        const filteredByGenre = fetchedMovies.data.filter((movie) =>
          movie.genres.includes(query.genre)
        );
        setFilteredMovies(filteredByGenre);
        setSortedMovieData(filteredByGenre);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.genre]);

  useEffect(() => {
    console.log("filteredMovies", filteredMovies);
  }, [filteredMovies]);

  const setSorting = ({ by, dir }) => {
    let direction = "asc";
    _setSorting((prevState) => {
      if (prevState?.by === by) {
        switch (prevState?.dir) {
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

        if (direction !== "") {
          Router.push({
            query: { ...query, sortingBy: by, sortingDir: direction },
          });
          return { by, dir: direction };
        } else {
          Object.keys(query).forEach((param) => {
            if (["sortDir", "sortBy"].includes(param)) {
              delete query[param];
            }
          });
        }
      } else {
        Router.push({
          query: { ...query, sortingBy: by, sortingDir: dir },
        });
        return { by, dir };
      }
    });
  };

  useEffect(() => {
    if (sorting?.dir.length) {
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
          setActiveGenre(genre);
          Router.push({
            query: { ...query, genre },
          });
        }}
      >
        {genre}
      </li>
    ));
  };

  const renderSortingArrow = () => {
    if (sorting?.dir) {
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
              {sorting?.dir
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
