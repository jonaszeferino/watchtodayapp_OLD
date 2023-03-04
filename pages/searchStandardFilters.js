import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import Head from "next/head";

export default function Discovery() {
  let [searchMovies, setSearchMovies] = useState([]);
  let [searchText, setSearchText] = useState("");
  let [searchTvType, setSearchTvType] = useState("");

  // erro e loading
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const apiCall = () => {
    let searchType = searchTvType; // padrão para filme, mas pode ser alterado conforme a escolha do usuário
    let url = "";
    if (searchTvType) {
      switch (searchType) {
        case "person":
          url = `https://api.themoviedb.org/3/search/person?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR&query=${searchText}&include_adult=false&page=1`;
          break;
        case "series":
          url = `https://api.themoviedb.org/3/search/tv?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR&query=${searchText}&include_adult=false&page=1`;
          break;
        case "movie":
        default:
          url = `https://api.themoviedb.org/3/search/movie?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR&query=${searchText}&include_adult=false&page=1`;
          break;
      }

      setIsLoading(true);
      setError(false);

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
          setIsLoading(false);
        })
        .catch((error) => setError(true));
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="movies,watch,review"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>
      <div>
        <div className={styles.top}>
          <h3 className={styles.title}> Filtros Por Texto</h3>
        </div>

        <h2 className={styles.label}>
          <br />

          <h2>Procure Por Texto</h2>
          <input
            className={styles.top}
            required={true}
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          ></input>
          <label type="text">
            <select
              name="select"
              type="text"
              className={styles.top}
              value={searchTvType}
              onChange={(event) => setSearchTvType(event.target.value)}
            >
              {" "}
              <option className={styles.card} value="person">
                Pessoas
              </option>
              <option className={styles.card} value="movies">
                Filmes
              </option>
              <option className={styles.card} value="series">
                Séries
              </option>
            </select>
          </label>

          <button className={styles.card} onClick={apiCall}>
            Verificar
          </button>
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
              <div className={styles.card} key={search.id}>
                <span className={styles.spantext}></span>
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
