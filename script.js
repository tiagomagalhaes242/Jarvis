const ESP_URL = "http://192.168.18.50";

const message = document.getElementById("message");

document.getElementById("lightOn").addEventListener("click", () => {
    message.textContent = "Enviando comando para o ESP8266...";
    window.open(`${ESP_URL}/ligar`, "_blank");
});

document.getElementById("lightOff").addEventListener("click", () => {
    message.textContent = "Enviando comando para o ESP8266...";
    window.open(`${ESP_URL}/desligar`, "_blank");
});