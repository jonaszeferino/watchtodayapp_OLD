/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import { format } from "date-fns";
import Head from "next/head";

export default function Movieapi() {
  const [movie, setMovie] = useState({});
  let [movieBudget, setMovieBudget] = useState("Não declarado");
  let [movieOriginalTitle, setMovieOriginalTitle] = useState("");
  let [moviePortugueseTitle, setMoviePortugueseTitle] = useState("");
  let [movieOverview, setMovieOverview] = useState("");
  let [movieAverage, setMovieAverage] = useState("");
  let [movieReleaseDate, setMovieReleaseDate] = useState("");
  let [movieImage, setMovieImage] = useState();
  let [movieRatingCount, setMovieRatingCount] = useState("");
  let [moviePopularity, setMoviePopularity] = useState("");
  let [movieCountry, setMovieCountry] = useState("");
  let [movieGender, setMovieGender] = useState([]);

  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let poster = "https://image.tmdb.org/t/p/original" + movieImage;

  let testeBudget = 0;

  const apiCall = (event) => {
    setIsLoading(true);
    let randomic = Math.floor(Math.random() * 560000);
    const url = `https://api.themoviedb.org/3/movie/${randomic}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;
    console.log(`Movie Id: ${randomic} `);

    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setError(false);
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        setMovie(result);
        setMovieGender(result.genres);
        setMovieBudget(result.budget);
        setMovieOriginalTitle(result.original_title);
        setMoviePortugueseTitle(result.title);
        setMovieOverview(result.overview);
        setMovieAverage(result.vote_average);
        setMovieReleaseDate(result.release_date);
        setMovieImage(result.poster_path);
        setMovieCountry(result.production_countries[0].name);
        setMovieRatingCount(result.vote_count);
        setMoviePopularity(result.popularity);
        setMovieGender(result.genres.name);
        setMovieLanguages(result.spoken_languages[0].name);
        setIsLoading(false);
      })
      .catch((error) => setError(true), setIsLoading(false));
  };

  return (
    <>
      <Head>
        <title>O que Assitir Hoje?</title>
        <meta name="keywords" content="movies,watch,review"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>

      <div>
        <h3 className={styles.title}>Que filme Ver Hoje?</h3>
        <h2 className={styles.grid}>
          {" "}
          <br />
          <button onClick={apiCall} className={styles.card}>
            Verificar
          </button>
          <span>{isLoading ? <div>Carregando...</div> : " "}</span>
        </h2>

        {isError === true ? (
          <ErrorPage message={``}></ErrorPage>
        ) : (
          <div>
            <div>
              <h1>
                <span>
                  Orçamento:{" "}
                  {movieBudget > testeBudget
                    ? movieBudget + " US$"
                    : "Valor Não Declarado"}
                </span>{" "}
                <br />
                <span>Nome Original: {`${movieOriginalTitle}`}</span> <br />
                <span>Nome Português: {`${moviePortugueseTitle}`}</span> <br />
                <span>Overview: {`${movieOverview}`}</span> <br />
                <span>Popularidade: {`${moviePopularity}`}</span> <br />
                <span>
                  Nota Média:{" "}
                  {`${movieAverage} - Nº de Votos: ${movieRatingCount} `}
                </span>{" "}
                <br />
                <span>
                  Data de Lançamento:
                  {movieReleaseDate.length > 0
                    ? format(new Date(movieReleaseDate), " dd/MM/yyyy")
                    : ""}
                </span>
                <br />
                <span>País de Origem: {movieCountry}</span> <br />
                {movieGender &&
                  movieGender.map((gender, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <span>
                      {gender.name}
                      {index !== movieGender.length - 1 ? ", " : ""}
                    </span>
                  ))}
                <br />
              </h1>
              <h1>
                <span>
                  {poster != null ? (
                    <img src={poster} alt="poster" width="480" height="720" />
                  ) : (
                    <img
                      src="/callback.png"
                      alt="poster"
                      width="480"
                      height="720"
                    />
                  )}
                </span>
              </h1>

              <br />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
