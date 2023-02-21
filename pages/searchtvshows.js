import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import { format } from "date-fns";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Discovery() {
  let [searchMovies, setSearchMovies] = useState([]);
  let [searchRatingSort, setSearchRatingSort] = useState("vote_average.desc");
  let [searchVoteCount, setSearchVoteCount] = useState(100);

  let [searchMovieTotalResults, setSearchMovieTotalResults] = useState("");
  let [searchMovieReleaseDateFrom, setSearchMovieReleaseDateFrom] =
    useState(1800);
  let [searchMovieReleaseDateTo, setSearchMovieReleaseDateTo] = useState(2023);

  let [searchMovieTotalPages, setSearchMovieTotalPages] = useState("");
  let [searchMovieRealPage, setSearchMovieRealPage] = useState("");
  let [page, setPage] = useState(1);

  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [searchTvType, setSearchTvType] = useState(null);

  let urlString =
    "https://api.themoviedb.org/3/discover/tv?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR&include_adult=false&include_video=false&vote_count.gte=" +
    searchVoteCount +
    "&vote_count.lte=10000000&sort_by=" +
    searchRatingSort +
    "&air_date.lte.gte=" +
    searchMovieReleaseDateFrom +
    "&air_date.lte.lte=" +
    searchMovieReleaseDateTo +
    "&with_type=" +
    searchTvType;

  const apiCall = (currentPage) => {
    const url = urlString + "&page=" + currentPage;
    setIsLoading(true);

    console.log(url + " o que chamou");
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
          throw new Error("Dados Incorretos");
        }
      })
      .then(
        (result) => (
          setSearchMovies(result.results),
          setSearchMovieTotalPages(result.total_pages),
          setSearchMovieRealPage(result.page),
          setSearchMovieTotalResults(result.total_results),
          setPage(result.page),
          setIsLoading(false)
        )
      )
      .catch((error) => setError(true));
  };

  const nextPage = (event) => {
    setPage(page + 1), apiCall(page + 1);
  };

  const previousPage = (event) => {
    setPage(page - 1), apiCall();
  };

  let totalPages = searchMovieTotalPages;
  let currentPage = searchMovieRealPage;
  let totalResults = searchMovieTotalResults;

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="movies,watch,review"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>
      <div>
        <div className={styles.top}>
          <h3 className={styles.title}> Séries - Programas de TV</h3>
        </div>
        <h2>
          {" "}
          <br />
          <label type="text">
            Ordem:
            <select
              name="select"
              type="text"
              className={styles.card}
              value={searchRatingSort}
              onChange={(event) => setSearchRatingSort(event.target.value)}
            >
              <option className={styles.card} value="vote_average.asc">
                Da Pior Para Melhor Nota
              </option>
              <option className={styles.card} value="vote_average.desc">
                Da Melhor Para Pior Nota
              </option>
            </select>
          </label>
          <br />
          <label type="text">
            Nº de Votos:
            <select
              name="select"
              type="number"
              className={styles.card}
              value={searchVoteCount}
              onChange={(event) => setSearchVoteCount(event.target.value)}
            >
              {" "}
              <option className={styles.card} value="0">
                Mais de 0 votos
              </option>
              <option className={styles.card} value="50">
                Mais de 50 votos
              </option>
              <option className={styles.card} value="100">
                Mais de 100 votos
              </option>
              <option className={styles.card} value="200">
                Mais de 200 votos
              </option>
              <option className={styles.card} value="500">
                Mais de 500 votos
              </option>
              <option className={styles.card} value="1000">
                Mais de 1000 votos
              </option>
              <option className={styles.card} value="5000">
                Mais de 5000 votos
              </option>
            </select>
          </label>
          <label type="text">
            Tipo de Série:
            <select
              name="select"
              type="text"
              className={styles.card}
              value={searchTvType}
              onChange={(event) => setSearchTvType(event.target.value)}
            >
              {" "}
              <option className={styles.card} value="">
                Todos Tipos
              </option>
              <option className={styles.card} value="0">
                Documentário
              </option>
              <option className={styles.card} value="1">
                Notícias
              </option>
              <option className={styles.card} value="2">
                Mini Séries
              </option>
              <option className={styles.card} value="3">
                Realities
              </option>
              <option className={styles.card} value="4">
                Roteirizadas
              </option>
              <option className={styles.card} value="5">
                Talk Show
              </option>
              <option className={styles.card} value="6">
                Videos
              </option>
            </select>
          </label>
          <br />
          <label type="text">
            Ano Inicial:
            <input
              className={styles.card}
              type="number"
              min={1800}
              max={2022}
              value={searchMovieReleaseDateFrom}
              onChange={(event) =>
                setSearchMovieReleaseDateFrom(event.target.value)
              }
            ></input>
          </label>
          <label type="text">
            Ano Final:
            <input
              className={styles.card}
              type="number"
              min={1800}
              max={2023}
              value={searchMovieReleaseDateTo}
              onChange={(event) =>
                setSearchMovieReleaseDateTo(event.target.value)
              }
            ></input>
          </label>
          <br />
          <br />
          <button className={styles.button} onClick={apiCall}>
            Verificar
          </button>
          <br />
          <span>{isLoading ? <div>Carregando...</div> : " "}</span>
        </h2>

        {isError === true ? (
          <ErrorPage message={`Verifique as Credenciais`}></ErrorPage>
        ) : (
          <div className={styles.grid}>
            {searchMovies.map((search) => (
              <div className={styles.card} key={search.id}>
                <span className={styles.spantext}>Título: {search.name}</span>{" "}
                <br />
                <span className={styles.spantext}>
                  Título Original: {search.original_name}
                </span>{" "}
                <br />
                <span className={styles.spantext}>
                  Média: {search.vote_average} - Nº de Votos:{" "}
                  {search.vote_count}
                </span>{" "}
                <br />
                <br />
                <span>
                  {search.poster_path != null ? (
                    <span>
                      {" "}
                      <Image
                        className={styles.card_image}
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          search.poster_path
                        }
                        alt="poster"
                        width="240"
                        height="360"
                      />{" "}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      <Image
                        className={styles.card_image}
                        src="/callback.png"
                        alt="poster"
                        width="240"
                        height="360"
                      />{" "}
                    </span>
                  )}
                  <br />
                </span>
                <br />
                <span className={styles.spantext}>
                  Data de Lançamento:
                  {search.first_air_date.length > 0
                    ? format(new Date(search.first_air_date), " dd/MM/yyyy")
                    : ""}
                </span>
                <br />
                <Link href="/moviepage">
                  <a className={styles.spantext}>Detalhes</a>
                </Link>
              </div>
            ))}
          </div>
        )}
        {searchMovieTotalResults > 0 ? (
          <span>
            <button
              onClick={previousPage}
              disabled={page <= 1}
              className={styles.button}
            >
              Anterior
            </button>
            <span className={styles.button}>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={page >= totalPages}
              className={styles.button}
            >
              Próxima
            </button>
            <br />
            <br />
            <span className={styles.spantext}>
              Total Resultados: {totalResults}
            </span>{" "}
          </span>
        ) : (
          ""
        )}

        {!totalResults ? (
          <span>
            Escolha os filtros acima, e clique em Verificar para uma consulta de
            acordo com o seu desejo!
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
