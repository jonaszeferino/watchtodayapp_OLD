import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import { format } from "date-fns";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Discovery() {
  let [searchMovies, setSearchMovies] = useState([]);
  let [searchRatingSort, setSearchRatingSort] = useState("vote_average.desc");
  let [searchVoteCount, setSearchVoteCount] = useState(100);
  let [searchMovieTotalPages, setSearchMovieTotalPages] = useState("");
  let [searchMovieRealPage, setSearchMovieRealPage] = useState("");
  let [searchMovieTotalResults, setSearchMovieTotalResults] = useState("");
  let [searchMovieReleaseDateFrom, setSearchMovieReleaseDateFrom] =
    useState(1800);
  let [searchMovieReleaseDateTo, setSearchMovieReleaseDateTo] = useState(2023);
  let [searchMovieCountry, setSearchMovieCountry] = useState("pt");
  let [page, setPage] = useState(1);
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let urlString =
    "https://api.themoviedb.org/3/discover/movie?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR&with_original_language=" +
    searchMovieCountry +
    "&include_adult=false&include_video=false&vote_count.gte=" +
    searchVoteCount +
    "&vote_count.lte=10000000&sort_by=" +
    searchRatingSort +
    "&primary_release_date.gte=" +
    searchMovieReleaseDateFrom +
    "&primary_release_date.lte=" +
    searchMovieReleaseDateTo;

  const apiCall = (currentPage) => {
    setIsLoading(true);
    const url = urlString + "&page=" + currentPage;

    console.log(url + " o que chamou");
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
    setPage(page - 1), apiCall();
  };

  let totalPages = searchMovieTotalPages;
  let currentPage = searchMovieRealPage;
  let totalResults = searchMovieTotalResults;

  return (
    <>
      <Head>
        <title>Filmes Por Língua</title>
        <meta name="keywords" content="movies,watch,review"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>
      <div>
        <div className={styles.top}>
          <h3 className={styles.title}>Filmes por Língua</h3>
        </div>

        <h2 className={styles.label}>
          {" "}
          <br />
          <label className={styles.label} type="text">
            Ordem:
            <select
              name="select"
              type="text"
              className={styles.card}
              value={searchRatingSort}
              onChange={(event) => setSearchRatingSort(event.target.value)}
            >
              <option className={styles.card} value="vote_average.asc">
                Da Pior Nota Para Melhor
              </option>
              <option className={styles.card} value="vote_average.desc">
                Da Melhor Nota Para Pior
              </option>
            </select>
          </label>
          <label className={styles.label} type="text">
            Nº de Votos:
            <select
              name="select"
              type="number"
              className={styles.card}
              value={searchVoteCount}
              onChange={(event) => setSearchVoteCount(event.target.value)}
            >
              <option className={styles.card} value="0">
                Mais de 0 votos
              </option>
              <option className={styles.card} value="50">
                Mais de 50 votos
              </option>
              <option className={styles.card} value="100">
                Mais de 100 votos
              </option>
              <option className={styles.card} value="200">
                Mais de 200 votos
              </option>
              <option className={styles.card} value="500">
                Mais de 500 votos
              </option>
              <option className={styles.card} value="1000">
                Mais de 1000 votos
              </option>
              <option className={styles.card} value="5000">
                Mais de 5000 votos
              </option>
            </select>
          </label>
          <br />
          <label className={styles.label} type="text">
            Língua do Filme:
            <select
              name="country"
              type="text"
              className={styles.card}
              value={searchMovieCountry}
              onChange={(event) => setSearchMovieCountry(event.target.value)}
            >
              {/* ISO 639-1 */}
              <option className={styles.card} value="pt">
                Português
              </option>
              <option className={styles.card} value="en">
                Inglês
              </option>
              <option className={styles.card} value="ab">
                Abkhaziano
              </option>
              <option className={styles.card} value="aar">
                Afar
              </option>
              <option className={styles.card} value="af">
                Africano
              </option>
              <option className={styles.card} value="ak">
                Akan
              </option>
              <option className={styles.card} value="sq">
                Albanes
              </option>
              <option className={styles.card} value="am">
                Amárico
              </option>
              <option className={styles.card} value="am">
                Árabe
              </option>
              <option className={styles.card} value="an">
                Aragonês
              </option>
              <option className={styles.card} value="hy">
                Armeno
              </option>
              <option className={styles.card} value="as">
                Assamês
              </option>
              <option className={styles.card} value="av">
                Avarico
              </option>
              <option className={styles.card} value="ay">
                Aimará
              </option>
              <option className={styles.card} value="az">
                Azerbaijano
              </option>
              <option className={styles.card} value="bm">
                Bambara
              </option>
              <option className={styles.card} value="ba">
                Bashkir
              </option>
              <option className={styles.card} value="eu">
                Basco
              </option>
              <option className={styles.card} value="be">
                Belorusso
              </option>
              <option className={styles.card} value="bn">
                Bengali
              </option>
              <option className={styles.card} value="bi">
                Bislama
              </option>
              <option className={styles.card} value="bs">
                Bósnio
              </option>
              <option className={styles.card} value="br">
                Bretão
              </option>
              <option className={styles.card} value="bg">
                Bulgaro
              </option>
              <option className={styles.card} value="my">
                Birmanês
              </option>
              <option className={styles.card} value="ca">
                Catalão
              </option>
              <option className={styles.card} value="ch">
                Chamarro
              </option>
              <option className={styles.card} value="ce">
                Checheno
              </option>
              <option className={styles.card} value="ny">
                Chichewa
              </option>
              <option className={styles.card} value="zh">
                Chinês
              </option>
              <option className={styles.card} value="cu">
                Eslavo
              </option>
              <option className={styles.card} value="cv">
                Chuvash
              </option>
              <option className={styles.card} value="kw">
                Córnico
              </option>
              <option className={styles.card} value="co">
                Corso
              </option>
              <option className={styles.card} value="cr">
                Cree
              </option>
              <option className={styles.card} value="hr">
                Croata
              </option>
              <option className={styles.card} value="cs">
                Tcheco
              </option>
              <option className={styles.card} value="da">
                Dinamarquês
              </option>
              <option className={styles.card} value="dv">
                Divehi
              </option>
              <option className={styles.card} value="nl">
                Holandês
              </option>
              <option className={styles.card} value="dz">
                Dzongkha
              </option>
              <option className={styles.card} value="en">
                Inglês
              </option>
              <option className={styles.card} value="eo">
                Esperanto
              </option>
              <option className={styles.card} value="et">
                Estoniano
              </option>
              <option className={styles.card} value="en">
                Inglês
              </option>
              <option className={styles.card} value="ee">
                Ewe
              </option>
              <option className={styles.card} value="fo">
                Faroense
              </option>
              <option className={styles.card} value="fj">
                Fijiano
              </option>
              <option className={styles.card} value="fi">
                Finlandês
              </option>
              <option className={styles.card} value="fr">
                Francês
              </option>
              <option className={styles.card} value="fy">
                Frísia Ocidental
              </option>

              <option className={styles.card} value="ff">
                Fulah
              </option>
              <option className={styles.card} value="gd">
                Gaélico
              </option>
              <option className={styles.card} value="gl">
                Galego
              </option>
              <option className={styles.card} value="lg">
                Ganda
              </option>
              <option className={styles.card} value="ka">
                Geórgio
              </option>
              <option className={styles.card} value="de">
                Alemão
              </option>
              <option className={styles.card} value="el">
                Grego
              </option>
              <option className={styles.card} value="kl">
                Kalaallisut
              </option>
              <option className={styles.card} value="gn">
                Guarani
              </option>
              <option className={styles.card} value="gu">
                Gujarati
              </option>
              <option className={styles.card} value="ht">
                Haitiano
              </option>
              <option className={styles.card} value="ha">
                Hauçá
              </option>
              <option className={styles.card} value="he">
                Hebraico
              </option>
              <option className={styles.card} value="ho">
                Hiri Motu
              </option>
              <option className={styles.card} value="hu">
                Húngaro
              </option>
              <option className={styles.card} value="is">
                Islandês
              </option>
              <option className={styles.card} value="io">
                Ido(esperanto)
              </option>

              <option className={styles.card} value="id">
                Indonésio
              </option>
              <option className={styles.card} value="ia">
                Interlíngua
              </option>
              <option className={styles.card} value="ie">
                Interlíngue
              </option>
              <option className={styles.card} value="iu">
                Inuktitut
              </option>
              <option className={styles.card} value="ik">
                Inupiaq
              </option>
              <option className={styles.card} value="ga">
                Irlandês
              </option>
              <option className={styles.card} value="it">
                Italiano
              </option>
              <option className={styles.card} value="ja">
                Joponês
              </option>
              <option className={styles.card} value="jv">
                Javanês
              </option>
              <option className={styles.card} value="kn">
                Kannada
              </option>
              <option className={styles.card} value="kr">
                Kanuri
              </option>
              <option className={styles.card} value="ks">
                Caxemira
              </option>
              <option className={styles.card} value="kk">
                Cazaques
              </option>
              <option className={styles.card} value="km">
                Khmer Central
              </option>
              <option className={styles.card} value="ki">
                Kikuyu
              </option>
              <option className={styles.card} value="rw">
                Kinyarwanda
              </option>
              <option className={styles.card} value="ky">
                Quirguiz
              </option>
              <option className={styles.card} value="kv">
                Komi
              </option>
              <option className={styles.card} value="ko">
                Coreano
              </option>
              <option className={styles.card} value="kj">
                Kuanyama
              </option>
              <option className={styles.card} value="ku">
                Curdo
              </option>
              <option className={styles.card} value="lo">
                Laos
              </option>
              <option className={styles.card} value="la">
                Latin
              </option>
              <option className={styles.card} value="lv">
                Letão
              </option>
              <option className={styles.card} value="li">
                Limburguês
              </option>
              <option className={styles.card} value="ln">
                Lingala
              </option>
              <option className={styles.card} value="lt">
                Lituano
              </option>
              <option className={styles.card} value="lu">
                Luba-Katanga
              </option>
              <option className={styles.card} value="lb">
                Luxemburguês
              </option>
              <option className={styles.card} value="mk">
                Macedônio
              </option>
              <option className={styles.card} value="mg">
                Malgaxe
              </option>
              <option className={styles.card} value="ms">
                Malaio
              </option>
              <option className={styles.card} value="ml">
                Malaiala
              </option>
              <option className={styles.card} value="mt">
                Maltês
              </option>
              <option className={styles.card} value="gv">
                Manx
              </option>
              <option className={styles.card} value="mi">
                Maori
              </option>
              <option className={styles.card} value="mr">
                Marathi
              </option>
              <option className={styles.card} value="mh">
                Marshallês
              </option>
              <option className={styles.card} value="mn">
                Mongol
              </option>
              <option className={styles.card} value="na">
                Nauru
              </option>
              <option className={styles.card} value="nv">
                Navajo
              </option>
              <option className={styles.card} value="nd">
                Norte Ndebele
              </option>
              <option className={styles.card} value="nr">
                South Ndebele
              </option>
              <option className={styles.card} value="ng">
                Ndonga
              </option>
              <option className={styles.card} value="ne">
                Nepalês
              </option>
              <option className={styles.card} value="no">
                Norueguês
              </option>
              <option className={styles.card} value="nb">
                Bokmal norueguês
              </option>
              <option className={styles.card} value="nn">
                Norueguês Nynorsk
              </option>
              <option className={styles.card} value="ii">
                Sichuan Yi
              </option>
              <option className={styles.card} value="oc">
                Occitano
              </option>
              <option className={styles.card} value="oj">
                Ojibwa
              </option>
              <option className={styles.card} value="or">
                Oriá
              </option>
              <option className={styles.card} value="os">
                Ossétia
              </option>
              <option className={styles.card} value="pi">
                Páli
              </option>
              <option className={styles.card} value="ps">
                Pashto
              </option>
              <option className={styles.card} value="fa">
                Perso
              </option>
              <option className={styles.card} value="pl">
                Polonês
              </option>
              <option className={styles.card} value="pt">
                Português
              </option>
              <option className={styles.card} value="pa">
                Punjabi
              </option>
              <option className={styles.card} value="qu">
                Quechua
              </option>
              <option className={styles.card} value="ro">
                Romenos
              </option>
              <option className={styles.card} value="rm">
                Romanche
              </option>
              <option className={styles.card} value="rn">
                Rundi
              </option>
              <option className={styles.card} value="ru">
                Russo
              </option>
              <option className={styles.card} value="se">
                Sami do Norte
              </option>
              <option className={styles.card} value="sm">
                Samoano
              </option>
              <option className={styles.card} value="sg">
                Sango
              </option>
              <option className={styles.card} value="sa">
                Sânscrito
              </option>
              <option className={styles.card} value="sc">
                Sardos
              </option>
              <option className={styles.card} value="sr">
                Sérvio
              </option>
              <option className={styles.card} value="sn">
                Shona
              </option>
              <option className={styles.card} value="sd">
                Sindi
              </option>
              <option className={styles.card} value="si">
                Cingalês
              </option>
              <option className={styles.card} value="sk">
                Eslovaco
              </option>
              <option className={styles.card} value="sl">
                Esloveno
              </option>
              <option className={styles.card} value="so">
                Somali
              </option>
              <option className={styles.card} value="st">
                Southern Sotho
              </option>
              <option className={styles.card} value="es">
                Espanhol
              </option>
              <option className={styles.card} value="su">
                Sundanês
              </option>
              <option className={styles.card} value="sw">
                Suaíli
              </option>
              <option className={styles.card} value="ss">
                Swati
              </option>
              <option className={styles.card} value="sv">
                Sueco
              </option>
              <option className={styles.card} value="tl">
                Tagalo
              </option>
              <option className={styles.card} value="ty">
                Taitiano
              </option>
              <option className={styles.card} value="tg">
                Tadjique
              </option>
              <option className={styles.card} value="ta">
                Tâmil
              </option>
              <option className={styles.card} value="tt">
                Tártaro
              </option>
              <option className={styles.card} value="te">
                Telugu
              </option>
              <option className={styles.card} value="th">
                Tailandês
              </option>
              <option className={styles.card} value="bo">
                Tibetano
              </option>
              <option className={styles.card} value="ti">
                Tigrinya
              </option>
              <option className={styles.card} value="to">
                Tonga
              </option>
              <option className={styles.card} value="ts">
                Tsonga
              </option>
              <option className={styles.card} value="tn">
                Tswana
              </option>
              <option className={styles.card} value="tr">
                Turco
              </option>
              <option className={styles.card} value="tk">
                Turcomano
              </option>
              <option className={styles.card} value="tw">
                Twi
              </option>
              <option className={styles.card} value="ug">
                Uigur
              </option>
              <option className={styles.card} value="uk">
                Ucraniano
              </option>
              <option className={styles.card} value="ur">
                Urdu
              </option>
              <option className={styles.card} value="uz">
                Uzbeque
              </option>
              <option className={styles.card} value="ve">
                Venda
              </option>
              <option className={styles.card} value="vi">
                Vietnamita
              </option>
              <option className={styles.card} value="vo">
                Volapük
              </option>
              <option className={styles.card} value="cy">
                Valão
              </option>
              <option className={styles.card} value="cy">
                Galês
              </option>
              <option className={styles.card} value="wo">
                Wolof
              </option>
              <option className={styles.card} value="xh">
                Xhosa
              </option>
              <option className={styles.card} value="yi">
                Iídiche
              </option>
              <option className={styles.card} value="yo">
                Iorubá
              </option>
              <option className={styles.card} value="za">
                Zhuang
              </option>
              <option className={styles.card} value="zu">
                Zulu
              </option>
            </select>
          </label>
          <br />
          <label type="text">
            Ano Inicial:
            <input
              className={styles.card}
              type="number"
              min={1800}
              max={2022}
              value={searchMovieReleaseDateFrom}
              onChange={(event) =>
                setSearchMovieReleaseDateFrom(event.target.value)
              }
            ></input>
          </label>
          <label type="text">
            Ano Final:
            <input
              className={styles.card}
              type="number"
              min={1801}
              max={2023}
              value={searchMovieReleaseDateTo}
              onChange={(event) =>
                setSearchMovieReleaseDateTo(event.target.value)
              }
            ></input>
          </label>
          <br />
          <button className={styles.button} onClick={apiCall}>
            Verificar
          </button>
          <br />
          <br />
          <span>
            Pág: {searchMovieRealPage} de: {searchMovieTotalPages} Total de
            Resultados: {searchMovieTotalResults}
          </span>
          <br />
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
        </h2>

        <span>{isLoading ? <div>Carregando...</div> : " "}</span>
        {isError === true ? (
          <ErrorPage message={`Verifique as Credenciais`}></ErrorPage>
        ) : (
          <div className={styles.grid}>
            {searchMovies.map((search) => (
              <div className={styles.card} key={search.id}>
                {console.log(
                  "https://image.tmdb.org/t/p/original" +
                    search.poster_path +
                    " ver o path da imagem"
                )}
                <span>Título: {search.title}</span> <br />
                <span>Título Original: {search.original_title}</span> <br />
                <span>
                  Média: {search.vote_average} - Nº de Votos:{" "}
                  {search.vote_count}
                </span>{" "}
                <br />
                <span>
                  {search.poster_path != null ? (
                    <span>
                      {" "}
                      <Image
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
                    <span>
                      {" "}
                      <Image
                        src="/callback.png"
                        alt="poster"
                        width="240"
                        height="360"
                      />{" "}
                    </span>
                  )}
                  <br />
                </span>
                <span></span> <br />
                <span>
                  Data de Lançamento:
                  {search.release_date.length > 0
                    ? format(new Date(search.release_date), " dd/MM/yyyy")
                    : ""}
                </span>
                <br />
                <span>MovieID: {search.id}</span>
                <br />
                <Link href="/moviepage">
                  <a>Detalhes</a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
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
      <br />
      <span>Total Paginas: {totalPages}</span>{" "}
      <span>Pagina Atual: {currentPage}</span>{" "}
      <span>Total Resultados: {totalResults}</span>{" "}
    </>
  );
}
