import * as variables from "./variables.js";
import { sidebar_passive, updateActiveBtn } from "./sidebar.js";

const pages = {
    main: variables.mainSection,
    botList: variables.botList,
    botForm: variables.botForm,
    settings: variables.settingsSection,
    language: variables.languageSection,
    theme: variables.themeSection,
    subscriptions: variables.subscriptionsSection
};

export function setActivePage(activePage) {
    Telegram.WebApp.BackButton[activePage === 'main' ? 'hide' : 'show']();

    const isHiddenPage = ['botForm', 'botList', 'language', 'theme'].includes(activePage);
    const displayValue = isHiddenPage ? "none" : "flex";

    if (variables.topPanel.style.display !== displayValue) {
        variables.topPanel.style.display = displayValue;
    }

    let updated = false;

    Object.entries(pages).forEach(([key, section]) => {
        const isActive = key === activePage;
        const sectionDisplay = isActive ? "flex" : "none";

        if (section.style.display !== sectionDisplay) {
            section.style.display = sectionDisplay;
            updated = true;
        }

        variables[key]?.classList.toggle("active", isActive);
    });

    if (updated) {
        sessionStorage.setItem("activePage", activePage);
    }

    sidebar_passive();
    updateActiveButton(activePage);

    if (activePage !== 'botForm' &&
        (variables.botNameInput.classList.contains("error") ||
         variables.botApiInput.classList.contains("error"))) {
        variables.botNameInput.classList.remove("error");
        variables.botApiInput.classList.remove("error");
    }
}


export const main_page_active = () => setActivePage("main");
export const botList_page_active = () => setActivePage("botList");
export const botForm_page_active = () => setActivePage("botForm");
export const settings_page_active = () => setActivePage("settings");
export const language_page_active = () => setActivePage("language");
export const theme_page_active = () => setActivePage("theme");
export const subscriptions_page_active = () => setActivePage("subscriptions");

// Восстановление страницы при загрузке
export function pageLoading() {
    const savedPage = sessionStorage.getItem("activePage") || "main";
    setActivePage(savedPage);
    updateActiveButton(savedPage);
    updateThemeSelection('system');
}

function updateActiveButton(page) {
    const pages = {
        main: variables.mainBtn,
        botList: variables.mainBtn,
        botForm: variables.mainBtn,
        settings: variables.settingsBtn,
        language: variables.settingsBtn,
        theme: variables.settingsBtn,
        subscriptions: variables.subscriptionsBtn,
    };
    updateActiveBtn(pages[page]);
}

export function isPageActive() {
    return sessionStorage.getItem("activePage") || "main";
}

export async function updateThemeSelection(theme) {
    const radioButtons = document.querySelectorAll('input[name="theme"]');
    radioButtons.forEach(radio => {
        const label = radio.closest('.settings-option');
        const checkmark = label.querySelector('.checkmark');
        checkmark.style.display = 'none'; // скрыть checkmark
    });

    const selectedRadio = document.querySelector(`input[name="theme"][value="${theme}"]`);
    if (selectedRadio) {
        const selectedLabel = selectedRadio.closest('.settings-option');
        const checkmark = selectedLabel.querySelector('.checkmark');
        checkmark.style.display = 'inline';
    }
}
