import * as variables from "./variables.js";

export let currentLanguage = sessionStorage.getItem('language') || 'ru';

export async function initLocalization() {
    await loadLocalization(currentLanguage);
}

export async function loadLocalization(language) {
    const content = document.getElementById('content');
    const cacheKey = `lang_${language}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    sessionStorage.setItem('language', language);
    updateLanguageSelection(language);
    try {
        const data = cachedData ? JSON.parse(cachedData) : await fetchLocalization(language);
        sessionStorage.setItem(cacheKey, JSON.stringify(data)); // Кэшируем
        updateLocalization(data);
        content.style.display = 'block';
    } catch (error) {
        console.error('Ошибка загрузки локализации:', error);
    }
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

    variables.textSystemLanguage.textContent = data.textSystemLanguage;
    variables.textValueLanguage.textContent = data.textValueLanguage;
    variables.textTheme.textContent = data.textTheme;
    variables.textValueTheme.textContent = data.textValueTheme;
}

async function fetchLocalization(language) {
    const response = await fetch(`./lang/${language}.json`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    return response.json();
}

export async function getLocalizedVariable(key) {
    const localizationData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));
    return localizationData[key] || key;
}

async function updateLanguageSelection(language) {
    const radioButtons = document.querySelectorAll('input[name="language"]');
    radioButtons.forEach(radio => {
        const label = radio.closest('.language-option');
        const checkmark = label.querySelector('.checkmark');
        checkmark.style.display = 'none'; // скрыть checkmark
    });

    const selectedRadio = document.querySelector(`input[name="language"][value="${language}"]`);
    if (selectedRadio) {
        const selectedLabel = selectedRadio.closest('.language-option');
        const checkmark = selectedLabel.querySelector('.checkmark');
        checkmark.style.display = 'inline';
    }
}
