import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import { format } from "date-fns";
import Head from "next/head";

export default function Movieapi() {
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
  let [movieGender0, setMovieGender0] = useState("");
  let [movieGender1, setMovieGender1] = useState("");
  let [movieLanguages, setMovieLanguages] = useState("en");
  let [isError, setError] = useState(false);
  let [movieId, setMovieId] = useState(550);
  let [movieProviderName0, setMovieProviderName0] = useState("");
  let [movieProviderName1, setMovieProviderName1] = useState("");
  let [movieProviderName2, setMovieProviderName2] = useState("");
  let [movieProviderName3, setMovieProviderName3] = useState("");
  let [movieProviderName4, setMovieProviderName4] = useState("");

  // useEffect(() => {}, []);

  let poster = "https://image.tmdb.org/t/p/original" + movieImage;
  let testeBudget = 0;

  const apiCall = (event) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;
    const urlProviders = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c`;
    //fetch 1
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
          throw console.log("Erro 1");
        }
      })
      .then(
        (result) => (
          setMovieBudget(result.budget),
          setMovieOriginalTitle(result.original_title),
          setMoviePortugueseTitle(result.title),
          setMovieOverview(result.overview),
          setMovieAverage(result.vote_average),
          setMovieReleaseDate(result.release_date),
          setMovieImage(result.poster_path),
          setMovieCountry(result.production_countries[0].name),
          setMovieRatingCount(result.vote_count),
          setMoviePopularity(result.popularity),
          setMovieGender0(result.genres[0].name),
          setMovieGender1(result.genres[1].name),
          setMovieLanguages(result.spoken_languages[0].name)
        )
      )
      .catch((error) => setError(true));
    //fetch 2
    fetch(urlProviders, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setError(false);
          return response.json();
        } else {
          throw console.log("Erro 2");
        }
      })
      .then(
        (result_provider) => (
          setMovieProviderName0(
            result_provider.results.BR.flatrate[0].provider_name
          ),
          setMovieProviderName1(
            result_provider.results.BR.flatrate[1].provider_name
          ),
          setMovieProviderName2(
            result_provider.results.BR.flatrate[2].provider_name
          ),
          setMovieProviderName3(
            result_provider.results.BR.flatrate[3].provider_name
          ),
          setMovieProviderName4(
            result_provider.results.BR.flatrate[4].provider_name
          )
        )
      )
      .catch((error) => setError(true));
  };

  return (
    <>
      <Head>
        <title>O que Assitir Hoje?</title>
        <meta name="keywords" content="movies,watch,review"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>

      <label type="text">
        MovieId:
        <input
          className={styles.card}
          type="number"
          min={0}
          max={60000000}
          value={movieId}
          onChange={(event) => setMovieId(event.target.value)}
        ></input>
      </label>

      <div>
        {isError === true ? (
          <ErrorPage message={``}></ErrorPage>
        ) : (
          <div>
            <div>
              <h3 className={styles.title}>{moviePortugueseTitle}</h3>

              {movieImage != null ? (
                <span>
                  {" "}
                  <Image
                    src={poster}
                    alt="poster"
                    width="380"
                    height="570"
                  />{" "}
                </span>
              ) : (
                <span>
                  {" "}
                  <Image
                    src="/callback.png"
                    alt="poster"
                    width="380"
                    height="570"
                  />{" "}
                </span>
              )}

              <h1>
                <span>Nome Original: {`${movieOriginalTitle}`}</span> <br />
                <span>Nome Português: {`${moviePortugueseTitle}`}</span> <br />
                <span>
                  Data de Lançamento:
                  {movieReleaseDate.length > 0
                    ? format(new Date(movieReleaseDate), " dd/MM/yyyy")
                    : ""}
                </span>
                <br />
                <span>
                  Orçamento:{" "}
                  {movieBudget > testeBudget
                    ? movieBudget + " US$"
                    : "Valor Não Declarado"}
                </span>{" "}
                <br />
                <span>Popularidade: {`${moviePopularity}`}</span> <br />
                <span>
                  Nota Média:{" "}
                  {`${movieAverage} - Nº de Votos: ${movieRatingCount} `}
                </span>{" "}
                <br />
                <span>
                  Stremings:{" "}
                  {`${movieProviderName0}${" "}${movieProviderName1}${" "}${movieProviderName2}${" "}${movieProviderName3}${" "}${movieProviderName4}${" "} `}
                </span>{" "}
                <br />
                <span>País de Origem: {movieCountry}</span> <br />
                <span>Língua Original: {movieLanguages}</span> <br />
                <span>
                  Genero:
                  {movieGender1.length > 0
                    ? ` ${movieGender0}, ${movieGender1} `
                    : ` ${movieGender0}`}
                </span>{" "}
                <br />
                <span>Overview: {`${movieOverview}`}</span> <br />
              </h1>
              <button onClick={apiCall}>Verificar</button>
              <br />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
