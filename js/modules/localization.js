import * as variables from "./variables.js";

export let currentLanguage = getLanguageFromStorage() || 'ru';

export function getLanguageFromStorage() {
    return sessionStorage.getItem('language');
}

function setLanguageToStorage(language) {
    sessionStorage.setItem('language', language);
}

export function updateLocalization(data) {
    document.querySelector("h1").textContent = data.constructor;
    variables.createButton.textContent = data.createBot;
    variables.myBotsButton.textContent = data.myBots;
    variables.backToMainButton.textContent = data.back;
    variables.nextButton.textContent = data.next;
    variables.botNameInput.placeholder = data.botNamePlaceholder;
    variables.botApiInput.placeholder = data.botApiPlaceholder;
    variables.backButton.textContent = data.back;
    variables.noBotsMessage.textContent = data.noBots;
    variables.mainBtn.textContent = data.mainBtn;
    variables.subscriptionsBtn.textContent = data.subscriptionsBtn;
    variables.settingsBtn.textContent = data.settingsBtn;
    variables.languageToggleButton.textContent = data.language;
}

export async function loadLocalization(language) {
    const content = document.getElementById('content');
    const cacheKey = `lang_${language}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    try {
        const data = cachedData ? JSON.parse(cachedData) : await fetchLocalization(language);
        sessionStorage.setItem(cacheKey, JSON.stringify(data)); // Кэшируем
        updateLocalization(data);
        content.style.display = 'block';
    } catch (error) {
        console.error('Ошибка загрузки локализации:', error);
    }
}

async function fetchLocalization(language) {
    const response = await fetch(`./lang/${language}.json`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    return response.json();
}

export async function toggleLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    setLanguageToStorage(currentLanguage);  // Сохраняем выбранный язык
    await loadLocalization(currentLanguage);
}

export async function getLocalizedVariable(key) {
    const localizationData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));
    return localizationData[key] || key;
}

loadLocalization(currentLanguage);
