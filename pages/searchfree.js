import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Discovery() {
  let [searchMovies, setSearchMovies] = useState([]);
  let [searchMovieTotalPages, setSearchMovieTotalPages] = useState("");
  let [searchMovieRealPage, setSearchMovieRealPage] = useState("");
  let [searchMovieTotalResults, setSearchMovieTotalResults] = useState("");
  let [searchText, setSearchText] = useState("");
  // error and pages
  let [page, setPage] = useState(1);
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let urlString = `https://api.themoviedb.org/3/search/multi?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR&query=${searchText}&page=1&include_adult=false`;

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
        <h3 className={styles.title}>Busca Livre</h3>
        <h2 className={styles.label}>
          {" "}
          <br />
          <label type="text">
            Procure Por Texto
            <input
              className={styles.card}
              required={true}
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            ></input>
          </label>
          <br />
          <button className={styles.card} onClick={apiCall}>
            Verificar
          </button>
          <br />
          <br />
          <button
            onClick={previousPage}
            disabled={page <= 1}
            className={styles.card}
          >
            Anterior
          </button>
          <button
            onClick={nextPage}
            disabled={page >= totalPages}
            className={styles.card}
          >
            Próxima
          </button>
          <span>{isLoading ? <div>Carregando...</div> : " "}</span>
        </h2>

        {isError === true ? (
          <ErrorPage message={`- Coloque algum texto`}></ErrorPage>
        ) : (
          <div className={styles.grid}>
            {searchMovies.map((search) => (
              <div className={styles.card} key={search.id}>
                <span>
                  Nome/Título:{" "}
                  {search.media_type === "person"
                    ? search.name
                    : search.media_type === "movie"
                    ? search.title
                    : search.media_type === "tv"
                    ? search.name
                    : "N/A"}
                </span>
                <br />
                <span>
                  Tipo:{" "}
                  {search.media_type === "person"
                    ? "Pessoa"
                    : search.media_type === "movie"
                    ? "Filme"
                    : search.media_type === "tv"
                    ? "TV"
                    : "N/A"}
                </span>{" "}
                <br />
                {search.media_type === "person" ? (
                  <span>
                    Area:{" "}
                    {search.known_for_department === "Directing"
                      ? "Direção"
                      : search.known_for_department === "Production"
                      ? "Produção"
                      : search.known_for_department === "Writing"
                      ? "Roteiro"
                      : search.known_for_department === "Acting"
                      ? "Atuação"
                      : search.known_for_department === "Editing"
                      ? "Edição"
                      : search.known_for_department === "Sound"
                      ? "Som"
                      : search.known_for_department === "Costume & Make-Up"
                      ? "Maquiagem e Figurino"
                      : search.known_for_department === "Camera"
                      ? "Fotografia"
                      : search.known_for_department === "Art"
                      ? "Cenografia"
                      : "N/A"}
                  </span>
                ) : (
                  <span>Nota: {search.vote_average}</span>
                )}
                <br />
                <span>
                  {search.poster_path != null || search.profile_path != null ? (
                    <span>
                      <Image
                        src={
                          search.media_type === "movie"
                            ? "https://image.tmdb.org/t/p/original" +
                              search.poster_path
                            : search.media_type === "person"
                            ? "https://image.tmdb.org/t/p/original/" +
                              search.profile_path
                            : search.media_type === "tv"
                            ? "https://image.tmdb.org/t/p/original" +
                              search.poster_path
                            : "/callback.png"
                        }
                        alt="poster"
                        width="240"
                        height="360"
                      />
                    </span>
                  ) : (
                    <span>
                      <Image
                        src="/callback.png"
                        alt="poster"
                        width="240"
                        height="360"
                      />
                    </span>
                  )}
                  <br />
                </span>
                <span></span> <br />
                <br />
                <Link href="/moviepage">
                  <a>Detalhes</a>
                </Link>
              </div>
            ))}
          </div>
        )}

        <span>
          <button
            onClick={previousPage}
            disabled={page <= 1}
            className={styles.card}
          >
            Anterior
          </button>
          <button
            onClick={nextPage}
            disabled={page >= totalPages}
            className={styles.card}
          >
            Próxima
          </button>
          <br />
          <span>Total Páginas: {totalPages}</span>{" "}
          <span>Página Atual: {currentPage}</span>{" "}
          <span>Total Resultados: {totalResults}</span>{" "}
        </span>
      </div>
    </>
  );
}
