import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import { format } from "date-fns";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Discovery() {
  let [movieId, setMovieId] = useState();
  let [searchMovies, setSearchMovies] = useState([]);

  let [page, setPage] = useState(1);
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let urlString =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c";

  const apiCall = (currentPage) => {
    const url = urlString;
    setIsLoading(true);

    console.log(url + " o que chamou");
    console.log(movieId + "Id dos filmes");

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
  return (
    <>
      <div>
        <div className={styles.top}>
          <h3 className={styles.title}>Filmes em Destaque da Semana</h3>
        </div>

        <h2 className={styles.label}>
          <button className={styles.button} onClick={apiCall}>
            Verificar
          </button>
          <br />
          <span className={styles.spantext}>
            {isLoading ? <div>Carregando...</div> : " "}
          </span>
        </h2>

        {isError === true ? (
          <ErrorPage message={`Verifique as Credenciais`}></ErrorPage>
        ) : (
          <div className={styles.grid}>
            {searchMovies.map((search) => (
              <div className={styles.card} key={search.id}>
                <span className={styles.spantext}>Título: {search.title}</span>{" "}
                <br />
                <span className={styles.spantext}>
                  Média: {search.vote_average} - Nº de Votos:{" "}
                  {search.vote_count}
                </span>{" "}
                <br />
                <span className={styles.spantext}>
                  {search.poster_path != null ? (
                    <span className={styles.spantext}>
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
                    <span className={styles.spantext}>
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
                  {search.release_date.length > 0
                    ? format(new Date(search.release_date), " dd/MM/yyyy")
                    : ""}
                </span>
                <br />
                <Link
                  href={{
                    pathname: "/moviepage",
                    query: { movieId: search.id },
                  }}
                >
                  <a className={styles.button}>Detalhes</a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
