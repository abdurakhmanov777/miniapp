let tg = window.Telegram.WebApp;
let currentLanguage = 'ru';  // Начальный язык

// Проверка запуска в Telegram
if (!tg.initDataUnsafe?.user?.id) {
    document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
}

tg.expand();
tg.disableVerticalSwipes()

// Элементы DOM
const BASE_URL = "https://4g7zqplm-8000.euw.devtunnels.ms";
// const BASE_URL = "http://80.87.201.50:40817";
// const BASE_URL = "http://127.0.0.1:8000";
const createButton = document.getElementById("createBotButton");
const myBotsButton = document.getElementById("myBotsButton");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");
const main_page = document.getElementById("main-page")
const subscriptions = document.getElementById("subscriptions");
const settings = document.getElementById("settings");
const backToMainButton = document.getElementById("backToMainButton");
const userIdDisplay = document.getElementById("userIdDisplay");
const botForm = document.getElementById("botForm");
const botList = document.getElementById("botList");
const mainSection = document.getElementById("main");
const systemLanguageText = document.getElementById("systemLanguageText");
const botListItems = document.getElementById("botListItems");
const botNameInput = document.getElementById("botNameInput");
const botApiInput = document.getElementById("botApiInput");

// Получение ID пользователя
const userId = tg.initDataUnsafe?.user?.id || "unknown";
userIdDisplay.textContent = `ID: ${userId}`;

function handleBackOrMainClick() {
    Telegram.WebApp.BackButton.hide();
    document.getElementById("settingsPage").style.display = "none";
    mainSection.style.display = "block";
    sidebar.classList.remove("active");
    botList.style.display = "none";
    botForm.style.display = "none";
    settings.classList.remove("active");
    main_page.classList.toggle("active");
}

Telegram.WebApp.BackButton.onClick(handleBackOrMainClick);
main_page.addEventListener("click", handleBackOrMainClick);

settings.addEventListener("click", function() {
    // Показываем кнопку возврата
    Telegram.WebApp.BackButton.show();

    // Скрываем основной контент и показываем настройки
    mainSection.style.display = "none";
    botList.style.display = "none";
    botForm.style.display = "none";
    sidebar.classList.remove("active");
    // sidebar.style.left= "-330px";
    document.getElementById("settingsPage").style.display = "block";
    main_page.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
    initializeSidebar();
    initializeMenuButton();
    initializeSwipeGesture();
    highlightActivePage();
});

/**
 * Инициализация бокового меню и обработка кликов по кнопкам
 */
function initializeSidebar() {
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

    // Подсвечиваем главную кнопку по умолчанию
    const mainPageButton = document.getElementById("main-page");
    if (mainPageButton) {
        mainPageButton.classList.add("active");
    }
}

/**
 * Инициализация кнопки меню (открытие/закрытие бокового меню)
 */
function initializeMenuButton() {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    // Закрытие бокового меню при клике вне его области
    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });
}

/**
 * Добавляет обработку свайпа для закрытия бокового меню
 */
function initializeSwipeGesture() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    let touchStartX = 0;
    let touchEndX = 0;

    sidebar.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
    });

    sidebar.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].clientX;

        // Закрытие меню при свайпе влево
        if (touchStartX - touchEndX > 100) {
            sidebar.classList.remove("active");
        }
    });
}

/**
 * Подсвечивает активную страницу в боковом меню
 */
function highlightActivePage() {
    const mainPageButton = document.getElementById("main-page");
    if (mainPageButton) {
        mainPageButton.classList.add("active");
    }
}




async function loadLocalization(language) {
    const content = document.getElementById('content');
    const cachedData = sessionStorage.getItem(`lang_${language}`);

    if (cachedData) {
        updateLocalization(JSON.parse(cachedData));
        content.style.display = 'block';
    } else {
        try {
            const response = await fetch(`lang/${language}.json`);
            const data = await response.json();
            sessionStorage.setItem(`lang_${language}`, JSON.stringify(data)); // Кэшируем
            updateLocalization(data);
            content.style.display = 'block';
        } catch (error) {
            console.error('Ошибка при загрузке локализации:', error);
        }
    }
}


// Обновление текста с локализацией
function updateLocalization(data) {
    document.querySelector("h1").textContent = data.constructor;
    createButton.textContent = data.createBot;
    myBotsButton.textContent = data.myBots;
    backToMainButton.textContent = data.back;
    systemLanguageText.textContent = data.systemLanguageText
    nextButton.textContent = data.next;
    botNameInput.placeholder = data.botNamePlaceholder;
    botApiInput.placeholder = data.botApiPlaceholder;
    backButton.textContent = data.back;
    noBotsMessage.textContent = data.noBots;
    main_page.textContent = data.main_page
    subscriptions.textContent = data.subscriptions;
    settings.textContent = data.settings;
    document.getElementById('languageToggleButton').textContent = currentLanguage === 'en' ? 'RU' : 'EN';
}

// Переключение языка
document.getElementById('languageToggleButton').addEventListener('click', toggleLanguage);

async function toggleLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    await loadLocalization(currentLanguage);
}
loadLocalization(currentLanguage);

// Валидация и отправка данных формы
async function validateAndSubmitForm() {
    const name = botNameInput.value.trim();
    const api = botApiInput.value.trim();

    // Сбрасываем ошибки
    botNameInput.classList.remove("error");
    botApiInput.classList.remove("error");

    let hasError = false;

    if (name.length < 5) {
        botNameInput.classList.add("error");
        hasError = true;
    }

    if (api.length < 5) {
        botApiInput.classList.add("error");
        hasError = true;
    }

    if (hasError) return;

    try {
        await fetch(`${BASE_URL}/bot/submit_bot_name`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, name, api })
        });
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }
}

// Функция загрузки списка ботов
async function fetchBotList(userId) {
    if (!userId) return;

    try {
        const response = await fetch(`${BASE_URL}/bot/get_bot_list`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId })
        });
        const data = await response.json();
        updateBotList(data);
    } catch (error) {
        console.error('Ошибка при загрузке списка ботов:', error);
        showNoBotsMessage();
    }
}

function updateBotList(data) {
    botListItems.innerHTML = "";
    const noBotsMessage = document.getElementById("noBotsMessage");

    if (data.bots && data.bots.length > 0) {
        const fragment = document.createDocumentFragment();
        data.bots.forEach(bot => {
            const listItem = document.createElement("button");
            listItem.textContent = bot.name;
            listItem.classList.add("bot-button");
            fragment.appendChild(listItem);
        });
        botListItems.appendChild(fragment);
        botListItems.style.display = "block";
        noBotsMessage.style.display = "none";  // Скрываем сообщение
    } else {
        botListItems.style.display = "none";   // Скрываем список
        noBotsMessage.style.display = "block"; // Показываем сообщение
    }
}

function showNoBotsMessage() {
    document.getElementById("noBotsMessage").style.display = "block";
    botListItems.style.display = "none";
}

// Восстановление состояния из sessionStorage
function restorePageState() {
    if (sessionStorage.getItem("formShown") === "true") {
        mainSection.style.display = "none";
        botList.style.display = "none";
        botForm.style.display = "block";
        botNameInput.value = sessionStorage.getItem("botName") || "";
        botApiInput.value = sessionStorage.getItem("botApi") || "";
    } else if (sessionStorage.getItem("botListShown") === "true") {
        mainSection.style.display = "none";
        botForm.style.display = "none";
        botList.style.display = "block";
        fetchBotList(userId);
    }
}

// Обновление состояния страницы
function updatePageState() {
    const formShown = sessionStorage.getItem("formShown") === "true";
    const botListShown = sessionStorage.getItem("botListShown") === "true";

    if (formShown) {
        mainSection.style.display = "none";
        botList.style.display = "none";
        botForm.style.display = "block";
    } else if (botListShown) {
        mainSection.style.display = "none";
        botForm.style.display = "none";
        botList.style.display = "block";
    } else {
        mainSection.style.display = "block";
        botForm.style.display = "none";
        botList.style.display = "none";
    }
}

// Очистка ошибок
function clearError(event) {
    event.target.classList.remove("error");
}

// Обработчик клика для userIdDisplay
function copyUserIdToClipboard() {
    navigator.clipboard.writeText(userId);
}

// Обработчики событий
createButton.addEventListener("click", () => {
    mainSection.style.display = "none";
    botForm.style.display = "block";
    botList.style.display = "none";
    sessionStorage.setItem("formShown", "true");
    sessionStorage.removeItem("botListShown");
});

myBotsButton.addEventListener("click", () => {
    mainSection.style.display = "none";
    botForm.style.display = "none";
    botList.style.display = "block";
    sessionStorage.setItem("botListShown", "true");
    sessionStorage.removeItem("formShown");
    fetchBotList(userId);
});

backButton.addEventListener("click", () => {
    botForm.style.display = "none";
    mainSection.style.display = "block";
    botList.style.display = "none";
    sessionStorage.removeItem("formShown");
    sessionStorage.removeItem("botListShown");
});

backToMainButton.addEventListener("click", () => {
    botList.style.display = "none";
    mainSection.style.display = "block";
    botForm.style.display = "none";
    sessionStorage.removeItem("formShown");
    sessionStorage.removeItem("botListShown");
});

nextButton.addEventListener("click", validateAndSubmitForm);

// Очистка ошибок при взаимодействии с полями
["focus"].forEach(event => {
    botNameInput.addEventListener(event, clearError);
    botApiInput.addEventListener(event, clearError);
});

// Обработчик клика для отображения ID пользователя
userIdDisplay.addEventListener("click", copyUserIdToClipboard);

// Вызов функций для начальной загрузки страницы
restorePageState();
updatePageState();
