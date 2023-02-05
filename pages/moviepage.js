import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
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
        setData({ dataMovies, dataProviders });
        setIsLoading(false);
      });
  }, [movieId, movieIdRequest]);

  if (isLoading) {
    return <p>Carregando dados...</p>;
  }

  const transformedData = [
    { label: "Imdb Cod", value: data.dataMovies.imdb_id },
    { label: "Nome Original", value: data.dataMovies.original_title },
  ];

  let poster = "/callback.png";
  if (data.dataMovies.poster_path) {
    poster =
      "https://image.tmdb.org/t/p/original" + data.dataMovies.poster_path;
  }

  return (
    <>
      {" "}
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
        {transformedData.map(({ label, value }) => (
          <div key={label}>
            <span>
              {label}: {value}
            </span>

            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default MoviePage;
