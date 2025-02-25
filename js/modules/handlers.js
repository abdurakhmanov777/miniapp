import { toggleLanguage } from "./localization.js";
import { validateAndSubmitForm } from "./api.js";
import * as pages from "./pages.js";
import * as variables from "./variables.js";

userIdDisplay.textContent = `ID: ${variables.userId}`;

const copyUserIdToClipboard = () =>
    navigator.clipboard.writeText(variables.userId)
        .then(() => Telegram.WebApp.showAlert("Ваш ID скопирован"));

const clearError = (event) => event.target.classList.remove("error");

export const handlers = () => {
    document.addEventListener("DOMContentLoaded", () => {
        // Обработчики кнопок навигации
        Telegram.WebApp.BackButton.onClick(pages.main_page_active);
        variables.mainBtn.addEventListener("click", pages.main_page_active);
        variables.subscriptionsBtn.addEventListener("click", pages.subscriptions_page_active);
        variables.settingsBtn.addEventListener("click", pages.settings_page_active);
        variables.nextButton.addEventListener("click", validateAndSubmitForm);
        variables.createButton.addEventListener("click", pages.botForm_page_active);
        variables.myBotsButton.addEventListener("click", pages.botList_page_active);
        variables.backButton.addEventListener("click", pages.main_page_active);
        variables.backToMainButton.addEventListener("click", pages.main_page_active);

        // Обработчик смены языка
        variables.languageToggleButton.addEventListener('click', toggleLanguage);

        // Копирование ID пользователя
        variables.userIdDisplay.addEventListener("click", copyUserIdToClipboard);

        // Очистка ошибок ввода
        variables.botNameInput.addEventListener("focus", clearError);
        variables.botApiInput.addEventListener("focus", clearError);
    });
};
