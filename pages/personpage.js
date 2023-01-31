import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Image from "next/image";
import { format } from "date-fns";

export default function Movieapi() {
  let [movieBudget, setMovieBudget] = useState("Não declarado");
  let [movieOriginalTitle, setMovieOriginalTitle] = useState("");
  let [moviePortugueseTitle, setMoviePortugueseTitle] = useState("");
  let [movieOverview, setMovieOverview] = useState("");
  let [movieAverage, setMovieAverage] = useState("");
  let [movieReleaseDate, setMovieReleaseDate] = useState("");
  let [movieImage, setMovieImage] = useState();
  let [movieRatingCount, setMovieRatingCount] = useState("");
  let [moviePopularity, setMoviePopularity] = useState("");
  let [movieCountry, setMovieCountry] = useState("");
  let [movieGender0, setMovieGender0] = useState("");
  let [movieGender1, setMovieGender1] = useState("");
  let [movieLanguages, setMovieLanguages] = useState("");
  let [isError, setError] = useState(false);
  let [movieId, setMovieId] = useState(550);
  let [movieProviderName0, setMovieProviderName0] = useState("");
  let [movieProviderName1, setMovieProviderName1] = useState("");
  let [movieProviderName2, setMovieProviderName2] = useState("");
  let [movieProviderName3, setMovieProviderName3] = useState("");
  let [movieProviderName4, setMovieProviderName4] = useState("");

  // useEffect(() => {}, []);

  let poster = "https://image.tmdb.org/t/p/original" + movieImage;
  let testeBudget = 0;

  const apiCall = (event) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;
    const urlProviders = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c`;
    fetch(url, {})
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw console.log("Erro 1");
        }
      })
      .then(
        (result) => (
          setMovieBudget(result.budget),
          setMovieOriginalTitle(result.original_title),
          setMoviePortugueseTitle(result.title),
          setMovieOverview(result.overview),
          setMovieAverage(result.vote_average),
          setMovieReleaseDate(result.release_date),
          setMovieImage(result.poster_path),
          setMovieCountry(result.production_countries[0].name),
          setMovieRatingCount(result.vote_count),
          setMoviePopularity(result.popularity),
          setMovieGender0(result.genres[0].name),
          setMovieGender1(result.genres[1].name),
          setMovieLanguages(result.spoken_languages[0].name)
        )
      )
      .catch((error) => setError(true));
    fetch(urlProviders, {})
      .then((response2) => {
        if (response2.status === 200) {
          return response2.json();
        } else {
          throw console.log("Erro 2");
        }
      })
      .then(
        (result_provider) => (
          setMovieProviderName0(
            result_provider.results.BR.flatrate[0].provider_name
          ),
          setMovieProviderName1(
            result_provider.results.BR.flatrate[1].provider_name
          ),
          setMovieProviderName2(
            result_provider.results.BR.flatrate[2].provider_name
          ),
          setMovieProviderName3(
            result_provider.results.BR.flatrate[3].provider_name
          ),
          setMovieProviderName4(
            result_provider.results.BR.flatrate[4].provider_name
          )
        )
      )
      .catch((error) => setError(true));
  };

  return (
    <div>
      {isError === true ? (
        <ErrorPage message={``}></ErrorPage>
      ) : (
        <div>
          <h3 className={styles.title}>{moviePortugueseTitle}</h3>

          {movieImage != null ? (
            <span>
              {" "}
              <Image
                src={poster}
                alt="poster"
                width="380"
                height="570"
                className={styles.image}
              />
            </span>
          ) : (
            <span>
              {" "}
              <Image
                src="/callback.png"
                alt="poster"
                width="380"
                height="570"
                className={styles.image}
              />{" "}
            </span>
          )}
          <br />

          {/* Tabela  Do jeito Certo */}
          <table className={styles.table}>
            <tr className={styles.tr}>{/* {Nada dentro} */}</tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Nome Original</td>
              <td className={styles.td}></td>
              <td className={styles.td}>{movieOriginalTitle}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Nome em Português</td>
              <td className={styles.td}></td>
              <td className={styles.td}>{moviePortugueseTitle}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Orçamento</td>
              <td className={styles.td}>US$</td>
              <td className={styles.td}>
                {" "}
                {movieBudget > testeBudget
                  ? movieBudget
                  : "Valor Não Declarado"}
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Popularidade</td>
              <td className={styles.td}></td>
              <td className={styles.td}>{moviePopularity}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Rating</td>
              <td className={styles.td}></td>
              <td className={styles.td}>{movieAverage}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Lançamento</td>
              <td className={styles.td}></td>
              <td className={styles.td}>
                {" "}
                {movieReleaseDate.length > 0
                  ? format(new Date(movieReleaseDate), " dd/MM/yyyy")
                  : ""}
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Generos</td>
              <td className={styles.td}></td>
              <td className={styles.td}>
                {" "}
                {movieGender1.length > 0
                  ? ` ${movieGender0}, ${movieGender1} `
                  : ` ${movieGender0}`}
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>País de Origem</td>
              <td className={styles.td}></td>
              <td className={styles.td}>{movieCountry}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Lingua Original</td>
              <td className={styles.td}></td>
              <td className={styles.td}>{movieLanguages}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Stremings</td>
              <td className={styles.td}>No Brasil</td>
              <td className={styles.td}>
                {" "}
                {`${movieProviderName0}${" "}${movieProviderName1}
                ${" "}${movieProviderName2}${" "}${movieProviderName3}${" "}${movieProviderName4}
                `}
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Overview</td>
              <td className={styles.td}></td>
              <td className={styles.td}>{movieOverview}</td>
            </tr>
          </table>
          <button onClick={apiCall}>Verificar</button>
          <br />
        </div>
      )}
    </div>
  );
}
