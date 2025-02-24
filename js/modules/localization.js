import * as variables from "./variables.js";

let currentLanguage = getLanguageFromStorage() || 'ru';  // Загружаем язык из sessionStorage или по умолчанию 'ru'

function getLanguageFromStorage() {
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
    variables.systemLanguageText.textContent = data.systemLanguageText;
    variables.nextButton.textContent = data.next;
    variables.botNameInput.placeholder = data.botNamePlaceholder;
    variables.botApiInput.placeholder = data.botApiPlaceholder;
    variables.backButton.textContent = data.back;
    variables.noBotsMessage.textContent = data.noBots;
    variables.mainBtn.textContent = data.mainBtn;
    variables.subscriptionsBtn.textContent = data.subscriptionsBtn;
    variables.settingsBtn.textContent = data.settingsBtn;
    document.getElementById('languageToggleButton').textContent = currentLanguage === 'ru' ? 'RU' : 'EN';
}

export async function loadLocalization(language) {
    const content = document.getElementById('content');
    const cachedData = sessionStorage.getItem(`lang_${language}`);

    if (cachedData) {
        updateLocalization(JSON.parse(cachedData));
        content.style.display = 'block';
    } else {
        try {
            const response = await fetch(`./lang/${language}.json`);
            const data = await response.json();
            sessionStorage.setItem(`lang_${language}`, JSON.stringify(data)); // Кэшируем
            updateLocalization(data);
            content.style.display = 'block';
        } catch (error) {
            console.error('Ошибка при загрузке локализации:', error);
        }
    }
}

// Загрузка языка при инициализации страницы
loadLocalization(currentLanguage);

export async function toggleLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    setLanguageToStorage(currentLanguage);  // Сохраняем выбранный язык
    await loadLocalization(currentLanguage);
}
