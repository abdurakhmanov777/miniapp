// export const BASE_URL = "https://4g7zqplm-8000.euw.devtunnels.ms";
export const BASE_URL = "http://127.0.0.1:8000";
export const URL_ADMIN = "https://t.me/abdurakhmanov777";
// Навигация
export const sidebar = document.getElementById("sidebar");
export const menuBtn = document.getElementById("menuBtn");
export const mainBtn = document.getElementById("mainBtn");
export const subscriptionsBtn = document.getElementById("subscriptionsBtn");
export const settingsBtn = document.getElementById("settingsBtn");
export const backToMainButton = document.getElementById("backToMainButton");

// Кнопки управления ботами
export const createButton = document.getElementById("createBotButton");
export const myBotsButton = document.getElementById("myBotsButton");
export const nextButton = document.getElementById("nextButton");
export const backButton = document.getElementById("backButton");

// UI элементы
export const h1 = document.querySelector("h1");
export const h2 = document.querySelector("h2");
export const h3 = document.querySelector("h3");
export const noBotsMessage = document.getElementById("noBotsMessage");
export const languageToggleButton = document.getElementById("languageToggleButton");
export const themeToggleButton = document.getElementById("themeToggleButton");
export const languageOptions = document.querySelectorAll(".settings-option");
export const contact_admin = document.getElementById("contact_admin");

export const textSystemLanguage = document.getElementById("textSystemLanguage");
export const textValueLanguage = document.getElementById("textValueLanguage");
export const textTheme = document.getElementById("textTheme");
export const textValueTheme = document.getElementById("textValueTheme");

export const textThemeSystem = document.getElementById("textThemeSystem");
export const textThemeDark = document.getElementById("textThemeDark");
export const textThemeLight = document.getElementById("textThemeLight");

export const textContactAdmin = document.getElementById("textContactAdmin");
export const textContactAdminValue = document.getElementById("textContactAdminValue");

// Формы и списки
export const botForm = document.getElementById("botForm");
export const botList = document.getElementById("botList");
export const botListItems = document.getElementById("botListItems");
export const botNameInput = document.getElementById("botNameInput");
export const botApiInput = document.getElementById("botApiInput");

// Разделы приложения
export const topPanel = document.getElementById("topPanel");
export const mainSection = document.getElementById("main");
export const settingsSection = document.getElementById("settingsSection");
export const subscriptionsSection = document.getElementById("subscriptionsSection");
export const languageSection = document.getElementById("languageSection");
export const themeSection = document.getElementById("themeSection");

// ID пользователя Telegram
export const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "unknown";
export const userIdValue = document.getElementById("userIdValue");
export const userIdBtn = document.getElementById("userIdBtn");
