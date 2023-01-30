import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/watchtoday">
          <a>O que Assistir Hoje?</a>
        </Link>
        <ul></ul>
      </li>
      <li>
        <Link href="/searchmovies">
          <a>Descobrir Filmes Por Nota</a>
        </Link>
      </li>
      <li>
        <Link href="/searchmoviesbycountry">
          <a>Filmes Por Língua</a>
        </Link>
      </li>
      <li>
        <Link href="/searchtvshows">
          <a>Busca de Séries</a>
        </Link>
      </li>
      <li>
        <Link href="/searchmoviesbycountry">
          <a>Filmes Por Língua</a>
        </Link>
      </li>
      <li>
        <Link href="/searchfree">
          <a>Busca Livre</a>
        </Link>
      </li>
    </ul>
  );
}

// index vai ser sempre o '/' ou seja acesso a pasta raiz
