import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import ErrorPage from "./error-page";
import { format } from "date-fns";

export default function Home() {
  let [movieId, setMovieId] = useState();
  let [searchMovies, setSearchMovies] = useState([]);
  let [page, setPage] = useState(1);
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [searchTv, setSearchTv] = useState([]);

  const urlString =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c";

  const apiCall = (currentPage) => {
    const url = urlString;
    setIsLoading(true);

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
      .then((result) => {
        setSearchMovies(result.results);
        setPage(result.page);
        setIsLoading(false);
      })
      .catch((error) => setError(true));
  };

  useEffect(() => {
    apiCall(page);
  }, [page]);

  const urlStringTv =
    "https://api.themoviedb.org/3/trending/tv/week?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c";

  const apiCallTv = (currentPage) => {
    const urlTv = urlStringTv;
    setIsLoading(true);

    fetch(urlTv, {
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
      .then((result) => {
        setSearchTv(result.results);
        setIsLoading(false);
      })
      .catch((error) => setError(true));
  };
  useEffect(() => {
    apiCallTv(page);
  }, [page]);

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="nba,franchise,teams"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>

      <br />

      <div className={styles.container}>
        <div>
          <h2> Descubra Filmes</h2>
          <div className={styles.card_image_home}>
            <Link href="/searchmovies">
              <a>
                {" "}
                <Image
                  src="/DescubraFilmes.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>

        <br />

        <div>
          <h2> Filmes Por Língua</h2>
          <div className={styles.card_image_home}>
            <Link href="/searchmoviesbycountry">
              <a>
                <Image
                  src="/CinemaCountries.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>
        <br />

        <div>
          <h2> O que Assistir Hoje?</h2>
          <div className={styles.card_image_home}>
            <Link href="/watchtoday">
              <a>
                <Image
                  src="/OqueAssistirHojeFix.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>
        <br />

        <div>
          <h2> Descubra Séries</h2>
          <div className={styles.card_image_home}>
            <Link href="/searchtvshows">
              <a>
                {" "}
                <Image
                  src="/tvShows.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>
        <br />

        <div>
          <h2>Busca Livre</h2>
          <div className={styles.card_image_home}>
            <Link href="/searchfree">
              <a>
                {" "}
                <Image
                  src="/freeSearch.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>
        <br />
        <br />

        <br />
      </div>
      <div>
        <br />
        <br />

        <div>
          <div className={styles.top}>
            <h3 className={styles.title}>
              Filmes Destaques da Semana
              <br />
              <span>...</span>
            </h3>
          </div>

          <h2 className={styles.label}>
            {/* <button className={styles.button} onClick={apiCall}>
              Verificar
            </button> */}
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
                <div key={search.id}>
                  <span className={styles.spantext}>{search.title}</span> <br />
                  <span className={styles.spantext}>
                    {search.vote_average}
                    {/* - Nº de Votos:{" "}
                    {search.vote_count} */}
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
                  <Link
                    href={{
                      pathname: "/moviepage",
                      query: { movieId: search.id },
                    }}
                  >
                    <a className={styles.button}>Detalhes</a>
                  </Link>
                  <br />
                  <br />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.top}>
          <h3 className={styles.title}>
            Series Destaques da Semana
            <br />
            <span>...</span>
          </h3>
        </div>
        <span>Series Destaques da Semana aqui pra baixo</span>
        <div></div>
      </div>
    </div>
  );
}
