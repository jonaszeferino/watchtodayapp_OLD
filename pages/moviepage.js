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
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setData({ data1, data2 });
        setIsLoading(false);
      });
  }, [movieId, movieIdRequest]);

  if (isLoading) {
    return <p>Carregando dados...</p>;
  }

  const transformedData = [
    { label: "Adulto", value: data.data1.adult },
    { label: "Imdb Cod", value: data.data1.imdb_id },
    { label: "Nome Original", value: data.data1.original_title },
  ];

  let poster = "/callback.png";
  if (data.data1.poster_path) {
    poster = "https://image.tmdb.org/t/p/original" + data.data1.poster_path;
  }

  return (
    <div>
      {transformedData.map(({ label, value }) => (
        <div key={label}>
          <span>
            {label}: {value}
          </span>

          <br />
        </div>
      ))}

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
    </div>
  );
};
export default MoviePage;
