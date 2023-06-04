import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/router";
import TranslationComponent from "../components/translateComponent";
import TranslationComponentCountryName from "../components/translateComponentCountryName";
import {
  ChakraProvider,
  Progress,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const MoviePage = () => {
  const router = useRouter();
  // const movieId = router.query.movieId;
  const movieId = 100;
  const [movieIdRequest, setMovieIdRequest] = useState();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const providers = [
    "AD",
    "AE",
    "AL",
    "AO",
    "AR",
    "AT",
    "AU",
    "BA",
    "BE",
    "BF",
    "BG",
    "BH",
    "BO",
    "BR",
    "BZ",
    "CA",
    "CD",
    "CH",
    "CI",
    "CL",
    "CM",
    "CO",
    "CR",
    "CV",
    "CZ",
    "DE",
    "DK",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "ES",
    "FI",
    "FR",
    "GB",
    "GG",
    "GH",
    "GI",
    "GT",
    "HN",
    "HR",
    "HU",
    "ID",
    "IE",
    "IL",
    "IN",
    "IQ",
    "IT",
    "JO",
    "JP",
    "KE",
    "KR",
    "KW",
    "LB",
    "LT",
    "LU",
    "LV",
    "LY",
    "MA",
    "MG",
    "MK",
    "ML",
    "MU",
    "MW",
    "MX",
    "MY",
    "MZ",
    "NE",
    "NG",
    "NI",
    "NL",
    "NO",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PH",
    "PL",
    "PT",
    "PY",
    "QA",
    "RO",
    "RS",
    "RU",
    "SA",
    "SE",
    "SG",
    "SI",
    "SK",
    "SV",
    "TD",
    "TH",
    "TN",
    "TR",
    "TZ",
    "UA",
    "UG",
    "US",
    "UY",
    "VE",
    "YE",
    "ZA",
    "ZM",
    "ZW",
  ];

  useEffect(() => {
    setMovieIdRequest(movieId);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movieIdRequest}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieIdRequest}/watch/providers?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c`
      ),
    ])
      .then(([resMovie, resProviders]) =>
        Promise.all([resMovie.json(), resProviders.json()])
      )
      .then(([dataMovies, dataProviders]) => {
        setData({
          budget: dataMovies.budget,
          originalTitle: dataMovies.original_title,
          portugueseTitle: dataMovies.title,
          poster_path: dataMovies.poster_path,
          gender: dataMovies.genres
            ? dataMovies.genres.map((genre) => genre.name).join(", ")
            : "",
          providers: providers.reduce((acc, provider) => {
            if (
              dataProviders.results &&
              dataProviders.results[provider] &&
              dataProviders.results[provider].flatrate
            ) {
              acc[provider] = dataProviders.results[provider].flatrate
                .map((providerItem) => providerItem.provider_name)
                .join(", ");
            } else {
              acc[provider] = "";
            }
            return acc;
          }, {}),
        });
        setIsLoading(false);
      });
  }, [movieId, movieIdRequest, providers]);

  if (isLoading) {
    return <p>Carregando dados...</p>;
  }

  let poster = "/callback.png";

  if (data.poster_path) {
    poster = "https://image.tmdb.org/t/p/original" + data.poster_path;
  }

  function getProgressColor(progressValue) {
    if (progressValue >= 0.1 && progressValue <= 3.999) {
      return "red";
    } else if (progressValue >= 4.0 && progressValue <= 5.999) {
      return "yellow";
    } else if (progressValue >= 6 && progressValue <= 7.999) {
      return "green";
    } else if (progressValue >= 8 && progressValue <= 10) {
      return "blue";
    } else {
      return "gray";
    }
  }

  return (
    <>
      {" "}
      <span className={styles.title}>{data.originalTitle}</span>
      <br />
      <br />
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <ChakraProvider>
          <Progress
            hasStripe
            value={data.average}
            max={10}
            colorScheme={getProgressColor(data.average)}
          />
        </ChakraProvider>
      </div>
      <br />
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <span>
            <span>
              {poster != null ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.card_image_big}
                  src={poster}
                  alt="poster"
                  width="480"
                  height="720"
                />
              ) : (
                <Image
                  className={styles.card_image_big}
                  src="/callback.png"
                  alt="poster"
                  width="480"
                  height="720"
                />
              )}
            </span>
          </span>
        )}
      </div>
      {/* Tabela aqui para baixo */}
      <br />
      <div
        style={{ maxWidth: "480px", margin: "0 auto", wordBreak: "break-word" }}
      >
        <ChakraProvider>
          <TableContainer>
            <Table size="sm">
              <Tbody>
                <Tr>
                  <Th>Streamings Andorra</Th>
                  <Td>
                    {data.providers && data.providers.AD
                      ? data.providers.AD
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Emirados Árabes Unidos</Th>
                  <Td>
                    {data.providers && data.providers.AE
                      ? data.providers.AE
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Albânia</Th>
                  <Td>
                    {data.providers && data.providers.AL
                      ? data.providers.AL
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Angola</Th>
                  <Td>
                    {data.providers && data.providers.AO
                      ? data.providers.AO
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Argentina</Th>
                  <Td>
                    {data.providers && data.providers.AR
                      ? data.providers.AR
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Áustria</Th>
                  <Td>
                    {data.providers && data.providers.AT
                      ? data.providers.AT
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Austrália</Th>
                  <Td>
                    {data.providers && data.providers.AU
                      ? data.providers.AU
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Bósnia e Herzegovina</Th>
                  <Td>
                    {data.providers && data.providers.BA
                      ? data.providers.BA
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Bélgica</Th>
                  <Td>
                    {data.providers && data.providers.BE
                      ? data.providers.BE
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Burkina Faso</Th>
                  <Td>
                    {data.providers && data.providers.BF
                      ? data.providers.BF
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Bulgária</Th>
                  <Td>
                    {data.providers && data.providers.BG
                      ? data.providers.BG
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Bahrein</Th>
                  <Td>
                    {data.providers && data.providers.BH
                      ? data.providers.BH
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Bolívia</Th>
                  <Td>
                    {data.providers && data.providers.BO
                      ? data.providers.BO
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Brasil</Th>
                  <Td>
                    {data.providers && data.providers.BR
                      ? data.providers.BR
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Belize</Th>
                  <Td>
                    {data.providers && data.providers.BZ
                      ? data.providers.BZ
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Canadá</Th>
                  <Td>
                    {data.providers && data.providers.CA
                      ? data.providers.CA
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings República Democrática do Congo</Th>
                  <Td>
                    {data.providers && data.providers.CD
                      ? data.providers.CD
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Suíça</Th>
                  <Td>
                    {data.providers && data.providers.CH
                      ? data.providers.CH
                      : ""}
                  </Td>
                </Tr>

                <Tr>
                  <Th>Streamings Costa do Marfim</Th>
                  <Td>
                    {data.providers && data.providers.CI
                      ? data.providers.CI
                      : ""}
                  </Td>
                </Tr>

                
                <Tr>
  <Th>Streamings Chile</Th>
  <Td>{data.providers && data.providers.CL ? data.providers.CL : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Camarões</Th>
  <Td>{data.providers && data.providers.CM ? data.providers.CM : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Colômbia</Th>
  <Td>{data.providers && data.providers.CO ? data.providers.CO : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Costa Rica</Th>
  <Td>{data.providers && data.providers.CR ? data.providers.CR : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Cabo Verde</Th>
  <Td>{data.providers && data.providers.CV ? data.providers.CV : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings República Tcheca</Th>
  <Td>{data.providers && data.providers.CZ ? data.providers.CZ : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Alemanha</Th>
  <Td>{data.providers && data.providers.DE ? data.providers.DE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Dinamarca</Th>
  <Td>{data.providers && data.providers.DK ? data.providers.DK : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings República Dominicana</Th>
  <Td>{data.providers && data.providers.DO ? data.providers.DO : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Argélia</Th>
  <Td>{data.providers && data.providers.DZ ? data.providers.DZ : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Equador</Th>
  <Td>{data.providers && data.providers.EC ? data.providers.EC : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Estônia</Th>
  <Td>{data.providers && data.providers.EE ? data.providers.EE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Egito</Th>
  <Td>{data.providers && data.providers.EG ? data.providers.EG : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Espanha</Th>
  <Td>{data.providers && data.providers.ES ? data.providers.ES : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Finlândia</Th>
  <Td>{data.providers && data.providers.FI ? data.providers.FI : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings França</Th>
  <Td>{data.providers && data.providers.FR ? data.providers.FR : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Reino Unido</Th>
  <Td>{data.providers && data.providers.GB ? data.providers.GB : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Guernsey</Th>
  <Td>{data.providers && data.providers.GG ? data.providers.GG : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Gana</Th>
  <Td>{data.providers && data.providers.GH ? data.providers.GH : ''}</Td>
</Tr>
<Tr>
  <Th>Streamings Gibraltar</Th>
  <Td>{data.providers && data.providers.GI ? data.providers.GI : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Guatemala</Th>
  <Td>{data.providers && data.providers.GT ? data.providers.GT : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Honduras</Th>
  <Td>{data.providers && data.providers.HN ? data.providers.HN : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Croácia</Th>
  <Td>{data.providers && data.providers.HR ? data.providers.HR : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Hungria</Th>
  <Td>{data.providers && data.providers.HU ? data.providers.HU : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Indonésia</Th>
  <Td>{data.providers && data.providers.ID ? data.providers.ID : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Irlanda</Th>
  <Td>{data.providers && data.providers.IE ? data.providers.IE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Israel</Th>
  <Td>{data.providers && data.providers.IL ? data.providers.IL : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Índia</Th>
  <Td>{data.providers && data.providers.IN ? data.providers.IN : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Iraque</Th>
  <Td>{data.providers && data.providers.IQ ? data.providers.IQ : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Itália</Th>
  <Td>{data.providers && data.providers.IT ? data.providers.IT : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Jordânia</Th>
  <Td>{data.providers && data.providers.JO ? data.providers.JO : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Japão</Th>
  <Td>{data.providers && data.providers.JP ? data.providers.JP : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Quênia</Th>
  <Td>{data.providers && data.providers.KE ? data.providers.KE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Coreia do Sul</Th>
  <Td>{data.providers && data.providers.KR ? data.providers.KR : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Kuwait</Th>
  <Td>{data.providers && data.providers.KW ? data.providers.KW : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Líbano</Th>
  <Td>{data.providers && data.providers.LB ? data.providers.LB : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Lituânia</Th>
  <Td>{data.providers && data.providers.LT ? data.providers.LT : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Luxemburgo</Th>
  <Td>{data.providers && data.providers.LU ? data.providers.LU : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Letônia</Th>
  <Td>{data.providers && data.providers.LV ? data.providers.LV : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Líbia</Th>
  <Td>{data.providers && data.providers.LY ? data.providers.LY : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Marrocos</Th>
  <Td>{data.providers && data.providers.MA ? data.providers.MA : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Madagascar</Th>
  <Td>{data.providers && data.providers.MG ? data.providers.MG : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Macedônia do Norte</Th>
  <Td>{data.providers && data.providers.MK ? data.providers.MK : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Mali</Th>
  <Td>{data.providers && data.providers.ML ? data.providers.ML : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Maurício</Th>
  <Td>{data.providers && data.providers.MU ? data.providers.MU : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Malawi</Th>
  <Td>{data.providers && data.providers.MW ? data.providers.MW : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings México</Th>
  <Td>{data.providers && data.providers.MX ? data.providers.MX : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Malásia</Th>
  <Td>{data.providers && data.providers.MY ? data.providers.MY : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Moçambique</Th>
  <Td>{data.providers && data.providers.MZ ? data.providers.MZ : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Níger</Th>
  <Td>{data.providers && data.providers.NE ? data.providers.NE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Nigéria</Th>
  <Td>{data.providers && data.providers.NG ? data.providers.NG : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Nicarágua</Th>
  <Td>{data.providers && data.providers.NI ? data.providers.NI : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Holanda</Th>
  <Td>{data.providers && data.providers.NL ? data.providers.NL : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Noruega</Th>
  <Td>{data.providers && data.providers.NO ? data.providers.NO : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Nova Zelândia</Th>
  <Td>{data.providers && data.providers.NZ ? data.providers.NZ : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Omã</Th>
  <Td>{data.providers && data.providers.OM ? data.providers.OM : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Panamá</Th>
  <Td>{data.providers && data.providers.PA ? data.providers.PA : ''}</Td>
</Tr>
<Tr>
  <Th>Streamings Peru</Th>
  <Td>{data.providers && data.providers.PE ? data.providers.PE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Filipinas</Th>
  <Td>{data.providers && data.providers.PH ? data.providers.PH : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Polônia</Th>
  <Td>{data.providers && data.providers.PL ? data.providers.PL : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Portugal</Th>
  <Td>{data.providers && data.providers.PT ? data.providers.PT : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Paraguai</Th>
  <Td>{data.providers && data.providers.PY ? data.providers.PY : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Catar</Th>
  <Td>{data.providers && data.providers.QA ? data.providers.QA : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Romênia</Th>
  <Td>{data.providers && data.providers.RO ? data.providers.RO : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Sérvia</Th>
  <Td>{data.providers && data.providers.RS ? data.providers.RS : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Rússia</Th>
  <Td>{data.providers && data.providers.RU ? data.providers.RU : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Arábia Saudita</Th>
  <Td>{data.providers && data.providers.SA ? data.providers.SA : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Suécia</Th>
  <Td>{data.providers && data.providers.SE ? data.providers.SE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Singapura</Th>
  <Td>{data.providers && data.providers.SG ? data.providers.SG : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Eslovênia</Th>
  <Td>{data.providers && data.providers.SI ? data.providers.SI : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Eslováquia</Th>
  <Td>{data.providers && data.providers.SK ? data.providers.SK : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings El Salvador</Th>
  <Td>{data.providers && data.providers.SV ? data.providers.SV : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Chade</Th>
  <Td>{data.providers && data.providers.TD ? data.providers.TD : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Tailândia</Th>
  <Td>{data.providers && data.providers.TH ? data.providers.TH : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Tunísia</Th>
  <Td>{data.providers && data.providers.TN ? data.providers.TN : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Turquia</Th>
  <Td>{data.providers && data.providers.TR ? data.providers.TR : ''}</Td>
</Tr>
<Tr>
  <Th>Streamings Tanzânia</Th>
  <Td>{data.providers && data.providers.TZ ? data.providers.TZ : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Ucrânia</Th>
  <Td>{data.providers && data.providers.UA ? data.providers.UA : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Uganda</Th>
  <Td>{data.providers && data.providers.UG ? data.providers.UG : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Estados Unidos</Th>
  <Td>{data.providers && data.providers.US ? data.providers.US : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Uruguai</Th>
  <Td>{data.providers && data.providers.UY ? data.providers.UY : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Venezuela</Th>
  <Td>{data.providers && data.providers.VE ? data.providers.VE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Iêmen</Th>
  <Td>{data.providers && data.providers.YE ? data.providers.YE : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings África do Sul</Th>
  <Td>{data.providers && data.providers.ZA ? data.providers.ZA : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Zâmbia</Th>
  <Td>{data.providers && data.providers.ZM ? data.providers.ZM : ''}</Td>
</Tr>

<Tr>
  <Th>Streamings Zimbábue</Th>
  <Td>{data.providers && data.providers.ZW ? data.providers.ZW : ''}</Td>
</Tr>








              </Tbody>
              <Thead />
            </Table>
          </TableContainer>
        </ChakraProvider>
        <div />
      </div>
    </>
  );
};

export default MoviePage;
