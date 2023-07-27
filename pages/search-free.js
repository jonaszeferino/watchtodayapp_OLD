import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import Head from "next/head";
import {
  Box,
  Button,
  Input,
  Spinner,
  Text,
  ChakraProvider,
  Center,
} from "@chakra-ui/react";

export default function Discovery() {
  let [movieId, setMovieId] = useState();
  let [searchMovies, setSearchMovies] = useState([]);
  let [searchText, setSearchText] = useState("");
  //paginação
  let [page, setPage] = useState(1);
  let [searchMovieTotalPages, setSearchMovieTotalPages] = useState("");
  let [searchMovieRealPage, setSearchMovieRealPage] = useState(1);
  let [searchMovieTotalResults, setSearchMovieTotalResults] = useState("");
  // erro e loading
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const apiCall = (currentPage) => {
    setIsLoading(true);
    setError(false);

    const url = `https://api.themoviedb.org/3/search/multi?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR&query=${searchText}&include_adult=false&page=1`;
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
    setIsLoading(false);
  };

  const nextPage = (event) => {
    setPage(page + 1), apiCall(page + 1);
  };

  const previousPage = (event) => {
    setPage(page - 1), apiCall(page - 1);
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
          <h3 className={styles.title}> Busca Livre</h3>
          <span>Procure, Pessoas, Séries, Filmes</span>
        </div>
        <ChakraProvider>
          <Center>
            <Box>
              <br />
              <Input
                required={true}
                type="search"
                placeholder="Digite o texto aqui"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />

              <Button
                size="lg"
                colorScheme="purple"
                mt="24px"
                onClick={() => {
                  apiCall();
                }}
              >
                Verificar
              </Button>

              <Box>
                <Text className={styles.spantext}>
                  {isLoading ? <Spinner /> : " "}
                </Text>
              </Box>
            </Box>
          </Center>
        </ChakraProvider>

        {isError === true ? (
          <ErrorPage message={`Verifique as Credenciais`}></ErrorPage>
        ) : (
          <div className={styles.grid}>
            {searchMovies.map((search) => (
              <div key={search.id}>
                <span className={styles.spantext}>
                  {search.media_type === "person" ? (
                    <span>Nome: </span>
                  ) : (
                    <span>Título: </span>
                  )}
                  {search.media_type === "person"
                    ? search.name
                    : search.media_type === "movie"
                    ? search.title
                    : search.media_type === "tv"
                    ? search.name
                    : "N/A"}
                </span>
                <br />
                {search.media_type === "person" ? (
                <span> Posição: {search.known_for_department}</span>
                ) : (null)}

                <br />
                {search.media_type != "person" ? (
                  <span className={styles.spantext}>
                    {search.poster_path != null ? (
                      <span className={styles.spantext}>
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
                        <Image
                          className={styles.card_image}
                          src="/callback.png"
                          alt="poster"
                          width="240"
                          height="360"
                        />
                      </span>
                    )}
                    <br />
                  </span>
                ) : null}

                {search.media_type === "person" ? (
                  <span className={styles.spantext}>
                    {search.profile_path != null ? (
                      <span className={styles.spantext}>
                        <Image
                          className={styles.card_image}
                          src={
                            "https://image.tmdb.org/t/p/original" +
                            search.profile_path
                          }
                          alt="poster"
                          width="240"
                          height="360"
                        />{" "}
                      </span>
                    ) : (
                      <span className={styles.spantext}>
                        <Image
                          className={styles.card_image}
                          src="/callback.png"
                          alt="poster"
                          width="240"
                          height="360"
                        />
                      </span>
                    )}
                    <br />
                  </span>
                ) : null}


                {search.media_type === "person" ? (
                  <Link
                    href={{
                      pathname: "/person-page",
                      // query: { movieId: search.id },
                    }}
                  >
                    <a className={styles.button}>Detalhes Person</a>
                  </Link>
                ) : null}

                {search.media_type === "movie" ? (
                  <Link
                    href={{
                      pathname: "/movie-page",
                      // query: { movieId: search.id },
                    }}
                  >
                    <a className={styles.button}>Detalhes Movie</a>
                  </Link>
                ) : null}

                {search.media_type === "tv" ? (
                  <Link
                    href={{
                      pathname: "/tvshow-page",
                      // query: { movieId: search.id },
                    }}
                  >
                    <a className={styles.button}>Detalhes TV</a>
                  </Link>
                ) : null}

                <br />
                <br />
              </div>
            ))}
          </div>
        )}

        <span className={styles.spantext}>
          <br />
        </span>

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
      </div>
    </>
  );
}
