import React from "react";

const languageDictionary = {
  Directing: { pt: "Direção" },
  Writing: { pt: "Roteiro/Escrita" },
  Production: { pt: "Produção" },
  Sound: { pt: "Som" },
  Camera: { pt: "Fotografia" },
  Art: { pt: "Arte/Design de Produção" },
  Editing: { pt: "Edição" },
  "Costume & Make-Up": { pt: "Figurino e Maquiagem" },
  Crew: { pt: "Equipe/Técnica" },
  "Visual Effects": { pt: "Efeitos Visuais" },
  Lighting: { pt: "Iluminação" },
  Acting: { pt: "Atuação"}
};


const TranslateProfile = ({ text, language }) => {
  const translate = (text) => {
    return languageDictionary[text]?.[language] || text;
  };
  return <span>{translate(text)}</span>;
};

export default TranslateProfile;

