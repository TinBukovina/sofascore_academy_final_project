interface CountryCodeMap {
  [key: string]: string | undefined;
}

const countryCodes: CountryCodeMap = {
  andorra: "AD",
  "united arab emirates": "AE",
  afghanistan: "AF",
  "antigua and barbuda": "AG",
  anguilla: "AI",
  albania: "AL",
  armenia: "AM",
  angola: "AO",
  antarctica: "AQ",
  argentina: "AR",
  "american samoa": "AS",
  austria: "AT",
  australia: "AU",
  aruba: "AW",
  "åland islands": "AX",
  azerbaijan: "AZ",
  "bosnia and herzegovina": "BA",
  barbados: "BB",
  bangladesh: "BD",
  belgium: "BE",
  "burkina faso": "BF",
  bulgaria: "BG",
  bahrain: "BH",
  burundi: "BI",
  benin: "BJ",
  "saint barthélemy": "BL",
  bermuda: "BM",
  brunei: "BN",
  bolivia: "BO",
  "caribbean netherlands": "BQ",
  brazil: "BR",
  bahamas: "BS",
  bhutan: "BT",
  "bouvet island": "BV",
  botswana: "BW",
  belarus: "BY",
  belize: "BZ",
  canada: "CA",
  "cocos (keeling) islands": "CC",
  "dr congo": "CD",
  "central african republic": "CF",
  "republic of the congo": "CG",
  switzerland: "CH",
  "côte d'ivoire (ivory coast)": "CI",
  "cook islands": "CK",
  chile: "CL",
  cameroon: "CM",
  china: "CN",
  colombia: "CO",
  "costa rica": "CR",
  cuba: "CU",
  "cape verde": "CV",
  curaçao: "CW",
  "christmas island": "CX",
  cyprus: "CY",
  czechia: "CZ",
  germany: "DE",
  djibouti: "DJ",
  denmark: "DK",
  dominica: "DM",
  "dominican republic": "DO",
  algeria: "DZ",
  ecuador: "EC",
  estonia: "EE",
  egypt: "EG",
  "western sahara": "EH",
  eritrea: "ER",
  spain: "ES",
  ethiopia: "ET",
  "european union": "EU",
  finland: "FI",
  fiji: "FJ",
  "falkland islands": "FK",
  micronesia: "FM",
  "faroe islands": "FO",
  france: "FR",
  gabon: "GA",
  "united kingdom": "GB",
  england: "GB-ENG",
  "northern ireland": "GB-NIR",
  scotland: "GB-SCT",
  wales: "GB-WLS",
  grenada: "GD",
  georgia: "GE",
  "french guiana": "GF",
  guernsey: "GG",
  ghana: "GH",
  gibraltar: "GI",
  greenland: "GL",
  gambia: "GM",
  guinea: "GN",
  guadeloupe: "GP",
  "equatorial guinea": "GQ",
  greece: "GR",
  "south georgia": "GS",
  guatemala: "GT",
  guam: "GU",
  "guinea-bissau": "GW",
  guyana: "GY",
  "hong kong": "HK",
  "heard island and mcdonald islands": "HM",
  honduras: "HN",
  croatia: "HR",
  haiti: "HT",
  hungary: "HU",
  indonesia: "ID",
  ireland: "IE",
  israel: "IL",
  "isle of man": "IM",
  india: "IN",
  "british indian ocean territory": "IO",
  iraq: "IQ",
  iran: "IR",
  iceland: "IS",
  italy: "IT",
  jersey: "JE",
  jamaica: "JM",
  jordan: "JO",
  japan: "JP",
  kenya: "KE",
  kyrgyzstan: "KG",
  cambodia: "KH",
  kiribati: "KI",
  comoros: "KM",
  "saint kitts and nevis": "KN",
  "north korea": "KP",
  "south korea": "KR",
  kuwait: "KW",
  "cayman islands": "KY",
  kazakhstan: "KZ",
  laos: "LA",
  lebanon: "LB",
  "saint lucia": "LC",
  liechtenstein: "LI",
  "sri lanka": "LK",
  liberia: "LR",
  lesotho: "LS",
  lithuania: "LT",
  luxembourg: "LU",
  latvia: "LV",
  libya: "LY",
  morocco: "MA",
  monaco: "MC",
  moldova: "MD",
  montenegro: "ME",
  "saint martin": "MF",
  madagascar: "MG",
  "marshall islands": "MH",
  "north macedonia": "MK",
  mali: "ML",
  myanmar: "MM",
  mongolia: "MN",
  macau: "MO",
  "northern mariana islands": "MP",
  martinique: "MQ",
  mauritania: "MR",
  montserrat: "MS",
  malta: "MT",
  mauritius: "MU",
  maldives: "MV",
  malawi: "MW",
  mexico: "MX",
  malaysia: "MY",
  mozambique: "MZ",
  namibia: "NA",
  "new caledonia": "NC",
  niger: "NE",
  "norfolk island": "NF",
  nigeria: "NG",
  nicaragua: "NI",
  netherlands: "NL",
  norway: "NO",
  nepal: "NP",
  nauru: "NR",
  niue: "NU",
  "new zealand": "NZ",
  oman: "OM",
  panama: "PA",
  peru: "PE",
  "french polynesia": "PF",
  "papua new guinea": "PG",
  philippines: "PH",
  pakistan: "PK",
  poland: "PL",
  "saint pierre and miquelon": "PM",
  "pitcairn islands": "PN",
  "puerto rico": "PR",
  palestine: "PS",
  portugal: "PT",
  palau: "PW",
  paraguay: "PY",
  qatar: "QA",
  réunion: "RE",
  romania: "RO",
  serbia: "RS",
  russia: "RU",
  rwanda: "RW",
  "saudi arabia": "SA",
  "solomon islands": "SB",
  seychelles: "SC",
  sudan: "SD",
  sweden: "SE",
  singapore: "SG",
  "saint helena, ascension and tristan da cunha": "SH",
  slovenia: "SI",
  "svalbard and jan mayen": "SJ",
  slovakia: "SK",
  "sierra leone": "SL",
  "san marino": "SM",
  senegal: "SN",
  somalia: "SO",
  suriname: "SR",
  "south sudan": "SS",
  "são tomé and príncipe": "ST",
  "el salvador": "SV",
  "sint maarten": "SX",
  syria: "SY",
  "eswatini (swaziland)": "SZ",
  "turks and caicos islands": "TC",
  chad: "TD",
  "french southern and antarctic lands": "TF",
  togo: "TG",
  thailand: "TH",
  tajikistan: "TJ",
  tokelau: "TK",
  "timor-leste": "TL",
  turkmenistan: "TM",
  tunisia: "TN",
  tonga: "TO",
  turkey: "TR",
  "trinidad and tobago": "TT",
  tuvalu: "TV",
  taiwan: "TW",
  tanzania: "TZ",
  ukraine: "UA",
  uganda: "UG",
  "united states minor outlying islands": "UM",
  "united nations": "UN",
  usa: "US",
  alaska: "US-AK",
  alabama: "US-AL",
  arkansas: "US-AR",
  arizona: "US-AZ",
  california: "US-CA",
  colorado: "US-CO",
  connecticut: "US-CT",
  delaware: "US-DE",
  florida: "US-FL",
  hawaii: "US-HI",
  iowa: "US-IA",
  idaho: "US-ID",
  illinois: "US-IL",
  indiana: "US-IN",
  kansas: "US-KS",
  kentucky: "US-KY",
  louisiana: "US-LA",
  massachusetts: "US-MA",
  maryland: "US-MD",
  maine: "US-ME",
  michigan: "US-MI",
  minnesota: "US-MN",
  missouri: "US-MO",
  mississippi: "US-MS",
  montana: "US-MT",
  "north carolina": "US-NC",
  "north dakota": "US-ND",
  nebraska: "US-NE",
  "new hampshire": "US-NH",
  "new jersey": "US-NJ",
  "new mexico": "US-NM",
  nevada: "US-NV",
  "new york": "US-NY",
  ohio: "US-OH",
  oklahoma: "US-OK",
  oregon: "US-OR",
  pennsylvania: "US-PA",
  "rhode island": "US-RI",
  "south carolina": "US-SC",
  "south dakota": "US-SD",
  tennessee: "US-TN",
  texas: "US-TX",
  utah: "US-UT",
  virginia: "US-VA",
  vermont: "US-VT",
  washington: "US-WA",
  wisconsin: "US-WI",
  "west virginia": "US-WV",
  wyoming: "US-WY",
  uruguay: "UY",
  uzbekistan: "UZ",
  "vatican city (holy see)": "VA",
  "saint vincent and the grenadines": "VC",
  venezuela: "VE",
  "british virgin islands": "VG",
  "united states virgin islands": "VI",
  vietnam: "VN",
  vanuatu: "VU",
  "wallis and futuna": "WF",
  samoa: "WS",
  kosovo: "XK",
  yemen: "YE",
  mayotte: "YT",
  "south africa": "ZA",
  zambia: "ZM",
  zimbabwe: "ZW",
};

export const getCountryISO2 = (
  countryName: string,
  forName: boolean = false
): string | null => {
  const normalizedCountryName = countryName.toLowerCase();

  const isoCode = countryCodes[normalizedCountryName]?.toLocaleLowerCase();

  if (forName && isoCode?.startsWith("gb"))
    return isoCode.split("-").at(1)?.toUpperCase() || null;

  return isoCode || null;
};
