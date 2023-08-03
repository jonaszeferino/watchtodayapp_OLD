import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import { useRouter } from "next/router";
import {
  ChakraProvider,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import Image from "next/image";
import TranslateProfile from "../components/TranslateProfile"
import TranslationComponentCountryName from "../components/translateComponentCountryName";

export default function Personapi() {
  const router = useRouter();
  const personIdRecive = router.query.personId;
  const [personRecive, setPersonRecive] = useState({});
  const [isError, setError] = useState(false);

  console.log();

  useEffect(() => {
    apiCall();
  }, [personIdRecive]);

  const apiCall = () => {
    if (!personIdRecive) {
      return;
    }
    const url = `https://api.themoviedb.org/3/person/${personIdRecive}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;

    fetch(url, {})
      .then((response) => {
        if (response.status === 200) {
          setError(false);
          return response.json();
        } else {
          setError(true);
          throw console.log("Erro 1");
        }
      })
      .then((result) => setPersonRecive(result))
      .catch((error) => setError(true));
  };

  console.log(personRecive);
  console.log(personRecive.profile_path);
  return (
    <div>
      {isError === true ? (
        <ErrorPage message={"Erro ao carregar a página"} />
      ) : (
        <div>
          <h3 className={styles.title}></h3>

          <span>
            {personRecive.profile_path != null ? (
              <img
                className={styles.card_image_big}
                src={
                  "https://image.tmdb.org/t/p/original" +
                  personRecive.profile_path
                }
                alt="poster"
                width="480"
                height="720"
                style={{
                  objectFit: "contain",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            ) : (
              <Image
                className={styles.card_image_big}
                src="/callback.png"
                alt="poster"
                width="480"
                height="720"
                style={{
                  objectFit: "contain",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            )}
          </span>

          <ChakraProvider>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Nome:</Th>
                    <Td>{personRecive.name}</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Th>Conhecido por: </Th>
                    <Td>
                      <TranslateProfile
                        text={personRecive.known_for_department}
                        language="pt"
                      />
                    </Td>
                    <Tr />
                  </Tr>

                  <Tr>
                    <Th>Biografia</Th>
                    <Td>{personRecive.biography}</Td>
                  </Tr>

                  <Tr>
                    <Th>Nascimento</Th>
                    <Td>{personRecive.place_of_birth}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ChakraProvider>
          <ChakraProvider>
            <Button size="lg" colorScheme="purple" mt="24px" onClick={apiCall}>
              Verificar
            </Button>
          </ChakraProvider>
          <br />
        </div>
      )}
    </div>
  );
}
