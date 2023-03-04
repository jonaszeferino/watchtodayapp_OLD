import React from "react";

// iso_639_1

// const TranslationComponentCountryName = ({ text, language }) => {
//   const translate = (text) => {
//     switch (text) {
//       case "Afghanistan":
//         return language === "pt" ? "Afeganistão" : text;
//       case "Albania":
//         return language === "pt" ? "Albânia" : text;
//       case "Algeria":
//         return language === "pt" ? "Argélia" : text;
//       case "Andorra":
//         return language === "pt" ? "Andorra" : text;
//       case "Angola":
//         return language === "pt" ? "Angola" : text;
//       case "Antigua and Barbuda":
//         return language === "pt" ? "Antígua e Barbuda" : text;
//       case "Argentina":
//         return language === "pt" ? "Argentina" : text;
//       case "Armenia":
//         return language === "pt" ? "Armênia" : text;
//       case "Australia":
//         return language === "pt" ? "Austrália" : text;
//       case "Austria":
//         return language === "pt" ? "Áustria" : text;
//       case "Azerbaijan":
//         return language === "pt" ? "Azerbaijão" : text;
//       case "Bahamas":
//         return language === "pt" ? "Bahamas" : text;
//       case "Bahrain":
//         return language === "pt" ? "Bahrein" : text;
//       case "Bangladesh":
//         return language === "pt" ? "Bangladesh" : text;
//       case "Barbados":
//         return language === "pt" ? "Barbados" : text;
//       case "Belarus":
//         return language === "pt" ? "Belarus" : text;
//       case "Belgium":
//         return language === "pt" ? "Bélgica" : text;
//       case "Belize":
//         return language === "pt" ? "Belize" : text;
//       case "Benin":
//         return language === "pt" ? "Benin" : text;
//       case "Bhutan":
//         return language === "pt" ? "Butão" : text;
//       case "Bolivia":
//         return language === "pt" ? "Bolívia" : text;
//       case "Bosnia and Herzegovina":
//         return language === "pt" ? "Bósnia e Herzegovina" : text;
//       case "Botswana":
//         return language === "pt" ? "Botswana" : text;
//       case "Brazil":
//         return language === "pt" ? "Brasil" : text;
//       case "Brunei":
//         return language === "pt" ? "Brunei" : text;
//       case "Bulgaria":
//         return language === "pt" ? "Bulgária" : text;
//       case "Burkina Faso":
//         return language === "pt" ? "Burkina Faso" : text;
//       case "Burundi":
//         return language === "pt" ? "Burundi" : text;
//       case "Cabo Verde":
//         return language === "pt" ? "Cabo Verde" : text;
//       case "Cambodia":
//         return language === "pt" ? "Camboja" : text;
//       case "Cameroon":
//         return language === "pt" ? "Camarões" : text;
//       case "Canada":
//         return language === "pt" ? "Canadá" : text;
//       case "Central African Republic":
//         return language === "pt" ? "República Centro-Africana" : text;
//       case "Chad":
//         return language === "pt" ? "Chade" : text;
//       case "Chile":
//         return language === "pt" ? "Chile" : text;
//       case "China":
//         return language === "pt" ? "China" : text;
//       case "Colombia":
//         return language === "pt" ? "Colômbia" : text;
//       case "Comoros":
//         return language === "pt" ? "Comores" : text;
//       case "Congo":
//         return language === "pt" ? "Congo" : text;
//       case "Costa Rica":
//         return language === "pt" ? "Costa Rica" : text;
//       case "Cote d'Ivoire":
//         return language === "pt" ? "Costa do Marfim" : text;
//       case "Croatia":
//         return language === "pt" ? "Croácia" : text;
//       case "Cuba":
//         return language === "pt" ? "Cuba" : text;
//       case "Cyprus":
//         return language === "pt" ? "Chipre" : text;
//       case "Czech Republic":
//         return language === "pt" ? "República Tcheca" : text;
//       case "Denmark":
//         return language === "pt" ? "Dinamarca" : text;
//       case "Djibouti":
//         return language === "pt" ? "Djibuti" : text;
//       case "Dominica":
//         return language === "pt" ? "Dominica" : text;
//       case "Dominican Republic":
//         return language === "pt" ? "República Dominicana" : text;
//       case "Ecuador":
//         return language === "pt" ? "Equador" : text;
//       case "Egypt":
//         return language === "pt" ? "Egito" : text;
//       case "El Salvador":
//         return language === "pt" ? "El Salvador" : text;
//       case "Equatorial Guinea":
//         return language === "pt" ? "Guiné Equatorial" : text;
//       case "Eritrea":
//         return language === "pt" ? "Eritreia" : text;
//       case "Estonia":
//         return language === "pt" ? "Estônia" : text;
//       case "Ethiopia":
//         return language === "pt" ? "Etiópia" : text;
//       case "Fiji":
//         return language === "pt" ? "Fiji" : text;

//       case "Finland":
//         return language === "pt" ? "Finlândia" : text;
//       case "France":
//         return language === "pt" ? "França" : text;
//       case "Gabon":
//         return language === "pt" ? "Gabão" : text;
//       case "Gambia":
//         return language === "pt" ? "Gâmbia" : text;
//       case "Georgia":
//         return language === "pt" ? "Geórgia" : text;
//       case "Germany":
//         return language === "pt" ? "Alemanha" : text;
//       case "Ghana":
//         return language === "pt" ? "Gana" : text;
//       case "Greece":
//         return language === "pt" ? "Grécia" : text;
//       case "Grenada":
//         return language === "pt" ? "Granada" : text;
//       case "Guatemala":
//         return language === "pt" ? "Guatemala" : text;
//       case "Guinea":
//         return language === "pt" ? "Guiné" : text;
//       case "Guinea-Bissau":
//         return language === "pt" ? "Guiné-Bissau" : text;
//       case "Guyana":
//         return language === "pt" ? "Guiana" : text;
//       case "Haiti":
//         return language === "pt" ? "Haiti" : text;
//       case "Honduras":
//         return language === "pt" ? "Honduras" : text;
//       case "Hungary":
//         return language === "pt" ? "Hungria" : text;
//       case "Iceland":
//         return language === "pt" ? "Islândia" : text;
//       case "India":
//         return language === "pt" ? "Índia" : text;
//       case "Indonesia":
//         return language === "pt" ? "Indonésia" : text;
//       case "Iran":
//         return language === "pt" ? "Irã" : text;
//       case "Iraq":
//         return language === "pt" ? "Iraque" : text;
//       case "Ireland":
//         return language === "pt" ? "Irlanda" : text;
//       case "Israel":
//         return language === "pt" ? "Israel" : text;
//       case "Italy":
//         return language === "pt" ? "Itália" : text;
//       case "Jamaica":
//         return language === "pt" ? "Jamaica" : text;
//       case "Japan":
//         return language === "pt" ? "Japão" : text;
//       case "Jordan":
//         return language === "pt" ? "Jordânia" : text;
//       case "Kazakhstan":
//         return language === "pt" ? "Cazaquistão" : text;
//       case "Kenya":
//         return language === "pt" ? "Quênia" : text;
//       case "Kiribati":
//         return language === "pt" ? "Kiribati" : text;
//       case "North Korea":
//         return language === "pt" ? "Coréia do Norte" : text;
//       case "South Korea":
//         return language === "pt" ? "Coréia do Sul" : text;
//       case "Kuwait":
//         return language === "pt" ? "Kuwait" : text;
//       case "Kyrgyzstan":
//         return language === "pt" ? "Quirguistão" : text;
//       case "Laos":
//         return language === "pt" ? "Laos" : text;
//       case "Latvia":
//         return language === "pt" ? "Latvia" : text;
//       case "Lebanon":
//         return language === "pt" ? "Líbano" : text;
//       case "Lesotho":
//         return language === "pt" ? "Lesoto" : text;
//       case "Liberia":
//         return language === "pt" ? "Libéria" : text;
//       case "Libya":
//         return language === "pt" ? "Líbia" : text;
//       case "Liechtenstein":
//         return language === "pt" ? "Liechtenstein" : text;
//       case "Lithuania":
//         return language === "pt" ? "Lituânia" : text;
//       case "Luxembourg":
//         return language === "pt" ? "Luxemburgo" : text;
//       case "Macedonia":
//         return language === "pt" ? "Macedônia" : text;
//       case "Madagascar":
//         return language === "pt" ? "Madagascar" : text;
//       case "Malawi":
//         return language === "pt" ? "Malawi" : text;
//       case "Malaysia":
//         return language === "pt" ? "Malásia" : text;
//       case "Maldives":
//         return language === "pt" ? "Maldivas" : text;
//       case "Mali":
//         return language === "pt" ? "Mali" : text;
//       case "Malta":
//         return language === "pt" ? "Malta" : text;
//       case "Marshall Islands":
//         return language === "pt" ? "Ilhas Marshall" : text;
//       case "Mauritania":
//         return language === "pt" ? "Mauritânia" : text;
//       case "Mauritius":
//         return language === "pt" ? "Maurício" : text;
//       case "Mexico":
//         return language === "pt" ? "México" : text;
//       case "Micronesia":
//         return language === "pt" ? "Micronésia" : text;
//       case "Moldova":
//         return language === "pt" ? "Moldávia" : text;
//       case "Monaco":
//         return language === "pt" ? "Mônaco" : text;
//       case "Mongolia":
//         return language === "pt" ? "Mongólia" : text;
//       case "Montenegro":
//         return language === "pt" ? "Montenegro" : text;
//       case "Morocco":
//         return language === "pt" ? "Marrocos" : text;
//       case "Mozambique":
//         return language === "pt" ? "Moçambique" : text;
//       case "Myanmar":
//         return language === "pt" ? "Myanmar" : text;
//       case "Namibia":
//         return language === "pt" ? "Namíbia" : text;
//       case "Nauru":
//         return language === "pt" ? "Nauru" : text;
//       case "Nepal":
//         return language === "pt" ? "Nepal" : text;
//       case "Netherlands":
//         return language === "pt" ? "Países Baixos" : text;
//       case "New Zealand":
//         return language === "pt" ? "Nova Zelândia" : text;
//       case "Nicaragua":
//         return language === "pt" ? "Nicarágua" : text;
//       case "Niger":
//         return language === "pt" ? "Níger" : text;
//       case "Nigeria":
//         return language === "pt" ? "Nigéria" : text;
//       case "Norway":
//         return language === "pt" ? "Noruega" : text;
//       case "Oman":
//         return language === "pt" ? "Omã" : text;
//       case "Pakistan":
//         return language === "pt" ? "Paquistão" : text;
//       case "Palau":
//         return language === "pt" ? "Palau" : text;
//       case "Panama":
//         return language === "pt" ? "Panamá" : text;
//       case "Papua New Guinea":
//         return language === "pt" ? "Papua Nova Guiné" : text;
//       case "Paraguay":
//         return language === "pt" ? "Paraguai" : text;
//       case "Peru":
//         return language === "pt" ? "Peru" : text;
//       case "Philippines":
//         return language === "pt" ? "Filipinas" : text;
//       case "Poland":
//         return language === "pt" ? "Polônia" : text;
//       case "Portugal":
//         return language === "pt" ? "Portugal" : text;
//       case "Qatar":
//         return language === "pt" ? "Catar" : text;
//       case "Romania":
//         return language === "pt" ? "Romênia" : text;
//       case "Russia":
//         return language === "pt" ? "Rússia" : text;
//       case "Rwanda":
//         return language === "pt" ? "Ruanda" : text;
//       case "Saint Kitts and Nevis":
//         return language === "pt" ? "São Cristóvão e Nevis" : text;
//       case "Saint Lucia":
//         return language === "pt" ? "Santa Lúcia" : text;
//       case "Saint Vincent and the Grenadines":
//         return language === "pt" ? "São Vicente e Granadinas" : text;

//       case "Samoa":
//         return language === "pt" ? "Samoa" : text;
//       case "San Marino":
//         return language === "pt" ? "San Marino" : text;
//       case "Sao Tome and Principe":
//         return language === "pt" ? "São Tomé e Príncipe" : text;
//       case "Saudi Arabia":
//         return language === "pt" ? "Arábia Saudita" : text;
//       case "Senegal":
//         return language === "pt" ? "Senegal" : text;
//       case "Serbia":
//         return language === "pt" ? "Sérvia" : text;
//       case "Seychelles":
//         return language === "pt" ? "Seychelles" : text;
//       case "Sierra Leone":
//         return language === "pt" ? "Serra Leoa" : text;
//       case "Singapore":
//         return language === "pt" ? "Cingapura" : text;
//       case "Slovakia":
//         return language === "pt" ? "Eslováquia" : text;
//       case "Slovenia":
//         return language === "pt" ? "Eslovênia" : text;
//       case "Solomon Islands":
//         return language === "pt" ? "Ilhas Salomão" : text;
//       case "Somalia":
//         return language === "pt" ? "Somália" : text;
//       case "South Africa":
//         return language === "pt" ? "África do Sul" : text;
//       case "South Korea":
//         return language === "pt" ? "Coreia do Sul" : text;
//       case "South Sudan":
//         return language === "pt" ? "Sudão do Sul" : text;
//       case "Spain":
//         return language === "pt" ? "Espanha" : text;
//       case "Sri Lanka":
//         return language === "pt" ? "Sri Lanka" : text;
//       case "Sudan":
//         return language === "pt" ? "Sudão" : text;
//       case "Suriname":
//         return language === "pt" ? "Suriname" : text;
//       case "Sweden":
//         return language === "pt" ? "Suécia" : text;
//       case "Switzerland":
//         return language === "pt" ? "Suíça" : text;
//       case "Syria":
//         return language === "pt" ? "Síria" : text;

//       case "Soviet Union":
//         return language === "pt" ? "União Soviética" : text;

//       case "Taiwan":
//         return language === "pt" ? "Taiwan" : text;
//       case "Tajikistan":
//         return language === "pt" ? "Tajiquistão" : text;
//       case "Tanzania":
//         return language === "pt" ? "Tanzânia" : text;
//       case "Thailand":
//         return language === "pt" ? "Tailândia" : text;
//       case "Timor-Leste":
//         return language === "pt" ? "Timor-Leste" : text;
//       case "Togo":
//         return language === "pt" ? "Togo" : text;

//       case "Tonga":
//         return language === "pt" ? "Tonga" : text;
//       case "Trinidad and Tobago":
//         return language === "pt" ? "Trinidad e Tobago" : text;
//       case "Tunisia":
//         return language === "pt" ? "Tunísia" : text;
//       case "Turkey":
//         return language === "pt" ? "Turquia" : text;
//       case "Turkmenistan":
//         return language === "pt" ? "Turcomenistão" : text;
//       case "Tuvalu":
//         return language === "pt" ? "Tuvalu" : text;
//       case "Uganda":
//         return language === "pt" ? "Uganda" : text;
//       case "Ukraine":
//         return language === "pt" ? "Ucrânia" : text;
//       case "United Arab Emirates":
//         return language === "pt" ? "Emirados Árabes Unidos" : text;
//       case "United Kingdom":
//         return language === "pt" ? "Reino Unido" : text;
//       case "United States of America":
//         return language === "pt" ? "Estados Unidos da América" : text;
//       case "Uruguay":
//         return language === "pt" ? "Uruguai" : text;
//       case "Uzbekistan":
//         return language === "pt" ? "Uzbequistão" : text;
//       case "Vanuatu":
//         return language === "pt" ? "Vanuatu" : text;
//       case "Vatican City":
//         return language === "pt" ? "Cidade do Vaticano" : text;
//       case "Venezuela":
//         return language === "pt" ? "Venezuela" : text;
//       case "Vietnam":
//         return language === "pt" ? "Vietnã" : text;
//       case "Yemen":
//         return language === "pt" ? "Iêmen" : text;
//       case "Zambia":
//         return language === "pt" ? "Zâmbia" : text;
//       case "Zimbabwe":
//         return language === "pt" ? "Zimbábue" : text;

//       default:
//         return text;
//     }
//   };

//   return translate(text);
// };

// export default TranslationComponentCountryName;

const countryNames = {
  Afghanistan: { pt: "Afeganistão" },
  Albania: { pt: "Albânia" },
  Algeria: { pt: "Argélia" },
  Andorra: { pt: "Andorra" },
  Angola: { pt: "Angola" },
  "Antigua and Barbuda": { pt: "Antígua e Barbuda" },
  Argentina: { pt: "Argentina" },
  Armenia: { pt: "Armênia" },
  Australia: { pt: "Austrália" },
  Austria: { pt: "Áustria" },
  Azerbaijan: { pt: "Azerbaijão" },
  Bahamas: { pt: "Bahamas" },
  Bahrain: { pt: "Bahrein" },
  Bangladesh: { pt: "Bangladesh" },
  Barbados: { pt: "Barbados" },
  Belarus: { pt: "Belarus" },
  Belgium: { pt: "Bélgica" },
  Belize: {
    pt: "Belize",
    en: "Belize",
  },
  Benin: {
    pt: "Benin",
    en: "Benin",
  },
  Bhutan: {
    pt: "Butão",
    en: "Bhutan",
  },
  Bolivia: {
    pt: "Bolívia",
    en: "Bolivia",
  },
  "Bosnia and Herzegovina": {
    pt: "Bósnia e Herzegovina",
    en: "Bosnia and Herzegovina",
  },
  Botswana: {
    pt: "Botswana",
    en: "Botswana",
  },
  Brazil: {
    pt: "Brasil",
    en: "Brazil",
  },
  Brunei: {
    pt: "Brunei",
    en: "Brunei",
  },
  Bulgaria: {
    pt: "Bulgária",
    en: "Bulgaria",
  },
  "Burkina Faso": {
    pt: "Burkina Faso",
    en: "Burkina Faso",
  },
  Burundi: {
    pt: "Burundi",
    en: "Burundi",
  },
  "Cabo Verde": {
    pt: "Cabo Verde",
    en: "Cape Verde",
  },
  Cambodia: {
    pt: "Camboja",
    en: "Cambodia",
  },
  Cameroon: {
    pt: "Camarões",
    en: "Cameroon",
  },
  Canada: {
    pt: "Canadá",
    en: "Canada",
  },
  "Central African Republic": {
    pt: "República Centro-Africana",
    en: "Central African Republic",
  },
  Chad: {
    pt: "Chade",
    en: "Chad",
  },
  Chile: {
    pt: "Chile",
    en: "Chile",
  },
  China: {
    pt: "China",
    en: "China",
  },
  Colombia: {
    pt: "Colômbia",
    en: "Colombia",
  },
  Comoros: {
    pt: "Comores",
    en: "Comoros",
  },
  Congo: {
    pt: "Congo",
    en: "Congo",
  },
  "Costa Rica": {
    pt: "Costa Rica",
    en: "Costa Rica",
  },
  "Cote d'Ivoire": {
    pt: "Costa do Marfim",
    en: "Cote d'Ivoire",
  },
  Croatia: {
    pt: "Croácia",
    en: "Croatia",
  },
  Cuba: {
    pt: "Cuba",
    en: "Cuba",
  },
  Cyprus: {
    pt: "Chipre",
    en: "Cyprus",
  },
  "Czech Republic": {
    pt: "República Tcheca",
    en: "Czech Republic",
  },
  Denmark: {
    pt: "Dinamarca",
  },
  Djibouti: {
    pt: "Djibuti",
  },
  Dominica: {
    pt: "Dominica",
  },
  "Dominican Republic": {
    pt: "República Dominicana",
  },
  Ecuador: {
    pt: "Equador",
  },
  Egypt: {
    pt: "Egito",
  },
  "El Salvador": {
    pt: "El Salvador",
  },
  "Equatorial Guinea": {
    pt: "Guiné Equatorial",
  },
  Eritrea: {
    pt: "Eritreia",
  },
  Estonia: {
    pt: "Estônia",
  },
  Ethiopia: {
    pt: "Etiópia",
  },
  Fiji: {
    pt: "Fiji",
  },
  Finland: {
    pt: "Finlândia",
  },
  France: {
    pt: "França",
  },
  Gabon: {
    pt: "Gabão",
  },
  Gambia: {
    pt: "Gâmbia",
  },
  Georgia: {
    pt: "Geórgia",
  },
  Germany: {
    pt: "Alemanha",
  },
  Ghana: {
    pt: "Gana",
  },
  Greece: {
    pt: "Grécia",
  },
  Grenada: {
    pt: "Granada",
  },
  Guatemala: {
    pt: "Guatemala",
  },
  Guinea: {
    pt: "Guiné",
  },
  "Guinea-Bissau": {
    pt: "Guiné-Bissau",
  },
  Guyana: {
    pt: "Guiana",
  },
  Haiti: {
    pt: "Haiti",
  },
  Honduras: {
    pt: "Honduras",
  },
  Hungary: {
    pt: "Hungria",
  },
  Iceland: {
    pt: "Islândia",
  },
  India: {
    pt: "Índia",
  },
  Indonesia: {
    pt: "Indonésia",
  },
  Iran: {
    pt: "Irã",
  },
  Iraq: {
    pt: "Iraque",
  },
  Ireland: {
    pt: "Irlanda",
  },
  Israel: {
    pt: "Israel",
  },
  Italy: {
    pt: "Itália",
  },
  Jamaica: {
    pt: "Jamaica",
  },
  Japan: {
    pt: "Japão",
  },
  Jordan: {
    pt: "Jordânia",
  },
  Kazakhstan: { pt: "Cazaquistão" },
  Kenya: { pt: "Quênia" },
  Kiribati: { pt: "Kiribati" },
  "North Korea": { pt: "Coréia do Norte" },
  "South Korea": { pt: "Coréia do Sul" },
  Kuwait: { pt: "Kuwait" },
  Kyrgyzstan: { pt: "Quirguistão" },
  Laos: { pt: "Laos" },
  Latvia: { pt: "Latvia" },
  Lebanon: { pt: "Líbano" },
  Lesotho: { pt: "Lesoto" },
  Liberia: { pt: "Libéria" },
  Libya: { pt: "Líbia" },
  Liechtenstein: { pt: "Liechtenstein" },
  Lithuania: { pt: "Lituânia" },
  Luxembourg: { pt: "Luxemburgo" },
  Macedonia: { pt: "Macedônia" },
  Madagascar: { pt: "Madagascar" },
  Malawi: { pt: "Malawi" },
  Malaysia: { pt: "Malásia" },
  Maldives: { pt: "Maldivas" },
  Mali: { pt: "Mali" },
  Malta: { pt: "Malta" },
  "Marshall Islands": { pt: "Ilhas Marshall" },
  Mauritania: { pt: "Mauritânia" },
  Mauritius: { pt: "Maurício" },
  Mexico: { pt: "México" },
  Micronesia: { pt: "Micronésia" },
  Moldova: { pt: "Moldávia" },
  Monaco: { pt: "Mônaco" },
  Mongolia: { pt: "Mongólia" },
  Montenegro: { pt: "Montenegro" },
  Morocco: { pt: "Marrocos" },
  Mozambique: { pt: "Moçambique" },
  Myanmar: { pt: "Myanmar" },
  Namibia: { pt: "Namíbia" },
  Nauru: { pt: "Nauru" },
  Nepal: { pt: "Nepal" },
  Netherlands: { pt: "Países Baixos" },
  "New Zealand": { pt: "Nova Zelândia" },
  Nicaragua: { pt: "Nicarágua" },
  Niger: { pt: "Níger" },
  Nigeria: { pt: "Nigéria" },
  Norway: { pt: "Noruega" },
  Oman: { pt: "Omã" },
  Pakistan: { pt: "Paquistão" },
  Palau: { pt: "Palau" },
  Panama: { pt: "Panamá" },
  "Papua New Guinea": {
    en: "Papua New Guinea",
    pt: "Papua Nova Guiné",
  },
  Paraguay: {
    en: "Paraguay",
    pt: "Paraguai",
  },
  Peru: {
    en: "Peru",
    pt: "Peru",
  },
  Philippines: {
    en: "Philippines",
    pt: "Filipinas",
  },
  Poland: {
    en: "Poland",
    pt: "Polônia",
  },
  Portugal: {
    en: "Portugal",
    pt: "Portugal",
  },
  Qatar: {
    en: "Qatar",
    pt: "Catar",
  },
  Romania: {
    en: "Romania",
    pt: "Romênia",
  },
  Russia: {
    en: "Russia",
    pt: "Rússia",
  },
  Rwanda: {
    en: "Rwanda",
    pt: "Ruanda",
  },
  "Saint Kitts and Nevis": {
    en: "Saint Kitts and Nevis",
    pt: "São Cristóvão e Nevis",
  },
  "Saint Lucia": {
    en: "Saint Lucia",
    pt: "Santa Lúcia",
  },
  "Saint Vincent and the Grenadines": {
    en: "Saint Vincent and the Grenadines",
    pt: "São Vicente e Granadinas",
  },
  Samoa: {
    en: "Samoa",
    pt: "Samoa",
  },
  "San Marino": {
    en: "San Marino",
    pt: "San Marino",
  },
  "Sao Tome and Principe": {
    en: "Sao Tome and Principe",
    pt: "São Tomé e Príncipe",
  },
  "Saudi Arabia": {
    en: "Saudi Arabia",
    pt: "Arábia Saudita",
  },
  Senegal: {
    en: "Senegal",
    pt: "Senegal",
  },
  Serbia: {
    en: "Serbia",
    pt: "Sérvia",
  },
  Seychelles: {
    en: "Seychelles",
    pt: "Seychelles",
  },
  "Sierra Leone": {
    en: "Sierra Leone",
    pt: "Serra Leoa",
  },
  Singapore: {
    en: "Singapore",
    pt: "Cingapura",
  },
  Slovakia: {
    en: "Slovakia",
    pt: "Eslováquia",
  },
  Slovenia: {
    en: "Slovenia",
    pt: "Eslovênia",
  },
  "Solomon Islands": {
    en: "Solomon Islands",
    pt: "Ilhas Salomão",
  },
  Somalia: {
    en: "Somalia",
    pt: "Somália",
  },
  "South Africa": {
    en: "South Africa",
    pt: "África do Sul",
  },
  "South Korea": {
    en: "South Korea",
    pt: "Coreia do Sul",
  },
  "South Sudan": {
    en: "South Sudan",
    pt: "Sudão do Sul",
  },
  Spain: { pt: "Espanha" },
  "Sri Lanka": {
    pt: "Sri Lanka",
  },
  Sudan: {
    pt: "Sudão",
  },
  Suriname: {
    pt: "Suriname",
  },
  Sweden: {
    pt: "Suécia",
  },
  Switzerland: {
    pt: "Suíça",
  },
  Syria: {
    pt: "Síria",
  },
  "Soviet Union": {
    pt: "União Soviética",
  },
  Taiwan: {
    pt: "Taiwan",
  },
  Tajikistan: {
    pt: "Tajiquistão",
  },
  Tanzania: {
    pt: "Tanzânia",
  },
  Thailand: {
    pt: "Tailândia",
  },
  "Timor-Leste": {
    pt: "Timor-Leste",
  },
  Togo: {
    pt: "Togo",
  },
  Tonga: {
    pt: "Tonga",
  },
  "Trinidad and Tobago": {
    pt: "Trinidad e Tobago",
  },
  Tunisia: {
    pt: "Tunísia",
  },
  Turkey: {
    pt: "Turquia",
  },
  Turkmenistan: {
    pt: "Turcomenistão",
  },
  Tuvalu: {
    pt: "Tuvalu",
  },
  Uganda: {
    pt: "Uganda",
  },
  Ukraine: {
    pt: "Ucrânia",
  },
  "United Arab Emirates": {
    pt: "Emirados Árabes Unidos",
  },
  "United Kingdom": {
    pt: "Reino Unido",
  },
  "United States of America": {
    pt: "Estados Unidos da América",
  },
  Uruguay: {
    pt: "Uruguai",
  },
  Uzbekistan: {
    pt: "Uzbequistão",
  },
  Vanuatu: {
    pt: "Vanuatu",
  },
  "Vatican City": {
    pt: "Cidade do Vaticano",
  },
  Venezuela: {
    pt: "Venezuela",
  },
  Vietnam: {
    pt: "Vietnã",
  },
  Yemen: {
    pt: "Iêmen",
  },
  Zambia: {
    pt: "Zâmbia",
  },
  Zimbabwe: {
    pt: "Zimbábue",
  },
};

const TranslationComponentCountryName = ({ text, language }) => {
  const translate = (text) => {
    return countryNames[text]?.[language] || text;
  };
  return translate(text);
};

export default TranslationComponentCountryName;
