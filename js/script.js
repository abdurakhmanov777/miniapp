import { initializeMenu } from "./modules/sidebar.js";
import { handlers } from "./modules/handlers.js";

const tg = window.Telegram?.WebApp;

// Проверка запуска в Telegram
if (!tg.initDataUnsafe?.user?.id) {
    document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
} else {
    tg.expand();
    tg.disableVerticalSwipes();
    document.addEventListener("DOMContentLoaded", handlers);
    // tg.lockOrientation();

    // Инициализация модулей
    initializeMenu();
    // handlers();
}
