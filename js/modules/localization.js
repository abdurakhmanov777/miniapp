import * as variables from "./variables.js";

export let currentLanguage = sessionStorage.getItem('language') || 'ru';

export function updateSelectionLang() {
    document.querySelectorAll(".checkmark").forEach(el => el.style.display = "none");
    const selectedInput = document.querySelector(`input[name="language"][value="${currentLanguage}"]`);

    if (selectedInput) {
        const checkmark = selectedInput.closest(".language-option")?.querySelector(".checkmark");
        // Telegram.WebApp.showAlert(selectedLanguage);
        if (checkmark) checkmark.style.display = "block";
    }
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

    variables.textSystemLanguage.textContent = data.textSystemLanguage;
    variables.textValueLanguage.textContent = data.textValueLanguage;
    variables.textTheme.textContent = data.textTheme;
    variables.textValueTheme.textContent = data.textValueTheme;
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

export async function toggleLanguage(lang) {
    currentLanguage = lang;
    setLanguageToStorage(currentLanguage);  // Сохраняем выбранный язык
    await loadLocalization(currentLanguage);
    updateSelectionLang();
}

export async function getLocalizedVariable(key) {
    const localizationData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));
    return localizationData[key] || key;
}

loadLocalization(currentLanguage);
updateLanguageCheckmark();

export function updateLanguageCheckmark() {
    document.addEventListener("DOMContentLoaded", () => {
        const savedLanguage = localStorage.getItem("language") || "en"; // Заданный язык
        const radioButtons = document.querySelectorAll("input[name='language']");

        radioButtons.forEach(radio => {
            const parentLabel = radio.closest(".language-option");
            const checkmark = parentLabel.querySelector(".checkmark");

            if (radio.value === savedLanguage) {
                radio.checked = true;
                checkmark.style.visibility = "visible";
            } else {
                checkmark.style.visibility = "hidden";
            }

            radio.addEventListener("change", () => {
                localStorage.setItem("language", radio.value);
                updateCheckmarks();
            });
        });

        function updateCheckmarks() {
            radioButtons.forEach(radio => {
                const parentLabel = radio.closest(".language-option");
                const checkmark = parentLabel.querySelector(".checkmark");
                checkmark.style.visibility = radio.checked ? "visible" : "hidden";
            });
        }
    });
}
