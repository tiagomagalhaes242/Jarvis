
from __future__ import annotations

import socket

from pydantic import BaseModel

from jarvis.tools.registry import ToolResult, VoicePattern


ESP_IP = "192.168.18.50"
ESP_PORT = 80


class LightArgs(BaseModel):
    pass


def send_command(path: str) -> None:
    with socket.create_connection((ESP_IP, ESP_PORT), timeout=5) as sock:
        request = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {ESP_IP}\r\n"
            "Connection: close\r\n"
            "\r\n"
        )

        sock.sendall(request.encode("ascii"))

        # Espera a resposta do ESP e depois fecha
        while sock.recv(1024):
            pass


class TurnOnLightTool:
    name = "turn_on_light"
    description = "Liga a luz através do relé conectado ao ESP8266."
    requires_confirmation = False
    args_schema = LightArgs

    voice_patterns = (
        VoicePattern(
            r"^(?:ligar|acender)\s+(?:a\s+)?luz$",
            priority=100,
        ),
    )

    async def execute(self, args: LightArgs) -> ToolResult:
        try:
            send_command("/ligar")

            return ToolResult(
                success=True,
                output="Luz ligada, senhor.",
            )

        except Exception as exc:
            return ToolResult(
                success=False,
                error=f"Não consegui ligar a luz: {exc}",
            )


class TurnOffLightTool:
    name = "turn_off_light"
    description = "Desliga a luz através do relé conectado ao ESP8266."
    requires_confirmation = False
    args_schema = LightArgs

    voice_patterns = (
        VoicePattern(
            r"^(?:desligar|apagar)\s+(?:a\s+)?luz$",
            priority=100,
        ),
    )

    async def execute(self, args: LightArgs) -> ToolResult:
        try:
            send_command("/desligar")

            return ToolResult(
                success=True,
                output="Luz desligada, senhor.",
            )

        except Exception as exc:
            return ToolResult(
                success=False,
                error=f"Não consegui desligar a luz: {exc}",
            )

