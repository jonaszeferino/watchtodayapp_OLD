import Link from "next/link";
import Head from "next/head";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="nba,franchise,teams"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>
      <h1>Ferramentas de Busca</h1>
      <br />
      <Link href="/searchmovies">
        <a>Descubra os Filmes</a>
      </Link>
      <br />
      <Link href="/watchtoday">
        <a>Que filme assitir hoje?</a>
      </Link>
      <br />
      <Link href="/searchmoviesbycountry">
        <a>Filmes Por Língua</a>
      </Link>
      <br />
      <Link href="/searchtvshows">
        <a>Busca de Séries</a>
      </Link>
    </div>
  );
}
