import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { ChakraProvider, Progress } from "@chakra-ui/react";

const MoviePage = () => {
  const router = useRouter();
  const tvShowId = router.query.tvShowId;
  const [movieIdRequest, setMovieIdRequest] = useState();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let showId;
    setMovieIdRequest(tvShowId);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}/watch/providers?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c`
      ),
    ])
      .then(([resMovie, resProviders]) =>
        Promise.all([resMovie.json(), resProviders.json()])
      )
      .then(([dataMovies, dataProviders]) => {
        setData({
          firstEpisodeToAir: dataMovies.first_air_date,

          lastEpisodeToAir:
            dataMovies.last_episode_to_air?.air_date ?? "Ainda no Ar",

          lastSeasonToAir:
            dataMovies.last_episode_to_air?.season_number ?? "Ainda no Ar",

          tvShowName: dataMovies.name,
          poster_path: dataMovies.poster_path,
          overview: dataMovies.overview,
          average: dataMovies.vote_average,
          releaseDate: dataMovies.release_date,
          image: dataMovies.poster_path,
          ratingCount: dataMovies.vote_count,
          popularity: dataMovies.popularity,
          originalTitle: dataMovies.original_name,
          portugueseTitle: dataMovies.name,
          gender: dataMovies.genres
            ? dataMovies.genres.map((genre) => genre.name).join(", ")
            : "",
          providersBR: dataProviders.results
            ? dataProviders.results.BR
              ? dataProviders.results.BR.flatrate
                ? dataProviders.results.BR.flatrate
                    .map((providerBR) => providerBR.provider_name)
                    .join(", ")
                : ""
              : ""
            : "",
          providersUS: dataProviders.results
            ? dataProviders.results.US
              ? dataProviders.results.US.flatrate
                ? dataProviders.results.US.flatrate
                    .map((providerUS) => providerUS.provider_name)
                    .join(", ")
                : ""
              : ""
            : "",
        });
        setIsLoading(false);
      });
  }, [tvShowId, movieIdRequest]);

  if (isLoading) {
    return <p>Carregando dados...</p>;
  }

  let poster = "/callback.png";

  if (data.poster_path) {
    poster = "https://image.tmdb.org/t/p/original" + data.poster_path;
  }

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
      {" "}
      <span className={styles.title}>{data.originalTitle}</span>
      <br />
      <br />
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <ChakraProvider>
          <Progress
            hasStripe
            value={data.average}
            max={10}
            colorScheme={getProgressColor(data.average)}
          />
        </ChakraProvider>
      </div>
      <br />
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <span>
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
          </span>
        )}
      </div>
      <div>
        <br />

        {/* Tabela aqui para baixo */}

        <table className={styles.tableMain}>
          <tr>
            <td className={styles.table}>Título em Português:</td>
            <td className={styles.table}>{data.portugueseTitle}</td>
          </tr>
          <tr></tr>
          <tr>
            <td className={styles.table}>Overview:</td>
            <td className={styles.table}>
              {" "}
              {data.overview ? data.overview : "Sem infos"}
            </td>
          </tr>

          <tr>
            <td className={styles.table}>Generos:</td>
            <td className={styles.table}>{data.gender}</td>
          </tr>

          <tr>
            <td className={styles.table}>Nº de votos:</td>
            <td className={styles.table}>{data.ratingCount}</td>
          </tr>
          <tr>
            <td className={styles.table}>Nota:</td>
            <td className={styles.table}>{data.average}</td>
          </tr>
          <tr>
            <td className={styles.table}>Popularidade:</td>
            <td className={styles.table}>{data.popularity}</td>
          </tr>
          <tr>
            <td className={styles.table}>Primeiro Episódio no Ar:</td>
            <td className={styles.table}>
              {data.firstEpisodeToAir
                ? format(new Date(data.firstEpisodeToAir), " dd/MM/yyyy")
                : ""}
            </td>
          </tr>
          <tr>
            <td className={styles.table}>Último Episódio no Ar:</td>
            <td className={styles.table}>
              {data.lastEpisodeToAir !== undefined &&
              data.lastEpisodeToAir !== null
                ? typeof data.lastEpisodeToAir === "string"
                  ? data.lastEpisodeToAir
                  : format(new Date(data.lastEpisodeToAir), "dd/MM/yyyy")
                : "Ainda No Ar"}
            </td>
          </tr>
          <tr>
            <td className={styles.table}>Última Temporada No Ar:</td>
            <td className={styles.table}>{data.lastSeasonToAir}º</td>
          </tr>
          <tr>
            <td className={styles.table}>Streamings Brasil:</td>
            <td className={styles.table}>{data.providersBR}</td>
          </tr>
          <tr>
            <td className={styles.table}>Streamings EUA:</td>
            <td className={styles.table}>{data.providersUS}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default MoviePage;
