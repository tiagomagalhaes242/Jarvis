Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\tiago\Jarvis"
WshShell.Run """C:\Users\tiago\Jarvis\.venv\Scripts\python.exe"" -m jarvis", 0, False
