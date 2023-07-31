import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import { Box, Button, Input, Spinner, Text, ChakraProvider, InputGroup, InputRightElement, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router"; // Importe o hook useRouter

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
          <Link href="/where-is-my-movie">
            <a>| Onde Está Meu Filme? |</a>
          </Link>
        </li>
      </ul>


      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
  <ChakraProvider>
    <Flex alignItems="center" width="100%" flex="1">
      <InputGroup flex="1" marginRight="0"> {/* Adicione o marginRight aqui */}
        <Input
          required={true}
          size="lg" 
          mt="24px"
          type="search"
          placeholder="Filmes, Series, Pessoas"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          pr="4.5rem" // Adicione o padding right para acomodar o ícone de lupa
        />
        <InputRightElement width="auto"    size="lg" 
          mt="24px" pointerEvents="none">
          <SearchIcon color="gray.300" margin={3} />
        </InputRightElement>
      </InputGroup>

      <Link href={`/search-free?query=${searchText}`} passHref>
        <Button as="a" size="lg" colorScheme="purple" mt="24px">
          Pesquisar
        </Button>
      </Link>
    </Flex>

    <Box>
      <Text className={styles.spantext}>
        {isLoading ? <Spinner /> : " "}
      </Text>
    </Box>
  </ChakraProvider>
</div>




     
    </>
  );
}
