import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/router";

const MoviePage = () => {
  const router = useRouter();
  const movieId = router.query.movieId;
  const [movieIdRequest, setMovieIdRequest] = useState();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMovieIdRequest(movieId);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movieIdRequest}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieIdRequest}/watch/providers?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c`
      ),
    ])
      .then(([resMovie, resProviders]) =>
        Promise.all([resMovie.json(), resProviders.json()])
      )
      .then(([dataMovies, dataProviders]) => {
        setData({
          budget: dataMovies.budget,
          originalTitle: dataMovies.original_title,
          portugueseTitle: dataMovies.title,
          poster_path: dataMovies.poster_path,
          overview: dataMovies.overview,
          average: dataMovies.vote_average,
          releaseDate: dataMovies.release_date,
          image: dataMovies.poster_path,
          ratingCount: dataMovies.vote_count,
          popularity: dataMovies.popularity,
          gender: dataMovies.genres
            ? dataMovies.genres.map((genre) => genre.name).join(", ")
            : "",

          adult: dataMovies.adult,

          imdb: dataMovies.imdb_id,

          providers: dataProviders.results
            ? dataProviders.results.BR
              ? dataProviders.results.BR.flatrate
                ? dataProviders.results.BR.flatrate
                    .map((provider) => provider.provider_name)
                    .join(", ")
                : ""
              : ""
            : "",
        });
        setIsLoading(false);
      });
  }, [movieId, movieIdRequest]);

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
      <span>Título Original: {data.originalTitle}</span>
      <div>
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
      </div>
      <div>
        <span>
          {data.budget === 0 || data.budget === null
            ? null
            : `Orçamento: ${data.budget}`}
        </span>

        <br />

        <span>Título em Português: {data.portugueseTitle}</span>
        <br />
        <span>Overviews: {data.overview}</span>
        <br />
        <span>Número de Votos: {data.ratingCount}</span>
        <br />
        <span>IMDB: {data.imdb}</span>
        <br />
        <span>Nota Média: {data.average}</span>
        <br />
        <span>Data de Lançamento: {data.releaseDate}</span>
        <br />
        <span>Populariadade: {data.popularity}</span>
        <br />
        <span>Generos: {data.gender}</span>
        <br />
        <span>
          {data.providers === null
            ? null
            : `Streamings Brasil: ${data.providers}`}
        </span>
        <br />
      </div>
    </>
  );
};

export default MoviePage;
