import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../Components/Header";
import MovieList from "../Components/MovieList";
import homeStyle from "../styles/Home.module.css";

function Home({ fetchedMovies }) {
  return (
    <div className={homeStyle.app}>
      <Head>
        <title>Netflix Roulette</title>
        <meta name="description" content="My first nextjs project" />
      </Head>
      <Header />
      <MovieList fetchedMovies={fetchedMovies} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:4000/movies`);
  const fetchedMovies = await res.json();
  const { params } = context;
  console.log("fetchedMovies", fetchedMovies);

  return {
    props: {
      fetchedMovies,
    },
  };
};

export default Home;
