import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import { format } from "date-fns";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import {
  ChakraProvider,
  Progress,
  Select,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button
} from "@chakra-ui/react";

export default function Discovery() {
  let [movieId, setMovieId] = useState();
  let [searchMovies, setSearchMovies] = useState([]);
  let [searchRatingSort, setSearchRatingSort] = useState("vote_average.desc");
  let [searchVoteCount, setSearchVoteCount] = useState(5000);
  let [searchMovieReleaseDateFrom, setSearchMovieReleaseDateFrom] =
    useState(1800);
  let [searchMovieReleaseDateTo, setSearchMovieReleaseDateTo] = useState(2023);
  //paginação
  let [page, setPage] = useState(1);
  let [searchMovieTotalPages, setSearchMovieTotalPages] = useState("");
  let [searchMovieRealPage, setSearchMovieRealPage] = useState("");
  let [searchMovieTotalResults, setSearchMovieTotalResults] = useState("");
  // erro e loading
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let urlString =
    "https://api.themoviedb.org/3/discover/movie?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR&include_adult=false&include_video=false&vote_count.gte=" +
    searchVoteCount +
    "&vote_count.lte=10000000&sort_by=" +
    searchRatingSort +
    "&primary_release_date.gte=" +
    searchMovieReleaseDateFrom +
    "&primary_release_date.lte=" +
    searchMovieReleaseDateTo;

  const apiCall = (currentPage) => {
    const url = urlString + "&page=" + currentPage;
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
    setPage(page - 1), apiCall(page - 1);
  };

  let totalPages = searchMovieTotalPages;
  let currentPage = searchMovieRealPage;
  let totalResults = searchMovieTotalResults;

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
    <>
      <Head>
        <title>Descubra Filmes</title>
        <meta name="keywords" content="movies,watch,review"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>
      <div>
        <div className={styles.top}>
          <h3 className={styles.title}> Descubra Filmes</h3>
          <span>Escolha os filtros abaixo, e ordene a consulta de
            acordo com o seu desejo! </span>
        </div>

        <h2 className={styles.label}>
          {" "}
          <br />
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <ChakraProvider>
              <FormLabel htmlFor="ordenation">Ordenação do Resultado</FormLabel>
              <Select
                id="ordenation"
                placeholder="Ordenação"
                type="text"
                isRequired={true}
                value={searchRatingSort}
                onChange={(event) => setSearchRatingSort(event.target.value)}
              >
                <option value="vote_average.asc">
                  Da Pior Nota Para Melhor
                </option>
                <option value="vote_average.desc">
                  Da Melhor Nota Para Pior
                </option>
              </Select>
            </ChakraProvider>
          </div>
          <br />
          <label></label>
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <ChakraProvider>
              <FormLabel htmlFor="votes">Range de Votos</FormLabel>
              <Select
                id="votes"
                placeholder="Número de Votos"
                type="number"
                isRequired={true}
                value={searchVoteCount}
                onChange={(event) => setSearchVoteCount(event.target.value)}
              >
                <option value="0">0 Votos</option>
                <option value="50">Mais de 50</option>
                <option value="100">Mais de 100</option>
                <option value="200">Mais de 100</option>
                <option value="500">Mais de 500</option>
                <option value="1000">Mais de 1000</option>
                <option value="5000">Mais de 5000</option>
              </Select>
            </ChakraProvider>
          </div>
          <br />
          <div style={{ maxWidth: "150px", margin: "0 auto" }}>
            <ChakraProvider>
              <FormLabel htmlFor="year">Ano do Filme</FormLabel>
              <NumberInput
                id="year"
                min={1800}
                max={2022}
                value={searchMovieReleaseDateFrom}
                onChange={(valueString, valueNumber) =>
                  setSearchMovieReleaseDateFrom(valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <NumberInput
                id="year"
                min={1800}
                max={2023}
                value={searchMovieReleaseDateTo}
                onChange={(valueString, valueNumber) =>
                  setSearchMovieReleaseDateTo(valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </ChakraProvider>
          </div>
  
          <br />
          <ChakraProvider>
          <Button
                size="lg"
                colorScheme="purple"
                mt="24px"
                onClick={apiCall}
              >
                Verificar
              </Button>
              </ChakraProvider>
          <br />
          {!searchMovies ? (
            <div>
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
            </div>
          ) : (
            ""
          )}
          <span className={styles.spantext}>
            {isLoading ? (

              
              <ChakraProvider>
                <Progress size="xs" isIndeterminate />{" "}
              </ChakraProvider>
            ) : null}

            {/* {isLoading ? <div>Carregando...</div> : " "} */}
          </span>
        </h2>

        {isError === true ? (
          <ErrorPage message={`Verifique as Credenciais`}></ErrorPage>
        ) : (
          <div className={styles.grid}>
            {searchMovies.map((search) => (
              <div key={search.id}>
                <span className={styles.spantext}>{search.original_title}</span>{" "}
                <br />
                <span className={styles.spantext}>{search.title}</span> <br />
                <div style={{ maxWidth: "240px", margin: "0 auto" }}>
                  <ChakraProvider>
                    <Progress
                      hasStripe
                      value={search.vote_average}
                      max={10}
                      colorScheme={getProgressColor(search.vote_average)}
                    />
                  </ChakraProvider>
                  <br />
                </div>
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
                {/* <span className={styles.spantext}>Movie Id: {search.id}</span>{" "} */}
                <span className={styles.spantext}>
                  Média: {search.vote_average} - Nº de Votos:{" "}
                  {search.vote_count}
                </span>{" "}
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

        <span className={styles.spantext}>
          {!searchMovies ? (
            <div>
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
            </div>
          ) : (
            ""
          )}
          <br />
          {!searchMovies ? (
            <div>
              <span className={styles.spantext}>
                Total Paginas: {totalPages}{" "}
              </span>{" "}
              <span className={styles.spantext}>
                Pagina Atual: {currentPage}
              </span>{" "}
              <span className={styles.spantext}>
                Total Resultados: {totalResults}
              </span>{" "}
            </div>
          ) : (
            ""
          )}
        </span>

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
          <span className={styles.spantext}>
            {/* Escolha os filtros acima, e clique em Verificar para uma consulta de
            acordo com o seu desejo! Escolha as Opções:
            <ul>Ordem das Notas</ul>
            <ul>Número de Avaliações</ul>
            <ul>Ano de lançamento</ul> */}
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
