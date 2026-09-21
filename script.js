const BRIDGE_URL =
    "https://routes-invision-techrepublic-older.trycloudflare.com";

const message = document.getElementById("message");
const statusText = document.getElementById("statusText");

const lightOn = document.getElementById("lightOn");
const lightOff = document.getElementById("lightOff");


async function enviarComando(comando) {

    if (comando === "ligar") {
        message.textContent = "💡 Ligando a luz...";
    } else {
        message.textContent = "🌙 Desligando a luz...";
    }

    statusText.textContent = "CONECTANDO...";

    try {

        const url =
            `${BRIDGE_URL}/${comando}?t=${Date.now()}`;

        const resposta = await fetch(url, {
            method: "GET",
            cache: "no-store"
        });

        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();

        console.log("Resposta do JARVIS:", dados);

        if (dados.ok) {

            if (comando === "ligar") {
                message.textContent = "💡 Luz ligada.";
            } else {
                message.textContent = "🌙 Luz desligada.";
            }

            statusText.textContent = "JARVIS ONLINE";

        } else {

            message.textContent =
                "❌ O JARVIS recebeu o comando, mas houve um erro.";

            statusText.textContent = "ERRO NO COMANDO";
        }

    } catch (erro) {

        console.error("Erro ao conectar ao JARVIS:", erro);

        message.textContent =
            "❌ Não foi possível conectar ao JARVIS.";

        statusText.textContent = "JARVIS OFFLINE";
    }
}


lightOn.addEventListener("click", () => {
    enviarComando("ligar");
});


lightOff.addEventListener("click", () => {
    enviarComando("desligar");
});


async function verificarBridge() {

    try {

        const resposta = await fetch(
            `${BRIDGE_URL}/?t=${Date.now()}`,
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if (resposta.ok) {
            statusText.textContent = "JARVIS ONLINE";
        } else {
            statusText.textContent = "BRIDGE COM ERRO";
        }

    } catch (erro) {

        console.error("Bridge não respondeu:", erro);

        statusText.textContent = "JARVIS OFFLINE";
    }
}


verificarBridge();