import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/router";
import {
  ChakraProvider,
  Progress,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const MoviePage = () => {
  const router = useRouter();
  const { tvShowId, tvShowSeasonId } = router.query; // Destructure the query parameters
  const [dataTvShows, setDataTvShows] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(tvShowId);
  console.log(tvShowSeasonId);

  useEffect(() => {
    if (tvShowId && tvShowSeasonId) {
      CallDataTvShowsDetails();
    }
  }, [tvShowId, tvShowSeasonId]);

  const CallDataTvShowsDetails = () => {
    const url = `https://api.themoviedb.org/3/tv/${tvShowId}/season/${tvShowSeasonId}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;

    console.log(url);

    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error("Temporada não encontrada"); // Personalize a mensagem de erro conforme necessário
        } else {
          throw new Error("Ocorreu um erro ao buscar os dados");
        }
      })
      .then((result) => {
        setDataTvShows(result);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false); // Set loading to false on error as well
      });
  };

  if (isLoading) {
    return <p>Carregando dados...</p>;
  }

  return (
    <>
      <ChakraProvider>
        <div className={styles.grid}>
          {dataTvShows.episodes ? (
            dataTvShows.episodes.map((episode) => (
              <div key={episode.name} className={styles.gridItem}>
                <span className={styles.title}>{episode.name}</span>
                <br />
                <br />
                <img
                  // className={styles.card_image}
                  src={
                    episode.still_path
                      ? "https://image.tmdb.org/t/p/original" +
                        episode.still_path
                      : "/callback.png"
                  }
                  alt="poster"
                  width="1280"
                  height="720"
                />
                <div>
                  <TableContainer>
                    <Table size="sm">
                      <Tbody>
                        <Tr>
                          <Td>Título em Português:</Td>
                          <Td>{episode.name}</Td>
                        </Tr>

                        <Tr>
                          <Td>Overview:</Td>
                          <Td>
                            {episode.overview ? episode.overview : "Sem infos"}
                          </Td>
                        </Tr>

                        <Tr>
                          <Td>Nota Média:</Td>
                          <Td>{episode.vote_average}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
                <br />
              </div>
            ))
          ) : (
            <p>Nenhum episódio encontrado.</p>
          )}
        </div>
      </ChakraProvider>
    </>
  );
};

export default MoviePage;
