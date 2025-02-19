let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy");
let order = document.getElementById("order");
let back = document.getElementById("back");

// Получаем Telegram ID пользователя
let userId = tg.initDataUnsafe?.user?.id || "Гость"; // Используем "Неизвестно", если ID не доступен
let userNameDisplay = document.getElementById("user_name_display");

// Отображаем Telegram ID на странице в правом верхнем углу
userNameDisplay.innerText = `ID: ${userId}`;

tg.expand();

// Проверка состояния страницы
if (sessionStorage.getItem("formShown") === "true") {
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";
}

// Показ формы при клике на кнопку "Начать"
buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";
    sessionStorage.setItem("formShown", "true");

    // Очистить ошибки при переходе к форме
    document.getElementById("error").innerText = "";
});

// Кнопка "Назад"
back.addEventListener("click", () => {
    document.getElementById("form").style.display = "none";
    document.getElementById("main").style.display = "block";
    sessionStorage.removeItem("formShown");

    // Очистить ошибки при возвращении на главную страницу
    document.getElementById("error").innerText = "";
});

// Отправка данных
order.addEventListener("click", () => {
    const name = document.getElementById("user_name").value.trim();
    const email = document.getElementById("user_email").value.trim();
    const phone = document.getElementById("user_phone").value.trim();
    const errorElement = document.getElementById("error");

    errorElement.innerText = "";

    if (name.length < 5) {
        errorElement.innerText = "Ошибка в имени";
        return;
    }
    if (email.length < 5) {
        errorElement.innerText = "Ошибка в email";
        return;
    }
    if (phone.length < 5) {
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
            user_id: Telegram.WebApp.initDataUnsafe.user.id,
            name: name,
            email: email,
            phone: phone
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
document.getElementById("user_name").addEventListener("input", () => {
    document.getElementById("error").innerText = "";
});

document.getElementById("user_email").addEventListener("input", () => {
    document.getElementById("error").innerText = "";
});

document.getElementById("user_phone").addEventListener("input", () => {
    document.getElementById("error").innerText = "";
});
