import { sidebar, menuBtn, mainBtn, settingsBtn, subscriptionsBtn } from "./variables.js";

export const initMenu = () => {
    initSidebar();
    initMenuButton();
    initSwipeGesture();
};

export const sidebar_passive = () => sidebar?.classList.remove("active");
export const sidebar_active = () => sidebar?.classList.toggle("active");

export const initMenuButton = () => {
    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener("click", sidebar_active);
    document.addEventListener("click", ({ target }) => {
        if (!sidebar.contains(target) && !menuBtn.contains(target)) sidebar_passive();
    });
};

export const initSwipeGesture = () => {
    if (!sidebar) return;
    let touchStartX = 0;

    sidebar.addEventListener("touchstart", (e) => touchStartX = e.touches[0].clientX);
    sidebar.addEventListener("touchend", (e) => {
        if (touchStartX - e.changedTouches[0].clientX > 100) sidebar_passive();
    });
};

export const initSidebar = () => {
    const buttons = document.querySelectorAll("#sidebar button");
    const setActive = (button) => buttons.forEach(btn => btn.classList.toggle("active", btn === button));

    buttons.forEach(button => button.addEventListener("click", () => setActive(button)));

    const activeButton = [...buttons].find(button => button.querySelector("a")?.getAttribute("href") === window.location.hash);
    if (activeButton) setActive(activeButton);
};

export function updateActiveBtn(activePage) {
    [mainBtn, settingsBtn, subscriptionsBtn].forEach(page => page?.classList.remove("active"));
    activePage?.classList.add("active");
};
