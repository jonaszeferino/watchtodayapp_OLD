import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";

import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router"; // Importe o hook useRouter
import SearchBar from "./SearchBar";

export default function Navbar({ isLoading }) {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  return (
 
    <>
    
      <ul className={styles.navbar}>
        <li>
          <Link href="/">
            <a>| Home</a>
          </Link>
        </li>
        <li>
          <Link href="/watch-today">
            <a>| O que Ver Hoje?</a>
          </Link>
        </li>
        <li>
          <Link href="/search-movies">
            <a>| Descobrir Filmes</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/search-movies-by-country">
            <a>| Filmes Por Língua</a>
          </Link>
        </li> */}
        <li>
          <Link href="/search-tvshows">
            <a>| Busca de Séries</a>
          </Link>
        </li>
        <li>
          <Link href="/where-is-my-movie">
            <a>| Onde Está Meu Filme? |</a>
          </Link>
        </li>
        <br />
      </ul>
      <SearchBar isLoading={isLoading} />

      <div style={{ maxWidth: "600px", margin: "0 auto" }}></div>
    </>
  );
}
