import React from "react";

// iso_639_1

const TranslationComponent = ({ text, language }) => {
  const translate = (text) => {
    switch (text) {
      case "aar":
        return language === "pt" ? "Abkhaziano" : text;
      case "ar":
        return language === "pt" ? "Árabe" : text;
      case "as":
        return language === "pt" ? "Assamês" : text;
      case "az":
        return language === "pt" ? "Azerbaijano" : text;

      case "bg":
        return language === "pt" ? "Bulgária" : text;
      case "cn":
        return language === "pt" ? "Chinês Tradicional" : text;
      case "hr":
        return language === "pt" ? "Croata" : text;
      case "cs":
        return language === "pt" ? "Tcheco" : text;
      case "da":
        return language === "pt" ? "Dinamarquês" : text;
      case "de":
        return language === "pt" ? "Alemão" : text;
      case "el":
        return language === "pt" ? "Grego Moderno" : text;
      case "en":
        return language === "pt" ? "Inglês" : text;
      case "sl":
        return language === "pt" ? "Esloveno" : text;
      case "sk":
        return language === "pt" ? "Eslovaco" : text;
      case "et":
        return language === "pt" ? "Estoniano" : text;
      case "es":
        return language === "pt" ? "Espanhol" : text;
      case "nb":
        return language === "pt" ? "Dano-norueguês" : text;
      case "fa":
        return language === "pt" ? "Persa" : text;
      case "fi":
        return language === "pt" ? "Filandês" : text;
      case "fr":
        return language === "pt" ? "Francês" : text;
      case "hi":
        return language === "pt" ? "Hindi" : text;
      case "hu":
        return language === "pt" ? "Húngaro" : text;
      case "id":
        return language === "pt" ? "Indonésio" : text;
      case "is":
        return language === "pt" ? "Islandes" : text;
      case "it":
        return language === "pt" ? "Italiano" : text;
      case "ja":
        return language === "pt" ? "Japonês" : text;
      case "ko":
        return language === "pt" ? "Coreano" : text;
      case "kn":
        return language === "pt" ? "Canarês" : text;
      case "lv":
        return language === "pt" ? "Letão" : text;
      case "ml":
        return language === "pt" ? "Malaiala" : text;
      case "mk":
        return language === "pt" ? "Macedônio" : text;
      case "ms":
        return language === "pt" ? "Malaio" : text;
      case "ne":
        return language === "pt" ? "Nepalês" : text;
      case "nl":
        return language === "pt" ? "Holandês" : text;
      case "no":
        return language === "pt" ? "Norueguês" : text;
      case "pl":
        return language === "pt" ? "Polonês" : text;
      case "pt":
        return language === "pt" ? "Português" : text;
      case "ro":
        return language === "pt" ? "Romeno" : text;
      case "ru":
        return language === "pt" ? "Russo" : text;
      case "sh":
        return language === "pt" ? "Servo-Croata" : text;
      case "so":
        return language === "pt" ? "Somali" : text;
      case "sv":
        return language === "pt" ? "Suéco" : text;
      case "sr":
        return language === "pt" ? "Sérvio" : text;
      case "ur":
        return language === "pt" ? "Urdo" : text;
      case "ta":
        return language === "pt" ? "Tâmil" : text;
      case "th":
        return language === "pt" ? "Tailandês" : text;
      case "te":
        return language === "pt" ? "Telugu" : text;
      case "tl":
        return language === "pt" ? "Tagalo" : text;
      case "tr":
        return language === "pt" ? "Turco" : text;
      case "vi":
        return language === "pt" ? "Vietnamita" : text;
      case "yi":
        return language === "pt" ? "Iídiche" : text;
      case "zh":
        return language === "pt" ? "Chinês" : text;

      default:
        return text;
    }
  };

  return translate(text);
};

export default TranslationComponent;
