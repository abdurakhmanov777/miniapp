import * as variables from "./variables.js";

// Восстановление состояния из sessionStorage
export function restorePageState() {
    if (sessionStorage.getItem("formShown") === "true") {
        variables.mainSection.style.display = "none";
        variables.botList.style.display = "none";
        variables.botForm.style.display = "block";
        variables.botNameInput.value = sessionStorage.getItem("botName") || "";
        variables.botApiInput.value = sessionStorage.getItem("botApi") || "";
    } else if (sessionStorage.getItem("botListShown") === "true") {
        variables.mainSection.style.display = "none";
        variables.botForm.style.display = "none";
        variables.botList.style.display = "block";
        fetchBotList(userId);
    }
}

// Обновление состояния страницы
export function updatePageState() {
    const formShown = sessionStorage.getItem("formShown") === "true";
    const botListShown = sessionStorage.getItem("botListShown") === "true";

    if (formShown) {
        variables.mainSection.style.display = "none";
        variables.botList.style.display = "none";
        variables.botForm.style.display = "block";
    } else if (botListShown) {
        variables.mainSection.style.display = "none";
        variables.botForm.style.display = "none";
        variables.botList.style.display = "block";
    } else {
        variables.mainSection.style.display = "block";
        variables.botForm.style.display = "none";
        variables.botList.style.display = "none";
    }
}

    // sessionStorage.setItem("formShown", "true");
    // sessionStorage.removeItem("botListShown");


// Восстановление страницы при загрузке
document.addEventListener("DOMContentLoaded", () => {
    const savedPage = sessionStorage.getItem("activePage") || "main";
    setActivePage(savedPage);
    const pages = {
        main: variables.mainBtn,
        botList: variables.mainBtn,
        botForm: variables.mainBtn,
        settings: variables.settingsBtn,
        subscriptions: variables.subscriptionsBtn,
    };

    Object.values(pages).forEach(page => page?.classList.remove("active"));
    pages[savedPage]?.classList.add("active");
});
