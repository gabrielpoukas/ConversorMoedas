const amountInput = document.querySelector('#amount');
const currencySelect = document.querySelector('#currency-select');
const convertBtn = document.querySelector('#convert-btn');
const resultArea = document.querySelector('#result-area');
const conversionText = document.querySelector('#conversion-text');
const updateTime = document.querySelector('#update-time');
const toggleThemeBtn = document.querySelector('#toggle-theme-btn');
const body = document.querySelector('body');


async function getExchangeRates(currency) {

    const cleanCurrency = currency.trim();
    const url = `https://economia.awesomeapi.com.br/last/${cleanCurrency}-BRL`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Resposta da rede não foi ok');
        const data = await response.json();
        
        return data[`${cleanCurrency}BRL`];
    } catch (error) {
        console.error("Erro detalhado no Fetch:", error);
        return null;
    }
}

async function convertCurrency() {
    const valueBRL = parseFloat(amountInput.value);
    const targetCurrency = currencySelect.value;

    if (isNaN(valueBRL) || valueBRL <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    convertBtn.textContent = "Buscando cotação...";
    convertBtn.disabled = true;

    try {
        const rateData = await getExchangeRates(targetCurrency);

        if (rateData) {
            const rate = parseFloat(rateData.bid);
            const result = valueBRL / rate;
            displayResult(result, targetCurrency, rateData.create_date);
        } else {
            alert("Erro: Não recebemos dados da cotação. Verifique sua conexão.");
        }
    } catch (error) {
        console.error("Erro na lógica de conversão:", error);
        alert("Ocorreu um erro inesperado.");
    } finally {
       
        convertBtn.textContent = "Converter Agora";
        convertBtn.disabled = false;
    }
}

function displayResult (result, currency, date) {

const formatter = new Intl.NumberFormat('pt-BR', {

style:'currency',
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