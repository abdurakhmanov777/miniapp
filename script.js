let tg = window.Telegram.WebApp;
let create = document.getElementById("create");
let order = document.getElementById("order");
let back = document.getElementById("back");
let userNameDisplay = document.getElementById("bot_name_display");
let errorElement = document.getElementById("error");
const startButton = document.querySelector('.start-button');
const form = document.querySelector('form');

startButton.addEventListener('click', () => {
    // Применяем классы для анимации
    startButton.classList.add('hide');
    form.classList.add('show');
});


// Получаем Telegram ID пользователя
let userId = tg.initDataUnsafe?.user?.id || "Гость"; // Используем "Неизвестно", если ID не доступен

// Отображаем Telegram ID на странице в правом верхнем углу
userNameDisplay.innerText = `ID: ${userId}`;

tg.expand();

// Проверка состояния страницы
if (sessionStorage.getItem("formShown") === "true") {
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";
}

// Показ формы при клике на кнопку "Начать"
create.addEventListener("click", () => {
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";
    sessionStorage.setItem("formShown", "true");

    // Очистить ошибки при переходе к форме
    errorElement.innerText = "";
});

// Кнопка "Назад"
back.addEventListener("click", () => {
    document.getElementById("form").style.display = "none";
    document.getElementById("main").style.display = "block";
    sessionStorage.removeItem("formShown");

    // Очистить ошибки при возвращении на главную страницу
    errorElement.innerText = "";
});

// Отправка данных
order.addEventListener("click", () => {
    const name = document.getElementById("bot_name").value.trim();
    const api = document.getElementById("bot_api").value.trim();

    errorElement.innerText = "";

    if (name.length < 5) {
        errorElement.innerText = "Ошибка в имени";
        return;
    }
    if (api.length < 5) {
        errorElement.innerText = "Ошибка в номере телефона";
        return;
    }

    fetch("http://127.0.0.1:8000/bot/submit_bot_name", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
            user_id: tg.initDataUnsafe.user.id,
            name: name,
            api: api
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Ответ сервера:", data);
        // Telegram.WebApp.close();
    })
    .catch(error => console.error("Ошибка:", error));
});

// Очистка ошибок при изменении значений в полях формы
document.getElementById("bot_name").addEventListener("input", () => {
    errorElement.innerText = "";
});

document.getElementById("bot_api").addEventListener("input", () => {
    errorElement.innerText = "";
});
