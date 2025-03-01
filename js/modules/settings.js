async function updateLanguageSelection(language) {
    const radioButtons = document.querySelectorAll('input[name="language"]');
    radioButtons.forEach(radio => {
        const label = radio.closest('.settings-option');
        const checkmark = label.querySelector('.checkmark');
        checkmark.style.display = 'none'; // скрыть checkmark
    });

    const selectedRadio = document.querySelector(`input[name="language"][value="${language}"]`);
    if (selectedRadio) {
        const selectedLabel = selectedRadio.closest('.settings-option');
        const checkmark = selectedLabel.querySelector('.checkmark');
        checkmark.style.display = 'inline';
    }
}

async function updateThemeSelection(theme) {
    const radioButtons = document.querySelectorAll('input[name="theme"]');
    radioButtons.forEach(radio => {
        const label = radio.closest('.settings-option');
        const checkmark = label.querySelector('.checkmark');
        checkmark.style.display = 'none'; // скрыть checkmark
    });

    const selectedRadio = document.querySelector(`input[name="theme"][value="${theme}"]`);
    if (selectedRadio) {
        const selectedLabel = selectedRadio.closest('.settings-option');
        const checkmark = selectedLabel.querySelector('.checkmark');
        checkmark.style.display = 'inline';
    }
}
