import * as variables from "./variables.js";

export async function validateAndSubmitForm() {
    const name = variables.botNameInput.value.trim();
    const api = variables.botApiInput.value.trim();

    variables.botNameInput.classList.toggle("error", name.length < 5);
    variables.botApiInput.classList.toggle("error", api.length < 5);

    if (name.length < 5 || api.length < 5) return;

    try {
        await fetch(`${variables.BASE_URL}/bot/submit_bot_name`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, name, api })
        });
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }
}

export async function fetchBotList(userId) {
    if (!userId) return;

    try {
        const response = await fetch(`${variables.BASE_URL}/bot/get_bot_list`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId })
        });
        const data = await response.json();
        updateBotList(data);
    } catch (error) {
        console.error('Ошибка при загрузке списка ботов:', error);
        variables.noBotsMessage.style.display = "block";
        variables.botListItems.style.display = "none";
    }
}

function updateBotList(data) {
    if (data.bots?.length) {
        variables.botListItems.innerHTML = data.bots.map(bot => `<button class="bot-button">${bot.name}</button>`).join('');
        variables.botListItems.style.display = "block";
        variables.noBotsMessage.style.display = "none";
    } else {
        variables.botListItems.style.display = "none";
        variables.noBotsMessage.style.display = "block";
    }
}
