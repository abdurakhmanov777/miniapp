export const BASE_URL = "https://4g7zqplm-8000.euw.devtunnels.ms";
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
export const closeApp = document.getElementById("closeApp");

// UI элементы
export const noBotsMessage = document.getElementById("noBotsMessage");
export const languageToggleButton = document.getElementById("languageToggleButton");
export const languageOptions = document.querySelectorAll(".language-option");

export const textSystemLanguage = document.getElementById("textSystemLanguage");
export const textValueLanguage = document.getElementById("textValueLanguage");
export const textTheme = document.getElementById("textTheme");
export const textValueTheme = document.getElementById("textValueTheme");


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

// ID пользователя Telegram
export const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "unknown";
export const userIdValue = document.getElementById("userIdValue");
userIdValue.textContent = `${userId}`;
// export const userIdBtn = document.getElementById("userIdBtn");
