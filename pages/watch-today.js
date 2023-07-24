import { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import TranslationComponent from "../components/translateComponent";
import TranslationComponentCountryName from "../components/translateComponentCountryName";
import {
  ChakraProvider,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Text,
  Button,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Alert,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

export default function Movieapi() {
  const [movieData, setMovieData] = useState({});
  const [randomMovieId, setRandomMovieId] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(0);
  const [isLikeDisabled, setLikeDisable] = useState(false);
  const [likeThanks, setLikeThanks] = useState(false);
  const [dateNow, setDatenow] = useState(new Date());

  useEffect(() => {
    if (isError) {
      apiCall();
    }
  });
  const posterRef = useRef(null);

  const apiCall = () => {
    if (!isError && posterRef.current) {
      posterRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setRandomMovieId(Math.floor(Math.random() * 560000));
    setIsLoading(true);
    setError(false);
    setLikeDisable(false);
    setLikeThanks(false);

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

  let destino = `/movie-page?movieId=${movieData.movieId}`;

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
    createdDate: dateNow,
  };

  const insertMovieData = (movieDataInsert) => {
    setLike(0);
    const url = "https://watchtodayapp.vercel.app/api/v1/insertLike";

    console.log(url, "veraqui");

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
          console.log("Dados inseridos com sucesso!", "veraqui");
        } else {
          console.log("Erro ao inserir dados", "veraqui");
        }
      })
      .catch((error) => {
        console.log("veraqui " + error);
      });
  };

  const handleLike = (value) => {
    console.log(value, "veraqui");
    setLike(value);
    setLikeDisable(false);

    const updatedMovieDataInsert = {
      ...movieDataInsert,
      like_movie: value,
    };
    insertMovieData(updatedMovieDataInsert);
  };

  console.log(isLikeDisabled, "like");

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
        {/* <div className={styles.top}>
          <h3 className={styles.title}>Que filme Assistir Hoje?</h3>
        </div> */}
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <ChakraProvider>
            <Box maxW="32rem">
              <div className={styles.top}>
                <h3 className={styles.title}> O que ver hoje?</h3>
                <span>
                  {" "}
                  Clique e veja as possibilidades até que um seja do seu agrado!
                </span>
              </div>
              {/* <Heading mb={4}>Que filme Assistir hoje?</Heading>
              <Text fontSize="xl">
                Clique e veja as possibilidades até que um seja do seu agrado!
              </Text> */}
              <Button
                size="lg"
                colorScheme="purple"
                mt="24px"
                onClick={apiCall}
              >
                Verificar
              </Button>
            </Box>
          </ChakraProvider>
        </div>

        <br />

        <br />

        {isLoading ? <Progress size="xs" isIndeterminate /> : null}

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
                    <ChakraProvider>
                      <Box bg="green.100" p={4}>
                        <Alert
                          margin="20px"
                          status="success"
                          variant="subtle"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                          fontSize="12px"
                        >
                          <AlertIcon boxSize="50px" mr={2} />
                          <AlertTitle mt={4} mb={1} fontSize="lg">
                            Como Funciona!
                          </AlertTitle>
                          <AlertDescription
                            maxWidth="xl"
                            sx={{ backgroundColor: "transparent", padding: 0 }}
                          >
                            O algoritmo seleciona um ID de filme aleatoriamente
                            a partir de uma base de mais de 560 mil filmes. Caso
                            o ID do filme selecionado tenha sido deletado, basta
                            clicar novamente para gerar um novo ID. Have Fun!
                          </AlertDescription>
                        </Alert>
                      </Box>
                    </ChakraProvider>
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
                  <span ref={posterRef}>
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
                <div style={{ maxWidth: "480px", margin: "0 auto" }}>
                  <ChakraProvider>
                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Td
                              style={{
                                fontFamily: "Helvetica Neue, sans-serif",
                              }}
                            >
                              Título Em Português
                            </Td>
                            <Td
                              style={{
                                fontFamily: "Helvetica Neue, sans-serif",
                              }}
                            >
                              {movieData.portugueseTitle}
                            </Td>
                          </Tr>
                        </Thead>
                        <Tbody></Tbody>
                      </Table>
                      <Tabs size="md" variant="enclosed">
                        <TabList>
                          <Tab
                            style={{
                              fontFamily: "Helvetica Neue, sans-serif",
                            }}
                          >
                            Nota Média
                          </Tab>
                          <Tab
                            style={{
                              fontFamily: "Helvetica Neue, sans-serif",
                            }}
                          >
                            País de Origem
                          </Tab>
                          <Tab
                            style={{
                              fontFamily: "Helvetica Neue, sans-serif",
                            }}
                          >
                            Idioma
                          </Tab>
                          <Tab
                            style={{
                              fontFamily: "Helvetica Neue, sans-serif",
                            }}
                          >
                            Genero
                          </Tab>
                        </TabList>
                        <TabPanels>
                          <TabPanel
                            style={{
                              fontFamily: "Helvetica Neue, sans-serif",
                            }}
                          >
                            {`${movieData.average} / ${movieData.ratingCount} votos`}
                          </TabPanel>
                          <TabPanel>
                            <TranslationComponentCountryName
                              text={movieData.country}
                              language="pt"
                            />
                          </TabPanel>
                          <TabPanel>
                            <TranslationComponent
                              text={movieData.originalLanguage}
                              language="pt"
                            />
                          </TabPanel>
                          <TabPanel
                            style={{
                              fontFamily: "Helvetica Neue, sans-serif",
                            }}
                          >
                            {" "}
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
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </TableContainer>
                  </ChakraProvider>
                </div>
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
                    onClick={() => {
                      handleLike(1);
                      setLikeDisable(true);
                      setLikeThanks(true);
                    }}
                    className={styles.button_green}
                    disabled={isLikeDisabled}
                  >
                    Gostei
                  </button>

                  <button
                    onClick={() => {
                      handleLike(2);
                      setLikeDisable(true);
                      setLikeThanks(true);
                    }}
                    className={styles.button_red}
                    disabled={isLikeDisabled}
                  >
                    Não Gostei
                  </button>

                  <button
                    onClick={() => {
                      handleLike(3);
                      setLikeDisable(true);
                      setLikeThanks(true);
                    }}
                    className={styles.button_yellow}
                    disabled={isLikeDisabled}
                  >
                    Indiferente
                  </button>
                </span>
              )}

              <br />
              <br />
              {likeThanks && <span>Obrigado pela Resposta!! 😀 </span>}

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
