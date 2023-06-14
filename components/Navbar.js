import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">
          <a>|Home</a>
        </Link>
      </li>
      <li>
        <Link href="/watch-today">
          <a>| O que Ver Hoje?</a>
        </Link>
        <ul></ul>
      </li>
      <li>
        <Link href="/search-movies">
          <a>| Descobrir Filmes Por Nota</a>
        </Link>
      </li>
      <li>
        <Link href="/search-movies-by-country">
          <a>| Filmes Por Língua</a>
        </Link>
      </li>
      <li>
        <Link href="/search-tvshows">
          <a>| Busca de Séries</a>
        </Link>
      </li>
      <li>
        <Link href="/search-free">
          <a>| Busca Livre</a>
        </Link>
      </li>
      <li>
        <Link href="/where-is-my-movie">
          <a>| Onde Está Meu Filme? |</a>
        </Link>
      </li>
    </ul>
  );
}
