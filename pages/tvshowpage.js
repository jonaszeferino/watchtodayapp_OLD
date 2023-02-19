import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/router";
import TranslationComponent from "../components/translateComponent";
import TranslationComponentCountryName from "../components/translateComponentCountryName";

const MoviePage = () => {
  const router = useRouter();
  const tvShowId = router.query.tvShowId;
  const [movieIdRequest, setMovieIdRequest] = useState();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let showId = 1668;
    setMovieIdRequest(tvShowId);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/tv/${showId}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`
      ),
    ])
      .then(([resMovie]) => Promise.all([resMovie.json()]))
      .then(([dataMovies]) => {
        setData({
          firstAirDate: dataMovies.first_air_date,
          firstEpisodeToAir: dataMovies.first_air_date,
          lasEpisodeToAir: dataMovies.last_episode_to_air.air_date,
          lastSeasonToAir: dataMovies.last_episode_to_air.season_number,
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
          adult: dataMovies.adult,
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

  return (
    <>
      {" "}
      <span className={styles.title}>{data.originalTitle}</span>
      <br />
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
            <td className={styles.table}>{data.firstEpisodeToAir}</td>
          </tr>
          <tr>
            <td className={styles.table}>Último Episódio no Ar:</td>
            <td className={styles.table}>{data.lasEpisodeToAir}</td>
          </tr>
          <tr>
            <td className={styles.table}>Última Temporada No Ar:</td>
            <td className={styles.table}>{data.lastSeasonToAir}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default MoviePage;
