export interface Country {
  code: string;
  name: string;
  flag: string;
  locale: string;
  phoneFormat: string;
  phonePrefix: string;
  ssnLabel: string;
  ssnFormat: string;
  stateLabel: string;
}

export const countries: Country[] = [
  {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    locale: "en-US",
    phoneFormat: "(NNN) NNN-NNNN",
    phonePrefix: "+1",
    ssnLabel: "SSN",
    ssnFormat: "NNN-NN-NNNN",
    stateLabel: "State",
  },
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    locale: "en-GB",
    phoneFormat: "NNNN NNNNNN",
    phonePrefix: "+44",
    ssnLabel: "NI Number",
    ssnFormat: "AA NNNNNN A",
    stateLabel: "County",
  },
  {
    code: "ca",
    name: "Canada",
    flag: "🇨🇦",
    locale: "en-CA",
    phoneFormat: "(NNN) NNN-NNNN",
    phonePrefix: "+1",
    ssnLabel: "SIN",
    ssnFormat: "NNN NNN NNN",
    stateLabel: "Province",
  },
  {
    code: "au",
    name: "Australia",
    flag: "🇦🇺",
    locale: "en-AU",
    phoneFormat: "NNNN NNN NNN",
    phonePrefix: "+61",
    ssnLabel: "TFN",
    ssnFormat: "NNN NNN NNN",
    stateLabel: "State",
  },
  {
    code: "de",
    name: "Germany",
    flag: "🇩🇪",
    locale: "de-DE",
    phoneFormat: "NNNN NNNNNNN",
    phonePrefix: "+49",
    ssnLabel: "Sozialversicherungsnummer",
    ssnFormat: "NN NNNNNN A NNN",
    stateLabel: "Bundesland",
  },
  {
    code: "fr",
    name: "France",
    flag: "🇫🇷",
    locale: "fr-FR",
    phoneFormat: "NN NN NN NN NN",
    phonePrefix: "+33",
    ssnLabel: "Numéro de sécurité sociale",
    ssnFormat: "N NN NN NN NNN NNN NN",
    stateLabel: "Région",
  },
  {
    code: "es",
    name: "Spain",
    flag: "🇪🇸",
    locale: "es-ES",
    phoneFormat: "NNN NNN NNN",
    phonePrefix: "+34",
    ssnLabel: "DNI",
    ssnFormat: "NNNNNNNN-A",
    stateLabel: "Provincia",
  },
  {
    code: "br",
    name: "Brazil",
    flag: "🇧🇷",
    locale: "pt-BR",
    phoneFormat: "(NN) NNNNN-NNNN",
    phonePrefix: "+55",
    ssnLabel: "CPF",
    ssnFormat: "NNN.NNN.NNN-NN",
    stateLabel: "Estado",
  },
  {
    code: "in",
    name: "India",
    flag: "🇮🇳",
    locale: "en-IN",
    phoneFormat: "NNNNN NNNNN",
    phonePrefix: "+91",
    ssnLabel: "Aadhaar",
    ssnFormat: "NNNN NNNN NNNN",
    stateLabel: "State",
  },
  {
    code: "jp",
    name: "Japan",
    flag: "🇯🇵",
    locale: "ja-JP",
    phoneFormat: "NNN-NNNN-NNNN",
    phonePrefix: "+81",
    ssnLabel: "My Number",
    ssnFormat: "NNNN NNNN NNNN",
    stateLabel: "Prefecture",
  },
];

export function getCountry(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}
