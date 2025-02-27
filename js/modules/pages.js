import * as variables from "./variables.js";
import { sidebar_passive, updateActiveBtn } from "./sidebar.js";
import { updateSelectionLang } from "./localization.js";

const pages = {
    main: variables.mainSection,
    botList: variables.botList,
    botForm: variables.botForm,
    settings: variables.settingsSection,
    language: variables.languageSection,
    subscriptions: variables.subscriptionsSection
};

export function setActivePage(activePage) {
    Telegram.WebApp.BackButton[activePage === 'main' ? 'hide' : 'show']();

    if (activePage !== 'botForm') {
        variables.botNameInput.classList.remove("error");
        variables.botApiInput.classList.remove("error");
    }

    Object.entries(pages).forEach(([key, section]) => {
        const isActive = key === activePage;
        section.style.display = isActive ? "flex" : "none";
        variables[key]?.classList.toggle("active", isActive);
        if (isActive) sessionStorage.setItem("activePage", key);
    });

    if (['language'].includes(activePage)) {
        variables.topPanel.style.display = "none";
    } else {
        variables.topPanel.style.display = "flex";
    }

    sidebar_passive();
    updateActiveButton(activePage)
}

export const main_page_active = () => setActivePage("main");
export const botList_page_active = () => setActivePage("botList");
export const botForm_page_active = () => setActivePage("botForm");
export const settings_page_active = () => setActivePage("settings");
export const language_page_active = () => setActivePage("language");
export const subscriptions_page_active = () => setActivePage("subscriptions");

// Восстановление страницы при загрузке

document.addEventListener("DOMContentLoaded", () => {
    const savedPage = sessionStorage.getItem("activePage") || "main";
    setActivePage(savedPage);
    updateActiveButton(savedPage);
    updateSelectionLang();
});

function updateActiveButton(page) {
    const pages = {
        main: variables.mainBtn,
        botList: variables.mainBtn,
        botForm: variables.mainBtn,
        settings: variables.settingsBtn,
        language: variables.settingsBtn,
        subscriptions: variables.subscriptionsBtn,
    };
    updateActiveBtn(pages[page]);
}

export function isPageActive() {
    const activePage = sessionStorage.getItem("activePage");
    return activePage || "main";
}
