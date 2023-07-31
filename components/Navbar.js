import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import { Box, Button, Input, Spinner, Text, ChakraProvider, Center, InputGroup, InputRightElement, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router"; // Importe o hook useRouter

export default function Navbar({ isLoading }) {

  const [searchText, setSearchText] = useState("");

  return (
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
        <Link href="/where-is-my-movie">
          <a>| Onde Está Meu Filme? |</a>
        </Link>
      </li>

      <li>
      <ChakraProvider>
      <ul className={styles.navbar}>
        {/* ... outros itens do navbar ... */}
        <li>
          <Flex alignItems="center">
            <InputGroup flex="1">
              <Input
                required={true}
                type="search"
                placeholder="Digite o texto aqui"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                pr="4.5rem" // Adicione o padding right para acomodar o ícone de lupa
              />
              <InputRightElement width="auto" pointerEvents="none">
                <SearchIcon color="gray.300" margin={3} />
              </InputRightElement>
            </InputGroup>

            <Link href={`/search-free?query=${searchText}`} passHref>
              <Button as="a" size="lg" colorScheme="purple" ml="10px" mt="24px">
                Pesquisar
              </Button>
            </Link>
          </Flex>

          <Box>
            <Text className={styles.spantext}>
              {isLoading ? <Spinner /> : " "}
            </Text>
          </Box>
        </li>
      </ul>
    </ChakraProvider>







      </li>
    </ul>
  )
}
