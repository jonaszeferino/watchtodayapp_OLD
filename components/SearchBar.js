import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Spinner,
  Text,
  ChakraProvider,
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";


const SearchBar = ({ isLoading }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <ChakraProvider>
        <Flex alignItems="center" width="100%" flex="1" style={{ margin: '0 10px' }}>
          <InputGroup flex="1" marginRight="0">
            <Input
              required={true}
              size="md"
              bg="white"
              color="black"
              borderColor="gray"
              borderWidth="1px"
              mt="24px"
              type="search"
              placeholder="Filmes, Series, Pessoas"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              pr="4.5rem"
            />
            <InputRightElement width="auto" size="lg" mt="24px" pointerEvents="none">
              <SearchIcon color="gray.300" margin={3} size="lg" />
            </InputRightElement>
          </InputGroup>

          <Link href={`/search-free?query=${searchText}`} passHref>
            <Button as="a" size="md" bg="white" color="black" borderColor="gray" borderWidth="1px" mt="24px" style={{ marginRight: '10px' }}  >
              Pesquisar
            </Button>
          </Link>
        </Flex>

        <Box>
          <Text>
            {isLoading ? <Spinner /> : " "}
          </Text>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default SearchBar;