import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="nba,franchise,teams"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>

      <br />

      <div className={styles.container}>
        <div>
          <h2> Descubra Filmes</h2>
          <div className={styles.card_image_home}>
            <Link href="/searchmovies">
              <a>
                {" "}
                <Image
                  src="/DescubraFilmes.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>

        <br />

        <div>
          <h2> O que Assitir Hoje?</h2>
          <div className={styles.card_image_home}>
            <Link href="/watchtoday">
              <a>
                <Image
                  src="/OqueAssistirHojeFix.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>
        <br />

        <div>
          <h2> Filmes Por Língua</h2>
          <div className={styles.card_image_home}>
            <Link href="/searchmoviesbycountry">
              <a>
                <Image
                  src="/CinemaCountries.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>
        <br />

        <div>
          <h2> Descubra Séries</h2>
          <div className={styles.card_image_home}>
            <Link href="/searchtvshows">
              <a>
                {" "}
                <Image
                  src="/tvShows.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>
        <br />

        <div>
          <h2>Busca Livre</h2>
          <div className={styles.card_image_home}>
            <Link href="/searchfree">
              <a>
                {" "}
                <Image
                  src="/freeSearch.png"
                  alt="poster"
                  width="360"
                  height="600"
                />
              </a>
            </Link>
          </div>
        </div>
        <br />

        <br />
      </div>
    </div>
  );
}
