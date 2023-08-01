import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import ErrorPage from "./error-page";
import { ChakraProvider, Progress, Container } from "@chakra-ui/react";
import { FaFilm } from 'react-icons/fa';
// import SearchBar from "../components/SearchBar";



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

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="movies,tvshows,"></meta>
        <meta name="description" content="movies,tvshows"></meta>
      </Head>
      {/* <SearchBar isLoading={isLoading} /> */}


      <div>
    
        <div>
        <h3 className={styles.title}> Filmes Destaques da Semana</h3>
        <div className={styles.top}>
        
  <h3 className={styles.title}>
    
    <br />
    <span>...</span>
    
    
  </h3>
</div>
          <h2 className={styles.label}>
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
                    <div style={{ maxWidth: "240px", margin: "0 auto" }}>
                      <ChakraProvider>
                        <Progress
                          hasStripe
                          value={search.vote_average}
                          max={10}
                          colorScheme={getProgressColor(search.vote_average)}
                        />
                      </ChakraProvider>
                    </div>
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
                      pathname: "/movie-page",
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
<h3 className={styles.title}> Series Destaques da Semana</h3>
        <div className={styles.top}>
          <h3 className={styles.title}>
            {/* Series Destaques da Semana */}
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
              <div style={{ maxWidth: "240px", margin: "0 auto" }}>
                <ChakraProvider>
                  <Progress
                    hasStripe
                    value={searchtv.vote_average}
                    max={10}
                    colorScheme={getProgressColor(searchtv.vote_average)}
                  />
                </ChakraProvider>
              </div>
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
                    pathname: "/tvshow-page",
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
