import MovieDetails from "../../../Components/MovieDetails";
import MovieList from "../../../Components/MovieList";

const movie = ({ fetchedMovies, selectedMovieData }) => {
  return (
    <>
      <MovieDetails selectedMovieData={selectedMovieData} />
      <MovieList fetchedMovies={fetchedMovies} />
    </>
  );
};

export default movie;

export const getServerSideProps = async (context) => {
  const resAllMovies = await fetch(`http://localhost:4000/movies`);
  const res = await fetch(`http://localhost:4000/movies/${context.params.id}`);
  const fetchedMovies = await resAllMovies.json();
  const selectedMovieData = await res.json();

  return {
    props: {
      fetchedMovies,
      selectedMovieData,
    },
  };
};

// export const getStaticProps = async (context) => {
//   const res = await fetch(`http://localhost:4000/movies/${context.params.id}`);
//   const selectedMovieData = await res.json();

//   return {
//     props: {
//       selectedMovieData,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`http://localhost:4000/movies`);
//   const movies = await res.json();

//   const ids = movies.map((movie) => movie.id);
//   const paths = ids.map((id) => ({ params: { id: `${id}` } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
