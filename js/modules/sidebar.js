import { sidebar, menuBtn } from "./variables.js";
// import { initializeActivePage } from './modules/storage.js';


export const initializeMenu = () => {
    document.addEventListener("DOMContentLoaded", () => {
        initializeSidebar();
        initializeMenuButton();
        initializeSwipeGesture();
    });
}


export function sidebar_passive() {
    sidebar?.classList.remove("active") || console.warn("Sidebar not found");
}

export function sidebar_active() {
    sidebar?.classList.toggle("active") || console.warn("Sidebar not found");
}

export function initializeMenuButton() {
    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener("click", sidebar_active);

    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
            sidebar_passive();
        }
    });
}

export function initializeSwipeGesture() {
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
}

export function initializeSidebar() {
    const buttons = document.querySelectorAll("#sidebar button");

    function setActive(button) {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            setActive(button);
        });
    });

    // Подсветка активной кнопки при загрузке страницы
    const currentPath = window.location.hash;
    if (currentPath) {
        const activeButton = Array.from(buttons).find(button =>
            button.querySelector("a")?.getAttribute("href") === currentPath
        );
        if (activeButton) setActive(activeButton);
    }
}
