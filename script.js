const BRIDGE_URL = "http://192.168.18.7:5000";

const message = document.getElementById("message");

async function enviarComando(comando, texto) {
    message.textContent = texto;

    try {
        const resposta = await fetch(`${BRIDGE_URL}/${comando}`);
        const dados = await resposta.json();

        if (dados.ok) {
            message.textContent =
                comando === "ligar"
                    ? "💡 Luz ligada."
                    : "🌙 Luz desligada.";
        } else {
            message.textContent = "❌ Não consegui falar com o ESP.";
        }
    } catch (erro) {
        console.error(erro);
        message.textContent = "❌ Não foi possível conectar ao JARVIS.";
    }
}

document.getElementById("lightOn").addEventListener("click", () => {
    enviarComando("ligar", "Enviando comando...");
});

document.getElementById("lightOff").addEventListener("click", () => {
    enviarComando("desligar", "Enviando comando...");
});