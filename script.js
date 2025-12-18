
const amountInput = document.querySelector('#amount');
const currencySelect = document.querySelector('#currency-select');
const convertBtn = document.querySelector('#convert-btn');
const resultArea = document.querySelector('#result-area');
const conversionText = document.querySelector('#conversion-text');
const updateTime = document.querySelector('#update-time');
const toggleThemeBtn = document.querySelector('#toggle-theme-btn');
const body = document.querySelector('body');

async function getExchangeRates(currency) {
    const cleanCurrency = currency.trim().split(' ')[0];
    const url = `https://economia.awesomeapi.com.br/last/${cleanCurrency}-BRL`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Falha na conexão com a API');
        }

        const data = await response.json();
        
        return data[`${cleanCurrency}BRL`];
    } catch (error) {
        console.error("Erro ao buscar dados na API:", error);
        return null;
    }
}

async function convertCurrency() {
    const valueBRL = parseFloat(amountInput.value);
    const targetCurrency = currencySelect.value.split(' ')[0];

    if (isNaN(valueBRL) || valueBRL <= 0) {
        alert("Por favor, insira um valor válido acima de 0.");
        return;
    }

    try {
        convertBtn.textContent = "Buscando cotação...";
        convertBtn.disabled = true;

        const rateData = await getExchangeRates(targetCurrency);

        if (rateData) {
            const rate = parseFloat(rateData.bid);
            const result = valueBRL / rate;

            displayResult(result, targetCurrency, rateData.create_date);
        } else {
            alert("Atenção: Não foi possível obter os dados. Verifique sua conexão com a internet ou desative bloqueadores de anúncios (AdBlock).");
        }

    } catch (error) {
        console.error("Erro inesperado durante a conversão:", error);
        alert("Ocorreu um erro inesperado. Tente novamente.");
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
    if (e.key === 'Enter') {
        convertCurrency();
    }
});