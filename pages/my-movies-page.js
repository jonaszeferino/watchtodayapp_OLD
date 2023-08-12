import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase"; // Importe a instância do Supabase
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
} from "@chakra-ui/react";

const MoviePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null); // Estado para armazenar informações do usuário autenticado

  useEffect(() => {
    // Verifique se o usuário está autenticado ao carregar a página
    const session = supabase.auth.session();
    setUser(session?.user || null);
  }, []);

  // Verifique se o usuário está autenticado antes de renderizar o conteúdo da página
  if (!user) {
    return <p>Você não tem permissão para acessar esta página. Faça login.</p>;
  }


  return (
    <>
      <ChakraProvider>
        <div
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            wordBreak: "break-word",
          }}
        >
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Like Nos Filmes</TableCaption>
              <Thead>
                <Tr>
                  <Th>Filme</Th>
                  <Th>Data</Th>
                  <Th>Nota</Th>
                  <Th>
                    Selecione
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Forrest Gump</Td>
                  <Td>10/08/23</Td>
                  <Td>5.4</Td>
                  <Td>
                    <Checkbox />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Big Fish</Td>
                  <Td>10/03/22</Td>
                  <Td>3.48</Td>
                  <Td>
                    <Checkbox />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Central do Brasil</Td>
                  <Td>12/02/22</Td>
                  <Td>1.3</Td>
                  <Td>
                    <Checkbox />
                  </Td>
                </Tr>
              </Tbody>
              {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
        </div>
      </ChakraProvider>
    </>
  );  
};

export default MoviePage;
