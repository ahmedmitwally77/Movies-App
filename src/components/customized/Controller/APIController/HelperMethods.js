export function getCountryCodes(countries) {
  // Dictionary mapping country names to ISO 3166-1 Alpha-2 codes
  const countryCodes = {
    Argentina: "AR",
    Australia: "AU",
    Austria: "AT",
    Belgium: "BE",
    Brazil: "BR",
    Canada: "CA",
    China: "CN",
    "Czech Republic": "CZ",
    Denmark: "DK",
    Egypt: "EG",
    Finland: "FI",
    France: "FR",
    Germany: "DE",
    "Hong Kong": "HK",
    Hungary: "HU",
    India: "IN",
    Ireland: "IE",
    Italy: "IT",
    Japan: "JP",
    Luxembourg: "LU",
    Mexico: "MX",
    Netherlands: "NL",
    "New Zealand": "NZ",
    Norway: "NO",
    Poland: "PL",
    Romania: "RO",
    Russia: "RU",
    "South Africa": "ZA",
    "South Korea": "KR",
    Spain: "ES",
    Sweden: "SE",
    Switzerland: "CH",
    Taiwan: "TW",
    Thailand: "TH",
    "United Kingdom": "GB",
    "United States of America": "US",
  };
  // Convert the input country name to title case for matching
  const formattedCountryName = countries.trim();

  // Return the country code if found, or a default message
  return countryCodes[formattedCountryName] || "Country code not found";
}
export function getPrimaryLanguage(countryName) {
  // Dictionary mapping country names to their primary official languages and ISO codes
  const countryLanguages = {
    Argentina: { language: "Spanish", code: "es" },
    Australia: { language: "English", code: "en" },
    Austria: { language: "German", code: "de" },
    Belgium: { language: "Dutch", code: "nl" }, // Primary language
    Brazil: { language: "Portuguese", code: "pt" },
    Canada: { language: "English", code: "en" }, // Primary language
    China: { language: "Chinese", code: "zh" },
    "Czech Republic": { language: "Czech", code: "cs" },
    Denmark: { language: "Danish", code: "da" },
    Egypt: { language: "Arabic", code: "ar" },
    Finland: { language: "Finnish", code: "fi" }, // Primary language
    France: { language: "French", code: "fr" },
    Germany: { language: "German", code: "de" },
    "Hong Kong": { language: "Chinese", code: "zh" }, // Primary language
    Hungary: { language: "Hungarian", code: "hu" },
    India: { language: "Hindi", code: "hi" }, // Primary language
    Ireland: { language: "Irish", code: "ga" }, // Primary language
    Italy: { language: "Italian", code: "it" },
    Japan: { language: "Japanese", code: "ja" },
    Luxembourg: { language: "Luxembourgish", code: "lb" }, // Primary language
    Mexico: { language: "Spanish", code: "es" },
    Netherlands: { language: "Dutch", code: "nl" },
    "New Zealand": { language: "English", code: "en" }, // Primary language
    Norway: { language: "Norwegian", code: "no" },
    Poland: { language: "Polish", code: "pl" },
    Romania: { language: "Romanian", code: "ro" },
    Russia: { language: "Russian", code: "ru" },
    "South Africa": { language: "Afrikaans", code: "af" }, // Primary language
    "South Korea": { language: "Korean", code: "ko" },
    Spain: { language: "Spanish", code: "es" },
    Sweden: { language: "Swedish", code: "sv" },
    Switzerland: { language: "German", code: "de" }, // Primary language
    Taiwan: { language: "Chinese", code: "zh" },
    Thailand: { language: "Thai", code: "th" },
    "United Kingdom": { language: "English", code: "en" },
    "United States of America": { language: "English", code: "en" },
  };

  // Get the primary language for the specified country
  const language = countryLanguages[countryName];

  // Return the primary language or a default message if not found
  return language ? language.code : "Country not found";
}

export function getGenreCodes(genres) {
  const genreMap = {
    Action: 28,
    "Action & Adventure": [28, 12], // Action + Adventure
    Adventure: 12,
    Animation: 16,
    Biography: null, // Biography doesn't have a direct match in TMDb
    Comedy: 35,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Kids: 10762, // TMDb has a "Kids" genre for TV shows
    Music: 10402,
    Mystery: 9648,
    News: null, // News doesn't have a direct match in TMDb
    Reality: 10764, // TMDb has "Reality" for TV shows
    Romance: 10749,
    "Sci-Fi & Fantasy": [878, 14], // Science Fiction + Fantasy
    "Science Fiction": 878,
    Soap: 10766, // TMDb has "Soap" for TV shows
    Talk: null, // Talk doesn't have a direct match in TMDb
    Thriller: 53,
    "TV Movie": 10770,
    War: 10752,
    "War & Politics": [10752, 10768], // War + Politics
    Western: 37,
  };

  let genreCodes = [];

  genres.forEach((genre) => {
    const code = genreMap[genre];
    if (Array.isArray(code)) {
      genreCodes = [...genreCodes, ...code]; // Spread the array if the genre has multiple codes
    } else if (code !== null) {
      genreCodes.push(code);
    }
  });

  // Remove duplicates from the genre codes array
  return [...new Set(genreCodes)];
}
export function getTvGenreCodes(genres) {
  const tvGenreMap = {
    Action: 10759,
    "Action & Adventure": [10759, 12], // Action + Adventure
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    "Game Show": 10763,
    Kids: 10762,
    Mystery: 9648,
    News: 10768, // News shows
    Reality: 10764,
    Romance: 10749,
    "Sci-Fi & Fantasy": [878, 14], // Science Fiction + Fantasy
    "Science Fiction": 878,
    Soap: 10766,
    Talk: 10767, // Talk shows
    Thriller: 53,
    "War & Politics": 10768, // War + Politics
    Western: 37,
  };

  let genreCodes = [];

  genres.forEach((genre) => {
    const code = tvGenreMap[genre];
    if (Array.isArray(code)) {
      genreCodes = [...genreCodes, ...code]; // Spread the array if the genre has multiple codes
    } else if (code !== null) {
      genreCodes.push(code);
    }
  });

  // Remove duplicates from the genre codes array
  return [...new Set(genreCodes)];
}

