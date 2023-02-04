/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import { format } from "date-fns";
import Head from "next/head";

export default function Movieapi() {
  const [movieData, setMovieData] = useState({});
  const [movieId, setMovieId] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const apiCall = (event) => {
    setIsLoading(true);
    setMovieId(Math.floor(Math.random() * 560000));
    // setMovieId(550);

    console.log("Id do Filme: " + movieId);

    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;

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
          setError(true);
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }

        setMovieData({
          budget: result.budget,
          originalTitle: result.original_title,
          portugueseTitle: result.title,
          overview: result.overview,
          average: result.vote_average,
          releaseDate: result.release_date,
          image: result.poster_path,
          country: result.production_countries[0].name,
          ratingCount: result.vote_count,
          popularity: result.popularity,
          gender: result.genres.map((genre) => genre.name),
          languages: result.spoken_languages[0].name,
          adult: result.adult,
        });

        setIsLoading(false);
        setStatusCode(result.status_code);

        if (response.status === 404 || result.status_code === 34) {
          apiCall();
        }
      })
      .catch((error) => setError(true), setIsLoading(false));
  };

  //  function LikeMovie(event, likeType) {
  //    event.preventDefault();
  //    const movieObject = {
  //      name: movieOriginalTitle,
  //      id: movieId,
  //      like: likeType,
  //    };

  //   // Positive = 0, Negative = 1, so-so = 2
  //   const url = "http://localhost:3000/api/saveMovieLikes";
  //   fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(movieObject),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => setData(result.status));
  // }

  let poster = "/callback.png";
  if (movieData.image) {
    poster = "https://image.tmdb.org/t/p/original" + movieData.image;
  }

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
          <button onClick={apiCall} className={styles.button}>
            Verificar
          </button>
          <span>{isLoading ? <div>Carregando...</div> : " "}</span>
        </h2>

        {isError === true || movieData.adult === true ? (
          <ErrorPage message={``}></ErrorPage>
        ) : (
          <div>
            <div>
              <h1>
                <br />
                <span
                  className={styles.title}
                >{`${movieData.originalTitle}`}</span>
                <br />
                ...
                <br />
                <table className={styles.table}>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td className={styles.table}>Título em Português</td>
                    <td
                      className={styles.button}
                    >{`${movieData.portugueseTitle}`}</td>
                  </tr>
                  <tr>
                    <td className={styles.table}>Overview</td>
                    <td className={styles.table}>
                      {!movieData.overview ? "Sem infos" : movieData.overview}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.table}>Popularidade</td>
                    <td className={styles.button}>
                      {`${movieData.popularity}`}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.table}>Nota Média</td>
                    <td
                      className={styles.table}
                    >{`${movieData.average}- Nº de Votos: ${movieData.ratingCount}`}</td>
                  </tr>

                  <tr>
                    <td className={styles.table}>País de Origem</td>
                    <td className={styles.table}> {movieData.country}</td>
                  </tr>
                  <tr>
                    <td className={styles.table}>Generos</td>
                    <td className={styles.table}>
                      {movieData.gender &&
                        movieData.gender.length > 0 &&
                        movieData.gender.map((gender, index) => (
                          <span key={gender}>
                            {gender}
                            {index !== movieData.gender.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </td>
                  </tr>
                </table>
                <br />
                <br />
              </h1>
              <h1>
                <span>
                  {poster != null ? (
                    <img
                      className={styles.card_image_big}
                      src={poster}
                      alt="poster"
                      width="480"
                      height="720"
                    />
                  ) : (
                    <Image
                      className={styles.card_image_big}
                      src="/callback.png"
                      alt="poster"
                      width="480"
                      height="720"
                    />
                  )}
                </span>
              </h1>
              <span>O que Achou da dica?</span>
              <br />
              <br />
              <button
                onClick={() => LikeMovie(event, "0")}
                className={`${styles.button_green}`}
              >
                Gostei
              </button>
              <button
                onClick={() => LikeMovie(event, "1")}
                className={`${styles.button_red}`}
              >
                Não Gostei
              </button>
              <button
                onClick={() => LikeMovie(event, "2")}
                className={`${styles.button_yellow}`}
              >
                mais ou Menos
              </button>

              <br />
              <br />
              <button onClick={apiCall} className={styles.button}>
                Verificar Novo
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
