import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import TranslationComponent from "../components/translateComponent";
import TranslationComponentCountryName from "../components/translateComponentCountryName";
import { ChakraProvider, Progress } from "@chakra-ui/react";

export default function Movieapi() {
  const [movieData, setMovieData] = useState({});
  const [randomMovieId, setRandomMovieId] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(0);

  useEffect(() => {
    if (isError) {
      apiCall();
    }
  });

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
          originalLanguage: result.original_language,
          statusMovie: result.status,
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

  function getProgressColor(progressValue) {
    if (progressValue >= 0.1 && progressValue <= 3.999) {
      return "red";
    } else if (progressValue >= 4.0 && progressValue <= 5.999) {
      return "yellow";
    } else if (progressValue >= 6 && progressValue <= 7.999) {
      return "green";
    } else if (progressValue >= 8 && progressValue <= 10) {
      return "blue";
    } else {
      return "gray";
    }
  }

  const movieDataInsert = {
    movie_id: movieData.movieId,
    like_movie: like,
    movie_name: movieData.originalTitle,
    user_id: "1",
  };

  const insertMovieData = (movieDataInsert) => {
    setLike(0);
    const url = "https://watchtodayapp-apa8.vercel.app/api/v1/insertLike";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieDataInsert),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          console.log("Dados inseridos com sucesso!");
        } else {
          console.log("Erro ao inserir dados");
        }
      })
      .catch((error) => {
        console.log("Erro ao inserir dados: " + error);
      });
  };

  const handleLike = (value) => {
    console.log(value, "veraqui");
    setLike(value);
    const updatedMovieDataInsert = {
      ...movieDataInsert,
      like_movie: value,
    };
    insertMovieData(updatedMovieDataInsert);
  };

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
        <div className={styles.top}>
          <h3 className={styles.title}>Que filme Assistir Hoje?</h3>
        </div>

        <br />

        <br />
        <button onClick={apiCall} className={styles.button}>
          Verificar
        </button>
        <br />

        {isLoading ? <Progress size="xs" isIndeterminate /> : null}

        {/* <span>{isLoading ? <div>Carregando...</div> : " "}</span> */}
        <br />
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
                    <span className={styles.button_green_card}>
                      O algoritmo funciona selecionando um ID de filme
                      <br />
                      aleatoriamente a partir de uma base de mais de 560 mil
                      filmes.
                      <br />
                      Caso o filme correspondente ao ID selecionado tenha sido
                      deletado, <br />
                      basta clicar novamente para gerar um novo ID.
                      <br />
                      Have Fun!
                    </span>
                  )}
                </span>
                <br />

                {movieData.portugueseTitle ? (
                  <span>{movieData.average}/10</span>
                ) : null}
                <br />
              </h1>

              <div style={{ maxWidth: "480px", margin: "0 auto" }}>
                <ChakraProvider>
                  <Progress
                    hasStripe
                    value={movieData.average}
                    max={10}
                    colorScheme={getProgressColor(movieData.average)}
                  />
                </ChakraProvider>
                <br />
              </div>

              {movieData.portugueseTitle && (
                <h1>
                  <span>
                    {poster != null ? (
                      // eslint-disable-next-line @next/next/no-img-element
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
                <table className={styles.tableMain}>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td className={styles.table}>Título em Português</td>
                    <td
                      className={styles.table}
                    >{`${movieData.portugueseTitle}`}</td>
                  </tr>

                  <tr>
                    <td className={styles.table}>Nota Média</td>
                    <td
                      className={styles.table}
                    >{`${movieData.average} / ${movieData.ratingCount} votos`}</td>
                  </tr>
                  <tr>
                    <td className={styles.table}>País de Origem</td>
                    <td className={styles.table}>
                      {" "}
                      <TranslationComponentCountryName
                        text={movieData.country}
                        language="pt"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.table}>Idioma do Filme</td>
                    <td className={styles.table}>
                      {" "}
                      <TranslationComponent
                        text={movieData.originalLanguage}
                        language="pt"
                      />
                    </td>
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
              )}
              <br />
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
                    onClick={() => handleLike(1)}
                    className={styles.button_green}
                  >
                    Gostei
                  </button>
                  <button
                    onClick={() => handleLike(2)}
                    className={styles.button_red}
                  >
                    Não Gostei
                  </button>

                  <button
                    onClick={() => handleLike(3)}
                    className={styles.button_yellow}
                  >
                    Indiferente
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
