
const amountInput = document.querySelector('#amount');
const currencySelect = document.querySelector('#currency-select');
const convertBtn = document.querySelector('#convert-btn');
const resultArea = document.querySelector('#result-area');
const conversionText = document.querySelector('#conversion-text');
const updateTime = document.querySelector('#update-time');
const toggleThemeBtn = document.querySelector('#toggle-theme-btn');
const body = document.querySelector('body');

async function convertCurrency() {
    const valueBRL = parseFloat(amountInput.value);
    const targetCurrency = currencySelect.value.split(' ')[0];

    if (isNaN(valueBRL) || valueBRL <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    convertBtn.textContent = "Buscando...";
    convertBtn.disabled = true;

    try {
        const apiUrl = `https://economia.awesomeapi.com.br/last/${targetCurrency}-BRL`;
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Falha no Proxy');
        
        const data = await response.json();
        const rateInfo = data[`${targetCurrency}BRL`];

        if (rateInfo) {
            const rate = parseFloat(rateInfo.bid);
            const result = valueBRL / rate;
            displayResult(result, targetCurrency, rateInfo.create_date);
        }

    } catch (error) {
        console.error(error);
        alert("Bloqueio persistente detectado. Dica: Tente abrir o site no navegador Google Chrome padrão ou desative temporariamente seu antivírus.");
    } finally {
        convertBtn.textContent = "Converter Agora";
        convertBtn.disabled = false;
    }
}

function displayResult(result, currency, date) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency,
    });

    conversionText.textContent = formatter.format(result);

    const formattedDate = new Date(date).toLocaleString('pt-BR');
    updateTime.textContent = `Cotação atualizada em: ${formattedDate}`;

    resultArea.classList.remove('hidden');
}

function toggleTheme() {
    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        toggleThemeBtn.textContent = "🌙 Modo Noite";
    } else {
        toggleThemeBtn.textContent = "🌞 Modo Dia";
    }
}

convertBtn.addEventListener('click', convertCurrency);
toggleThemeBtn.addEventListener('click', toggleTheme);

amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convertCurrency();
});