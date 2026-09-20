const ESP_URL = "http://192.168.18.50";

const message = document.getElementById("message");

function enviarComando(comando, texto) {
    message.textContent = texto;

    const janela = window.open(
        `${ESP_URL}/${comando}`,
        "_blank"
    );

    // Fecha a aba do ESP depois de enviar o comando
    setTimeout(() => {
        if (janela && !janela.closed) {
            janela.close();
        }
    }, 1000);
}

document.getElementById("lightOn").addEventListener("click", () => {
    enviarComando("ligar", "💡 Luz ligada.");
});

document.getElementById("lightOff").addEventListener("click", () => {
    enviarComando("desligar", "🌙 Luz desligada.");
});