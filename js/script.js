import { initializeSidebar, initializeMenuButton, initializeSwipeGesture, highlightActivePage} from "./modules/sidebar.js";
import { loadLocalization } from "./modules/localization.js";
import { handlers } from './modules/handlers.js';
// import { restorePageState, updatePageState } from "./modules/storage.js";

let tg = window.Telegram.WebApp;
let currentLanguage = 'ru';
loadLocalization(currentLanguage);

// Проверка запуска в Telegram
if (!tg.initDataUnsafe?.user?.id) {
    document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
}

tg.expand();
tg.disableVerticalSwipes()
// Обработчики
handlers();


document.addEventListener("DOMContentLoaded", () => {
    initializeSidebar();
    initializeMenuButton();
    initializeSwipeGesture();
    highlightActivePage();
});

// restorePageState();
// updatePageState();
