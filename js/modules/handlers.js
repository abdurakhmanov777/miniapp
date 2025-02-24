// events.js

import { toggleLanguage } from "./localization.js";
import { validateAndSubmitForm } from "./api.js";
import * as pages from "./pages.js";
import * as variables from "./variables.js";

// Отображение ID пользователя
userIdDisplay.textContent = `ID: ${variables.userId}`;

const copyUserIdToClipboard = () => {
    navigator.clipboard.writeText(variables.userId);
};

function clearError(event) {
    event.target.classList.remove("error");
}

export const handlers = () => {
    document.addEventListener("DOMContentLoaded", () => {
        // Навигация
        Telegram.WebApp.BackButton.onClick(() => {
            pages.main_page_active();  // Первая функция
            updateActiveBtn(variables.mainBtn);  // Вторая функция
        });
        variables.mainBtn.addEventListener("click", pages.main_page_active);
        variables.subscriptionsBtn.addEventListener("click", pages.subscriptions_page_active);
        variables.settingsBtn.addEventListener("click", pages.settings_page_active);
        variables.nextButton.addEventListener("click", validateAndSubmitForm);
        variables.createButton.addEventListener("click", pages.botForm_page_active);
        variables.myBotsButton.addEventListener("click", pages.botList_page_active);
        variables.backButton.addEventListener("click", pages.main_page_active);
        variables.backToMainButton.addEventListener("click", pages.main_page_active);

        // Локализация
        variables.languageToggleButton.addEventListener('click', toggleLanguage);

        // Копирование ID
        variables.userIdDisplay.addEventListener("click", copyUserIdToClipboard);

        botNameInput.addEventListener("focus", clearError);
        botApiInput.addEventListener("focus", clearError);
    });
};
