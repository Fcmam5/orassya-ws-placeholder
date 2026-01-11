// Translations object
const translations = {
  en: {
    coming_soon: "Coming Soon",
    made_in: "Made with ❤️ in Algeria",
    registered_trademark: "Orassya® is a registered trademark in Algeria",
    stay_informed: "Stay informed of our latest news",
  },
  ar: {
    coming_soon: "قريباً",
    made_in: "مصنوع بحب في الجزائر",
    registered_trademark: "أوراسيا® علامة تجارية مسجلة في الجزائر",
    stay_informed: "ابقوا على اطلاع على آخر أخبارنا",
  },
  fr: {
    coming_soon: "Bientôt disponible",
    made_in: "Fabriqué avec amour en Algérie",
    registered_trademark: "Orassya® est une marque déposée en Algérie",
    stay_informed: "Restez informés de nos dernières actualités",
  },
  de: {
    coming_soon: "Demnächst verfügbar",
    made_in: "Mit Liebe in Algerien hergestellt",
    registered_trademark: "Orassya® ist eine eingetragene Marke in Algerien",
    stay_informed: "Bleiben Sie über unsere neuesten Nachrichten informiert",
  },
  tr: {
    coming_soon: "Çok Yakında",
    made_in: "Cezayir'de sevgiyle üretilmiştir",
    registered_trademark: "Orassya®, Cezayir'de tescilli bir markadır",
    stay_informed: "En son haberlerimizden haberdar olun",
  },
};

// Get language selector element
const languageSelector = document.getElementById("language-selector");

// Function to set the language
function setLanguage(language) {
  // Update the direction of the document based on language
  document.documentElement.lang = language;
  if (language === "ar") {
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.dir = "ltr";
  }

  // Get all elements with data-translate attribute
  const elements = document.querySelectorAll("[data-translate]");

  // Update the content of each element
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });
}

// Event listener for language change
languageSelector.addEventListener("change", (e) => {
  const selectedLanguage = e.target.value;
  setLanguage(selectedLanguage);
  // Save the selected language to localStorage
  localStorage.setItem("preferredLanguage", selectedLanguage);
});

// Check for saved language preference or use browser language
function initializeLanguage() {
  const savedLanguage = localStorage.getItem("preferredLanguage");
  const browserLanguage = navigator.language.split("-")[0];
  const searchParams = window.location.search;

  // pick language from query parameters
  if (searchParams) {
    const urlParams = new URLSearchParams(searchParams);
    const lang = urlParams.get("lang");
    if (lang && translations[lang]) {
      setLanguage(lang);
      return;
    }
  }

  // Check if the saved language is supported
  if (savedLanguage && translations[savedLanguage]) {
    languageSelector.value = savedLanguage;
    setLanguage(savedLanguage);
    return;
  }
  // Check if browser language is supported
  else if (translations[browserLanguage]) {
    languageSelector.value = browserLanguage;
    setLanguage(browserLanguage);
    return;
  }
  // Default to English
  else {
    languageSelector.value = "en";
    setLanguage("en");
  }
}

// Initialize the page with the correct language
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");
  initializeLanguage();

  // Debug: Log available languages
  console.log("Available languages:", Object.keys(translations));

  // Debug: Log current language
  console.log("Current language:", languageSelector.value);
});
