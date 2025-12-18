💱 Conversor de Moedas (Real-Time API)

Uma aplicação moderna e responsiva de conversão de moedas que consome dados em tempo real. O projeto destaca o uso de tecnologias assíncronas e uma interface de usuário refinada com sistema de temas dinâmico.
🚀 Funcionalidades Principais

    Cotações em Tempo Real: Integração com a AwesomeAPI para obter valores atualizados de Dólar (USD), Euro (EUR) e Bitcoin (BTC).

    Modo Dia/Noite Personalizado: Sistema de troca de temas com ajuste automático de contraste (Modo Dia com card azul vibrante e Modo Noite com efeito Glassmorphism).

    Bypass de Restrição de Rede (Proxy): Implementação de um proxy intermediário (corsproxy.io) para garantir o funcionamento da aplicação mesmo em redes ou navegadores com restrições de CORS.

    Interface Premium: Design padronizado com campos de entrada simétricos, remoção de spinners nativos e animações suaves de carregamento.

    Formatação Inteligente: Uso da biblioteca nativa Intl.NumberFormat para exibição correta de símbolos monetários internacionais.

🛠️ Tecnologias Utilizadas

    HTML5: Estruturação semântica.

    CSS3: Variáveis globais, Flexbox, Gradientes e Design Responsivo.

    JavaScript (ES6+):

        fetch() para consumo de API.

        async/await para operações assíncronas.

        Manipulação avançada de DOM.

        Tratamento de erros com blocos try/catch/finally.

📈 Desafios Superados

Durante o desenvolvimento, enfrentei bloqueios de requisição originados por firewalls de rede e navegadores específicos (como o Mozila). A solução aplicada foi a implementação de um Proxy de CORS, o que permitiu que a aplicação se tornasse resiliente e funcional em qualquer ambiente de navegação. Além disso, foquei na padronização visual dos inputs para garantir que a experiência do usuário fosse idêntica em ambos os temas.
👤 Desenvolvedor

Gabriel Cardoso
