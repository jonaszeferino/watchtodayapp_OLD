import { useState, useEffect } from "react";
import {
  ChakraProvider,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { Rate } from "antd";

const MoviePage = () => {
  const [data, setData] = useState([]); // Inicialize o estado com um array vazio
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Adicione o estado para armazenar o filme selecionado
  const [valueStartDelete, setValueStartDelete] = useState(false);
  const [valueEndDelete, setValueEndDelete] = useState(false);
  const [isConfirmationMode, setIsConfirmationMode] = useState(false);

  console.log("selecionado:", selectedMovie);

  const user_id = 9999999999;
  const apiGetRates = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/v1/getRateRandomMovie?user_id=${parseInt(user_id)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
      setValueEndDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    apiGetRates();
    setValueEndDelete(false);
  }, []);

  const apiDeleteRates = async () => {
    setValueStartDelete(true);
    try {
      const response = await fetch("/api/v1/deleteRateRandomMovie", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_id: selectedMovie,
          user_id: user_id,
        }),
      });
      setValueStartDelete(false), apiGetRates();
      setValueEndDelete(true);
      setIsConfirmationMode(false); // Adicione esta linha
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          wordBreak: "break-word",
        }}
      >
        <h1>Meus Likes</h1>
        {valueStartDelete ? (
          <h1>
            "Excluindo Registro selecionado" <Spinner size="xl" />
          </h1>
        ) : null}

        {valueEndDelete ? <h1>"Registro Deletado"</h1> : null}

        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Like Nos Filmes</TableCaption>
              <Thead>
                <Tr>
                  <Th>Filme</Th>
                  <Th>Data</Th>
                  <Th>Nota</Th>
                  <Th>Poster</Th>
                  <Th>
                    {isConfirmationMode ? (
                      <>
                        <Button
                          onClick={apiDeleteRates}
                          colorScheme="red"
                          marginRight={2}
                        >
                          Confirmar
                        </Button>
                        <Button onClick={() => setIsConfirmationMode(false)}>
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsConfirmationMode(true)}
                        disabled={selectedMovie === null}
                        colorScheme={selectedMovie !== null ? "red" : "gray"}
                      >
                        Excluir
                      </Button>
                    )}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((movie) => (
                  <Tr key={movie.movieId}>
                    <Td>
                      {movie.original_title}
                      <br />
                      <span>{movie.portuguese_title}</span>
                    </Td>
                    <Td>{new Date(movie.like_date).toLocaleDateString()}</Td>
                    <Td>
                      <Rate
                        onChange={(rating) => {}}
                        value={movie.rating_by_user || 0}
                        count={10}
                      />
                    </Td>
                    <Td>
                      <Image
                        src={
                          movie.poster_path !== "/callback_gray.png"
                            ? "https://image.tmdb.org/t/p/original" +
                              movie.poster_path
                            : "/callback_gray.png"
                        }
                        alt="poster"
                        width={60}
                        height={90}
                        style={{
                          objectFit: "contain",
                          maxHeight: "100%",
                          maxWidth: "100%",
                        }}
                      />
                    </Td>

                    <Td>
                      <Checkbox
                        onChange={() =>
                          setSelectedMovie((prevSelectedMovie) =>
                            prevSelectedMovie === movie.movie_id
                              ? null
                              : movie.movie_id
                          )
                        }
                        isChecked={selectedMovie === movie.movie_id}
                        isDisabled={isConfirmationMode}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
    </ChakraProvider>
  );
};

export default MoviePage;
