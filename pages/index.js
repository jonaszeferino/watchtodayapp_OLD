import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import ErrorPage from "./error-page";

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
        <meta name="keywords" content="movies,tvshows,"></meta>
        <meta name="description" content="movies,tvshows"></meta>
      </Head>
      <br />
      <div className={styles.container}>
        <div>
          <div
            className={`${styles.card_image_home} bg-color`}
            style={{ "--my-color": "#B4E1FF" }}
          >
            <Link href="/searchmovies">
              <a>
                <h2> Descubra Filmes</h2>
              </a>
            </Link>
          </div>
        </div>
        <br />
        <div>
          <div
            className={`${styles.card_image_home} bg-color`}
            style={{ "--my-color": "#b0b4ff" }}
          >
            <Link href="/searchmoviesbycountry">
              <a>
                <h2> Filmes Por Língua</h2>
              </a>
            </Link>
          </div>
        </div>
        <br />
        <div>
          <div
            className={`${styles.card_image_home} bg-color`}
            style={{ "--my-color": "#ab87ff" }}
          >
            <Link href="/watchtoday">
              <a>
                <h2> O que Assistir Hoje?</h2>
              </a>
            </Link>
          </div>
        </div>
        <br />
        <div>
          <div
            className={`${styles.card_image_home} bg-color`}
            style={{ "--my-color": "#b0b4ff" }}
          >
            <Link href="/searchtvshows">
              <a>
                <h2> Descubra Séries</h2>
              </a>
            </Link>
          </div>
        </div>
        <br />
        <div>
          <div
            className={`${styles.card_image_home} bg-color`}
            style={{ "--my-color": "#f0c1d2" }}
          >
            <Link href="/searchfree">
              <a>
                <h2>Busca Livre</h2>
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
        <div className={styles.grid}>
          {searchTv.map((searchtv) => (
            <div key={searchTv.id}>
              <br />
              <span className={styles.spantext}>
                {searchtv.original_name}
              </span>{" "}
              <br />
              <span className={styles.spantext}>{searchtv.vote_average}</span>
              <br />
              <span>
                {searchtv.poster_path != null ? (
                  <span className={styles.spantext}>
                    {" "}
                    <Image
                      className={styles.card_image}
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        searchtv.poster_path
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
                <Link
                  href={{
                    pathname: "/tvshowpage",
                    query: { tvShowId: searchtv.id },
                  }}
                >
                  <a className={styles.button}>Detalhes</a>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
