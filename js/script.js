import { initMenu } from "./modules/sidebar.js";
import { handlers } from "./modules/handlers.js";
import { pageLoading } from "./modules/pages.js";
import { initLocalization } from "./modules/localization.js";

const tg = window.Telegram?.WebApp;

// Проверка запуска в Telegram
if (!tg.initDataUnsafe?.user?.id) {
    document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
} else {
    tg.expand();
    tg.disableVerticalSwipes();
    // tg.lockOrientation();
    document.addEventListener("DOMContentLoaded", function () {
        initLocalization();
        pageLoading();
        handlers();
        initMenu();
    });
}
