@echo off
cd /d "E:\Sovereign_Vault\cinecars-directory"
echo Starting CineCars Server...
echo.
echo After it says "Ready", open Firefox to: http://127.0.0.1:3000
echo.
echo Press Ctrl+C to stop the server.
echo.
npx next start -p 3000
pause