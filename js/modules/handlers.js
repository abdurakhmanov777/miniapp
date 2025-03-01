import { loadLocalization } from "./localization.js";
import { validateAndSubmitForm } from "./api.js";
import * as pages from "./pages.js";
import * as variables from "./variables.js";

variables.userIdValue.textContent = `${variables.userId}`;

function copyUserIdToClipboard() {
    const currentLanguage = sessionStorage.getItem('language')
    const localizationData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));
    const message = localizationData?.copyUserIdSuccess;

    navigator.clipboard.writeText(variables.userId)
        .then(() => Telegram.WebApp.showAlert(message));
}

const clearError = (event) => event.target.classList.remove("error");

export const handlers = () => {
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
        variables.languageOptions.forEach(option =>
            option.addEventListener("change", e => loadLocalization(e.target.value))
        );

        // Копирование ID пользователя
        variables.userIdBtn.addEventListener("click", copyUserIdToClipboard);

        // Переход к контактам
        variables.contact_admin.addEventListener('click', function() {
            Telegram.WebApp.openTelegramLink("https://t.me/abdurakhmanov777");
        });

        // Очистка ошибок ввода
        variables.botNameInput.addEventListener("focus", clearError);
        variables.botApiInput.addEventListener("focus", clearError);
};
