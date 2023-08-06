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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import stringSimilarity from "string-similarity"; // Importe a biblioteca

const SearchBar = ({ isLoading }) => {
  const [searchText, setSearchText] = useState("");
  const [termosSugeridos, setTermosSugeridos] = useState([]);
  const router = useRouter();

  const listaDeTermos = [
    "Meryl Streep",
    "Scarlett Johansson",
    "Jennifer Lawrence",
    "Angelina Jolie",
    "Natalie Portman",
    "Cate Blanchett",
    "Julia Roberts",
    "Charlize Theron",
    "Emma Stone",
    "Anne Hathaway",
    "Viola Davis",
    "Sandra Bullock",
    "Nicole Kidman",
    "Kate Winslet",
    "Mila Kunis",
    "Amy Adams",
    "Halle Berry",
    "Jennifer Aniston",
    "Julianne Moore",
    "Keira Knightley",
    "Emma Watson",
    "Gal Gadot",
    "Rachel McAdams",
    "Jessica Chastain",
    "Reese Witherspoon",
    "Alicia Vikander",
    "Michelle Pfeiffer",
    "Gwyneth Paltrow",
    "Jodie Foster",
    "Steven Spielberg",
    "Martin Scorsese",
    "Quentin Tarantino",
    "Christopher Nolan",
    "Ridley Scott",
    "Francis Ford Coppola",
    "Alfred Hitchcock",
    "James Cameron",
    "Stanley Kubrick",
    "Clint Eastwood",
    "Sofia Coppola",
    "Greta Gerwig",
    "Ava DuVernay",
    "Kathryn Bigelow",
    "Jane Campion",
    "Ang Lee",
    "Spike Lee",
    "Wes Anderson",
    "Denis Villeneuve",
    "Guillermo del Toro",
    "David Fincher",
    "Pedro Almodóvar",
    "Kathryn Bigelow",
    "Jane Campion",
    "Sofia Coppola",
    "Penny Marshall",
    "Nora Ephron",
    "Sofia Coppola",
    "Ava DuVernay",
    "Tom Hanks",
    "Leonardo DiCaprio",
    "Brad Pitt",
    "Johnny Depp",
    "Robert Downey Jr.",
    "Denzel Washington",
    "Will Smith",
    "Tom Cruise",
    "Harrison Ford",
    "Morgan Freeman",
    "Samuel L. Jackson",
    "Chris Hemsworth",
    "Ryan Reynolds",
    "Hugh Jackman",
    "Christian Bale",
    "Mark Wahlberg",
    "Matt Damon",
    "Dwayne Johnson",
    "Jake Gyllenhaal",
    "Ryan Gosling",
    "Joaquin Phoenix",
    "Idris Elba",
    "Chris Evans",
    "Chadwick Boseman",
    "Daniel Radcliffe",
    "Keanu Reeves",
    "Benedict Cumberbatch",
    "Michael B. Jordan",
    "Eddie Redmayne",
  ];

  function buscarTermosSemelhantes(entrada) {
    const resultados = stringSimilarity.findBestMatch(entrada, listaDeTermos);
    const termosSugeridos = resultados.ratings
      .filter((resultado) => resultado.rating > 0.2) // Defina um limite para considerar sugestões
      .map((resultado) => resultado.target);

    return termosSugeridos;
  }

  // Função para atualizar os termos sugeridos quando a entrada do usuário mudar
  function handleInputChange(event) {
    const inputValue = event.target.value;
    setSearchText(inputValue);

    // Se a entrada não estiver vazia, atualize os termos sugeridos
    if (inputValue.trim() !== "") {
      setTermosSugeridos(buscarTermosSemelhantes(inputValue));
    } else {
      setTermosSugeridos([]); // Caso contrário, não há sugestões
    }
  }

  // Função para selecionar um termo sugerido e preencher o campo de busca
  function selecionarTermo(termo) {
    setSearchText(termo);
    setTermosSugeridos([]); // Limpar as sugestões após selecionar
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <ChakraProvider>
        <Flex
          alignItems="center"
          width="100%"
          flex="1"
          style={{ margin: "0 10px" }}
        >
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
              onChange={handleInputChange}
              pr="4.5rem"
            />
            <InputRightElement
              width="auto"
              size="lg"
              mt="24px"
              pointerEvents="none"
            >
              <SearchIcon color="gray.300" margin={3} size="lg" />
            </InputRightElement>
          </InputGroup>

          <Link href={`/search-free?query=${searchText}`} passHref>
            <Button
              as="a"
              size="md"
              bg="white"
              color="black"
              borderColor="gray"
              borderWidth="1px"
              mt="24px"
              style={{ marginRight: "10px" }}
            >
              Pesquisar
            </Button>
          </Link>
        </Flex>

        {/* Mostrar sugestões somente se houver termos similares */}
        {termosSugeridos.length > 0 && (
          <Box
            mt="2"
            position="absolute"
            zIndex="9999"
            bg="white"
            boxShadow="md"
            borderRadius="md"
            width="33%"
          >
   
            <ul>
              {termosSugeridos.length > 0 && (
                <Box
                  mt="2"
                  position="absolute"
                  zIndex="9999"
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                  width="100%"
                >
                  <Text p="2" fontWeight="bold">
                    Sugestões:
                  </Text>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      width: "200px",
                    }}
                  >
                    {termosSugeridos.map((termo, index) => (
                      <li
                        key={index}
                        p="2"
                        borderBottomWidth="1px"
                        borderColor="gray.200"
                        _hover={{ bg: "gray.100", cursor: "pointer" }}
                        onClick={() => selecionarTermo(termo)}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {termo}
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </ul>
          </Box>
        )}

        <Box>
          <Text>{isLoading ? <Spinner /> : " "}</Text>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default SearchBar;

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Input,
//   Spinner,
//   Text,
//   ChakraProvider,
//   InputGroup,
//   InputRightElement,
//   Flex,
// } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import styles from "../styles/Navbar.module.css";

// const SearchBar = ({ isLoading }) => {
//   const [searchText, setSearchText] = useState("");
//   const router = useRouter();

// const listaDeTermos = [
//   "Cineasta",
//   "Diretor",
//   "Produtor",
//   "Ator",
//   "Atriz",
//   "Meryl Streep",
// ];

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//       <ChakraProvider>
//         <Flex alignItems="center" width="100%" flex="1" style={{ margin: '0 10px' }}>
//           <InputGroup flex="1" marginRight="0">
//             <Input
//               required={true}
//               size="md"
//               bg="white"
//               color="black"
//               borderColor="gray"
//               borderWidth="1px"
//               mt="24px"
//               type="search"
//               placeholder="Filmes, Series, Pessoas"
//               value={searchText}
//               onChange={(event) => setSearchText(event.target.value)}
//               pr="4.5rem"
//             />
//             <InputRightElement width="auto" size="lg" mt="24px" pointerEvents="none">
//               <SearchIcon color="gray.300" margin={3} size="lg" />
//             </InputRightElement>
//           </InputGroup>

//           <Link href={`/search-free?query=${searchText}`} passHref>
//             <Button as="a" size="md" bg="white" color="black" borderColor="gray" borderWidth="1px" mt="24px" style={{ marginRight: '10px' }}  >
//               Pesquisar
//             </Button>
//           </Link>
//         </Flex>

//         <Box>
//           <Text>
//             {isLoading ? <Spinner /> : " "}
//           </Text>
//         </Box>
//       </ChakraProvider>
//     </div>
//   );
// };

// export default SearchBar;
