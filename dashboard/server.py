from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import socket
import os

ESP_IP = "192.168.18.50"
ESP_PORT = 80
PORT = 8765

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def send_esp_command(path):
    with socket.create_connection((ESP_IP, ESP_PORT), timeout=5) as sock:
        request = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {ESP_IP}\r\n"
            "Connection: close\r\n"
            "\r\n"
        )

        sock.sendall(request.encode("ascii"))

        while sock.recv(1024):
            pass


class JarvisHandler(SimpleHTTPRequestHandler):

    def do_GET(self):

        if self.path == "/api/luz/ligar":
            try:
                send_esp_command("/ligar")

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                self.wfile.write(
                    b'{"ok":true,"mensagem":"Luz ligada"}'
                )

            except Exception as exc:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                mensagem = str(exc).replace('"', "'")

                self.wfile.write(
                    f'{{"ok":false,"erro":"{mensagem}"}}'.encode()
                )

            return

        if self.path == "/api/luz/desligar":
            try:
                send_esp_command("/desligar")

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                self.wfile.write(
                    b'{"ok":true,"mensagem":"Luz desligada"}'
                )

            except Exception as exc:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                mensagem = str(exc).replace('"', "'")

                self.wfile.write(
                    f'{{"ok":false,"erro":"{mensagem}"}}'.encode()
                )

            return

        super().do_GET()


os.chdir(BASE_DIR)

server = ThreadingHTTPServer(
    ("127.0.0.1", PORT),
    JarvisHandler
)

print(
    f"JARVIS Dashboard online em "
    f"http://127.0.0.1:{PORT}"
)

print("Pressione Ctrl+C para parar.")

try:
    server.serve_forever()

except KeyboardInterrupt:
    print("\nDashboard encerrado.")
    server.server_close()