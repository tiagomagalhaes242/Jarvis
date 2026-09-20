const message = document.getElementById("message");
const status = document.getElementById("status");

document.getElementById("lightOn").addEventListener("click", () => {
  message.textContent = "Comando: ligar luz.";
  console.log("LIGAR LUZ");
});

document.getElementById("lightOff").addEventListener("click", () => {
  message.textContent = "Comando: desligar luz.";
  console.log("DESLIGAR LUZ");
});

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {

  const recognition = new SpeechRecognition();

  recognition.lang = "pt-BR";
  recognition.continuous = false;
  recognition.interimResults = false;

  document.getElementById("mic").addEventListener("click", () => {
    message.textContent = "Estou ouvindo...";
    recognition.start();
  });

  recognition.onresult = (event) => {

    const text =
      event.results[0][0].transcript.toLowerCase();

    message.textContent = `Você disse: "${text}"`;

    if (
      text.includes("liga") &&
      text.includes("luz")
    ) {
      document.getElementById("lightOn").click();
    }

    else if (
      text.includes("desliga") &&
      text.includes("luz")
    ) {
      document.getElementById("lightOff").click();
    }

  };

  recognition.onerror = () => {
    message.textContent =
      "Não consegui entender o comando.";
  };

}
else {

  document.getElementById("mic").disabled = true;

  message.textContent =
    "Reconhecimento de voz não disponível neste navegador.";

}
