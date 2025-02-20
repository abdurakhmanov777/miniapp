let tg = window.Telegram.WebApp;

// Проверка запуска в Telegram
if (!tg.initDataUnsafe?.user?.id) {
    document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
}

tg.expand();

// Элементы DOM
const createButton = document.getElementById("create");
const orderButton = document.getElementById("order");
const backButton = document.getElementById("back");
const userNameDisplay = document.getElementById("bot_name_display");
const errorElement = document.getElementById("error");
const startButton = document.querySelector(".start-button");
const form = document.querySelector("form");
const botList = document.getElementById("bot_list");
const botListItems = document.getElementById("bot_list_items");
const mainSection = document.getElementById("main");
const listSection = document.getElementById("bot_list");
const formSection = document.getElementById("form");
const botNameInput = document.getElementById("bot_name");
const botApiInput = document.getElementById("bot_api");

// Получение ID пользователя
const userId = tg.initDataUnsafe?.user?.id || "Гость";
userNameDisplay.innerText = `ID: ${userId}`;

// Проверка состояния формы при загрузке
if (sessionStorage.getItem("formShown") === "true") {
    mainSection.style.display = "none";
    listSection.style.display = "none";
    formSection.style.display = "block";
}

// Обработчики событий
startButton.addEventListener("click", () => {
    startButton.classList.add("hide");
    form.classList.add("show");
});

createButton.addEventListener("click", () => {
    mainSection.style.display = "none";
    formSection.style.display = "block";
    sessionStorage.setItem("formShown", "true");

    // Скрываем список ботов, когда показываем форму
    botList.style.display = "none";
    errorElement.innerText = "";
});

backButton.addEventListener("click", () => {
    formSection.style.display = "none";
    mainSection.style.display = "block";
    sessionStorage.removeItem("formShown");

    // Показываем список ботов, когда возвращаемся на основную страницу
    botList.style.display = "block";
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
        mode: "cors",
        body: JSON.stringify({ user_id: userId, name, api })
    })
    .then(response => response.json())
    .then(data => console.log("Ответ сервера:", data))
    .catch(error => console.error("Ошибка:", error));
});

// Очистка ошибок при изменении значений
[botNameInput, botApiInput].forEach(input => {
    input.addEventListener("input", () => errorElement.innerText = "");
});

// Функция загрузки списка ботов
function fetchBotList(userId) {
    fetch("http://127.0.0.1:8000/bot/get_bot_list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {
        botListItems.innerHTML = "";
        (data.bots || []).forEach(bot => {
            const listItem = document.createElement("li");
            listItem.textContent = `${bot.name} (API: ${bot.api})`;
            botListItems.appendChild(listItem);
        });
    })
    .catch(error => console.error("Ошибка при получении списка ботов:", error));
}

// Вызов загрузки списка ботов при старте
document.addEventListener("DOMContentLoaded", () => {
    fetchBotList(userId);
});
