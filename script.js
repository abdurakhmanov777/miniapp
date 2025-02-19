let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy");
let order = document.getElementById("order");

tg.expand();

buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none";
    document.getElementById("form").style.display = "block";
});

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

    fetch("http://127.0.0.1:8000/bot/submit_bot_name", { // Замени на реальный URL бэкенда
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
