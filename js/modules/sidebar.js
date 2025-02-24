import { sidebar, menuBtn } from "./variables.js";
import * as variables from "./variables.js";

export const initializeMenu = () => {
    document.addEventListener("DOMContentLoaded", () => {
        initializeSidebar();
        initializeMenuButton();
        initializeSwipeGesture();
    });
};

export const sidebar_passive = () => {
    if (sidebar) {
        sidebar.classList.remove("active");
    } else {
        console.warn("Sidebar not found");
    }
};

export const sidebar_active = () => {
    if (sidebar) {
        sidebar.classList.toggle("active");
    } else {
        console.warn("Sidebar not found");
    }
};

export const initializeMenuButton = () => {
    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener("click", sidebar_active);

    document.addEventListener("click", ({ target }) => {
        if (!sidebar.contains(target) && !menuBtn.contains(target)) {
            sidebar_passive();
        }
    });
};

export const initializeSwipeGesture = () => {
    if (!sidebar) return;

    let touchStartX = 0;

    sidebar.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
    });

    sidebar.addEventListener("touchend", (event) => {
        if (touchStartX - event.changedTouches[0].clientX > 100) {
            sidebar_passive();
        }
    });
};

export const initializeSidebar = () => {
    const buttons = document.querySelectorAll("#sidebar button");

    const setActive = (button) => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => setActive(button));
    });

    // Подсветка активной кнопки при загрузке страницы
    const currentPath = window.location.hash;
    if (currentPath) {
        const activeButton = [...buttons].find(button =>
            button.querySelector("a")?.getAttribute("href") === currentPath
        );
        if (activeButton) setActive(activeButton);
    }
};

export function updateActiveBtn(activePage) {
    const pages = [
        variables.mainBtn,
        // variables.botListBtn,
        // variables.botFormBtn,
        variables.settingsBtn,
        variables.subscriptionsBtn
    ];

    pages.forEach(page => page?.classList.remove("active"));

    activePage?.classList.add("active");
}
