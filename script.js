// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;

// Проверка запуска в Telegram
if (!tg.initDataUnsafe?.user?.id) {
    document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
}

tg.expand();

// Элементы DOM
const createButton = document.getElementById("create");
const myBotsButton = document.getElementById("my_bots");
const orderButton = document.getElementById("order");
const backButton = document.getElementById("back");
const backToMainButton = document.getElementById("back_to_main");
const userNameDisplay = document.getElementById("bot_name_display");
const errorElement = document.getElementById("error");
const form = document.getElementById("form");
const botList = document.getElementById("bot_list");
const mainSection = document.getElementById("main");
const botListItems = document.getElementById("bot_list_items");
const botNameInput = document.getElementById("bot_name");
const botApiInput = document.getElementById("bot_api");

// Получение ID пользователя
const userId = tg.initDataUnsafe?.user?.id || "Гость";
userNameDisplay.innerText = `ID: ${userId}`;

// Восстановление состояния из sessionStorage
if (sessionStorage.getItem("formShown") === "true") {
    mainSection.style.display = "none";
    botList.style.display = "none";
    form.style.display = "block";
    botNameInput.value = sessionStorage.getItem("botName") || "";  // Восстановление введенного имени бота
    botApiInput.value = sessionStorage.getItem("botApi") || "";    // Восстановление введенного API
} else if (sessionStorage.getItem("botListShown") === "true") {
    mainSection.style.display = "none";
    form.style.display = "none";
    botList.style.display = "block";
    fetchBotList(userId); // Загрузить список ботов после отображения списка
}

createButton.addEventListener("click", () => {
    mainSection.style.display = "none";
    form.style.display = "block";
    botList.style.display = "none";
    sessionStorage.setItem("formShown", "true");
    sessionStorage.removeItem("botListShown");
    errorElement.innerText = "";
});

myBotsButton.addEventListener("click", () => {
    mainSection.style.display = "none";
    form.style.display = "none";
    botList.style.display = "block";
    sessionStorage.setItem("botListShown", "true");
    sessionStorage.removeItem("formShown");
    errorElement.innerText = "";
    fetchBotList(userId);
});

backButton.addEventListener("click", () => {
    form.style.display = "none";
    mainSection.style.display = "block";
    botList.style.display = "none";
    sessionStorage.removeItem("formShown");
    sessionStorage.removeItem("botListShown");
    errorElement.innerText = "";
});

backToMainButton.addEventListener("click", () => {
    botList.style.display = "none";
    mainSection.style.display = "block";
    form.style.display = "none";
    sessionStorage.removeItem("formShown");
    sessionStorage.removeItem("botListShown");
    errorElement.innerText = "";
});

orderButton.addEventListener("click", () => {
    const name = botNameInput.value.trim();
    const api = botApiInput.value.trim();

    errorElement.innerText = "";
    if (name.length < 5) {
        errorElement.innerText = "Ошибка в названии";
        return;
    }
    if (api.length < 5) {
        errorElement.innerText = "Ошибка в API";
        return;
    }

    fetch("http://127.0.0.1:8000/bot/submit_bot_name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, name, api })
    })
    .then(response => response.json())
    .then(data => console.log("Ответ сервера:", data))
    .catch(error => console.error("Ошибка:", error));

    // Сохраняем введенные данные
    sessionStorage.setItem("botName", botNameInput.value);
    sessionStorage.setItem("botApi", botApiInput.value);
});

// Функция загрузки списка ботов
function fetchBotList(userId) {
    if (!userId) return;

    fetch("http://127.0.0.1:8000/bot/get_bot_list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {
        botListItems.innerHTML = "";

        if (data.bots && data.bots.length > 0) {
            data.bots.forEach(bot => {
                const listItem = document.createElement("button");
                listItem.textContent = bot.name;
                listItem.classList.add("bot-button");
                botListItems.appendChild(listItem);
            });
            botListItems.style.display = "block";
        } else {
            botListItems.innerHTML = "<p>У вас пока нет ботов.</p>";
            botListItems.style.display = "none";
        }
    })
    .catch(error => console.error("Ошибка при получении списка ботов:", error));
}

// Функция для контроля отображения состояния на странице при обновлении
function updatePageState() {
    const formShown = sessionStorage.getItem("formShown") === "true";
    const botListShown = sessionStorage.getItem("botListShown") === "true";

    if (formShown) {
        mainSection.style.display = "none";
        botList.style.display = "none";
        form.style.display = "block";
        errorElement.innerText = "";
    } else if (botListShown) {
        mainSection.style.display = "none";
        form.style.display = "none";
        botList.style.display = "block";
        errorElement.innerText = "";
    } else {
        mainSection.style.display = "block";
        form.style.display = "none";
        botList.style.display = "none";
        errorElement.innerText = "";
    }
}

// Вызов функции для правильной инициализации страницы при обновлении
updatePageState();
