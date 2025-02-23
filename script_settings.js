document.addEventListener("DOMContentLoaded", () => {
    // Проверяем, что WebApp готов и кнопка "Назад" доступна
    if (Telegram.WebApp && Telegram.WebApp.BackButton) {
        Telegram.WebApp.BackButton.onClick(() => {
            // Загружаем контент для страницы index.html
            fetch('index.html')
                .then(response => response.text()) // Загружаем страницу
                .then(data => {
                    // Заменяем содержимое страницы без перезагрузки
                    document.body.innerHTML = data;

                    // Обновляем URL в браузере
                    history.pushState({}, '', 'index.html');
                })
                .catch(err => {
                    console.error('Ошибка загрузки страницы:', err);
                });

            // Прячем кнопку "Назад" после обработки
            Telegram.WebApp.BackButton.hide();
        });
    } else {
        console.error('Ошибка: Telegram.WebApp или кнопка BackButton не доступны');
    }
});
