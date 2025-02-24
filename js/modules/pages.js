import * as variables from "./variables.js";
import { sidebar_passive } from "./sidebar.js";

const pages = {
    main: variables.mainSection,
    settings: variables.settingsSection,
    subscriptions: variables.subscriptionsSection,
    botList: variables.botList,
    botForm: variables.botForm
};

function setActivePage(activePage) {
    Telegram.WebApp.BackButton[activePage === 'main' ? 'hide' : 'show']();
    sidebar_passive();
    Object.entries(pages).forEach(([key, section]) => {
        const isActive = key === activePage;
        section.style.display = isActive ? "block" : "none";
        variables[key]?.classList.toggle("active", isActive);

        if (isActive) {
            sessionStorage.setItem("activePage", key);
        }
    });
}

export const main_page_active = () => setActivePage("main");
export const settings_page_active = () => setActivePage("settings");
export const subscriptions_page_active = () => setActivePage("subscriptions");
export const botList_page_active = () => setActivePage("botList");
export const botForm_page_active = () => setActivePage("botForm");

// Восстановление страницы при загрузке
document.addEventListener("DOMContentLoaded", () => {
    const savedPage = sessionStorage.getItem("activePage") || "main";
    setActivePage(savedPage);
});
