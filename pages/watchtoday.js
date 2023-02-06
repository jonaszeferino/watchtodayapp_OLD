import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import { format } from "date-fns";
import Head from "next/head";
import Link from "next/link";

export default function Movieapi() {
  const [movieData, setMovieData] = useState({});
  const [randomMovieId, setRandomMovieId] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = () => {
    setRandomMovieId(Math.floor(Math.random() * 560000));
    setIsLoading(true);
    setError(false);

    console.log("Movie ID: " + randomMovieId);

    const url = `https://api.themoviedb.org/3/movie/${randomMovieId}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError(true);
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
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
          movieId: result.id,
        });
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => setError(true), setIsLoading(false));
  };

  let poster = "/callback.png";
  if (movieData.image) {
    poster = "https://image.tmdb.org/t/p/original" + movieData.image;
  }

  let destino = `/moviepage?movieId=${movieData.movieId}`;

  return (
    <>
      <Head>
        <title>What to Watch Today?</title>
        <meta name="keywords" content="movies,watch,review"></meta>
        <meta
          name="description"
          content="Find everything about movies here"
        ></meta>
      </Head>

      <div>
        <h3 className={styles.title}>Que filme Ver Hoje?</h3>
        <br />

        <br />
        <button onClick={apiCall} className={styles.button}>
          Verificar
        </button>
        <span>{isLoading ? <div>Carregando...</div> : " "}</span>

        {isError === true || movieData.adult === true ? (
          <ErrorPage message={`- Filme Deletado`}></ErrorPage>
        ) : (
          <div>
            <div>
              <h1>
                <br />
                <span className={styles.title}>
                  {movieData.originalTitle ? (
                    <span
                      className={styles.title}
                    >{`${movieData.originalTitle}`}</span>
                  ) : (
                    <span className={styles.title}>
                      O Algoritmo funciona de forma Bem Simples!
                      <br />
                      É gerado de forma randômica um Id, referente a um filme.
                      <br />
                      Existem em nossa base mais de 560 mil filmes.
                      <br />
                      Contudo, pode ser sorteado o id de um filme já deletado.{" "}
                      <br />
                      Basta portando, clicar novamente!
                    </span>
                  )}
                </span>
                <br />
                ...
                <br />
                {movieData.portugueseTitle && (
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
                              {index !== movieData.gender.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                      </td>
                    </tr>
                  </table>
                )}
                <br />
                <br />
              </h1>
              {movieData.portugueseTitle && (
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
              )}
              {movieData.portugueseTitle && (
                <Link href={destino}>
                  <a className={styles.button}>Detalhes</a>
                </Link>
              )}

              <br />
              <br />
              {movieData.portugueseTitle && <span>O que Achou da dica?</span>}
              <br />

              <br />
              {movieData.portugueseTitle && (
                <span>
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
                </span>
              )}

              <br />

              <br />

              <br />
              {movieData.portugueseTitle && (
                <button onClick={apiCall} className={styles.button}>
                  Verificar Novo
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
