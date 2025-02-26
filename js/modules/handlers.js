import { toggleLanguage } from "./localization.js";
import { validateAndSubmitForm } from "./api.js";
import * as pages from "./pages.js";
import * as variables from "./variables.js";
import { currentLanguage } from "./localization.js";

userIdDisplay.textContent = `ID: ${variables.userId}`;

function copyUserIdToClipboard() {
    const localizationData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));
    const message = localizationData?.copyUserIdSuccess;

    navigator.clipboard.writeText(variables.userId)
        .then(() => Telegram.WebApp.showAlert(message));
}

const clearError = (event) => event.target.classList.remove("error");

export const handlers = () => {
    document.addEventListener("DOMContentLoaded", () => {
        // Обработчики кнопок навигации
        Telegram.WebApp.BackButton.onClick(() => {
            const currentPage = pages.isPageActive();
            switch (currentPage) {
                case "language":
                    pages.settings_page_active();
                    break;
                default:
                    pages.main_page_active();
                    break;
            }
        });

        // Telegram.WebApp.BackButton.onClick(pages.main_page_active);
        variables.mainBtn.addEventListener("click", pages.main_page_active);
        variables.subscriptionsBtn.addEventListener("click", pages.subscriptions_page_active);
        variables.settingsBtn.addEventListener("click", pages.settings_page_active);
        variables.nextButton.addEventListener("click", validateAndSubmitForm);
        variables.createButton.addEventListener("click", pages.botForm_page_active);
        variables.myBotsButton.addEventListener("click", pages.botList_page_active);
        variables.backButton.addEventListener("click", pages.main_page_active);
        variables.backToMainButton.addEventListener("click", pages.main_page_active);
        variables.languageToggleButton.addEventListener('click', pages.language_page_active);

        // Обработчик смены языка
        variables.languageButton.addEventListener('click', toggleLanguage);

        // Копирование ID пользователя
        variables.userIdDisplay.addEventListener("click", copyUserIdToClipboard);

        // Очистка ошибок ввода
        variables.botNameInput.addEventListener("focus", clearError);
        variables.botApiInput.addEventListener("focus", clearError);
    });
};
