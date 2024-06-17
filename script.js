(function() {
    const DETECTED_DEVTOOLS_KEY = 'detectedDevTools';
    const USER_CODE_KEY = 'userCode';

    // Função para gerar um código de 10 dígitos
    function generateUserCode() {
        let userCode = localStorage.getItem(USER_CODE_KEY);
        if (!userCode) {
            userCode = Math.random().toString(36).substring(2, 12).toUpperCase();
            localStorage.setItem(USER_CODE_KEY, userCode);
        }
        return userCode;
    }

    const userCode = generateUserCode();

    // Função para limpar o conteúdo da página e exibir a mensagem
    function showWarning() {
        document.body.innerHTML = ''; // Remove todo o conteúdo do body
        document.body.style.backgroundColor = 'red'; // Define o fundo como vermelho
        document.body.style.display = 'flex'; // Usa flexbox para centralizar o conteúdo
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';
        document.body.style.height = '100vh'; // Define a altura para 100% da altura da viewport
        document.body.style.margin = '0'; // Remove margens

        const h1 = document.createElement('h1');
        h1.textContent = 'Site bloqueado!';
        h1.style.color = 'white'; // Define a cor do texto como branco
        h1.style.margin = '0'; // Remove margens

        const p = document.createElement('p');
        p.textContent = 'Vish, este site foi BLOQUEADO para este dispositivo, o motivo: Uso de DevTools,  este bloqueamente pode ser PERMANENTE até você falar com um dos responsaveis que fez este antiDevTools, fora disso não podemos fazer nada, o uso de DevTools é proibido á este site, já que tem pouca segurança e além do mais pode ser copiado facilmente, por este motivo, ladrões podem roubar tudo do site, fazer um outro site semelhante, e roubar dados pessoais, mas independente se vocÊ for um ladrão de site ou não, a unica solução é você entrar em contato com um dos responsaveis do site para desbloquear você, em baixo terá um codigo para quando você entrar em contato com algum responsavel pelo anti roubo, você falar o codigo que aparece para conseguir desbloquear o site para você, fora isso não podemos fazer nadinha :>';
        p.style.color = 'white'; // Define a cor do texto como branco
        p.style.marginTop = '10px'; // Margem superior para espaçamento

        const codeInfo = document.createElement('p');
        codeInfo.textContent = `Código: ${userCode}`;
        codeInfo.style.color = 'white'; // Define a cor do texto como branco
        codeInfo.style.marginTop = '10px'; // Margem superior para espaçamento

        const container = document.createElement('div'); // Contêiner para centralizar o texto
        container.style.textAlign = 'center';
        container.appendChild(h1);
        container.appendChild(p);
        container.appendChild(codeInfo);

        document.body.appendChild(container);
    }

    // Função para detectar a abertura das ferramentas de desenvolvedor
    function detectDevTools() {
        const threshold = 160; // Largura mínima da janela de inspeção
        return window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
    }

    // Verificação contínua a cada 100ms
    setInterval(function() {
        if (detectDevTools()) {
            const blockedUsers = JSON.parse(localStorage.getItem(DETECTED_DEVTOOLS_KEY)) || [];
            if (!blockedUsers.includes(userCode)) {
                blockedUsers.push(userCode);
                localStorage.setItem(DETECTED_DEVTOOLS_KEY, JSON.stringify(blockedUsers));
            }
            showWarning();
        }
    }, 100);

    // Verificação ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (detectDevTools()) {
            const blockedUsers = JSON.parse(localStorage.getItem(DETECTED_DEVTOOLS_KEY)) || [];
            if (!blockedUsers.includes(userCode)) {
                blockedUsers.push(userCode);
                localStorage.setItem(DETECTED_DEVTOOLS_KEY, JSON.stringify(blockedUsers));
            }
            showWarning();
        }
    });

    // Verificação ao carregar a página
    window.addEventListener('load', function() {
        const blockedUsers = JSON.parse(localStorage.getItem(DETECTED_DEVTOOLS_KEY)) || [];
        if (blockedUsers.includes(userCode)) {
            showWarning();
        }
    });
})();
