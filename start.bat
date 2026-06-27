@echo off
title LawinServerV2 - OG Fortnite 14.60
cd /d "%~dp0LawinServerV2"

if not exist node_modules (
    echo Installing npm packages...
    call npm install
)

echo Starting LawinServer on http://127.0.0.1:8080
echo.
echo Accounts (create with: node scripts/createAccount.js email user pass):
echo   player1@lawin.org / password123
echo   friend@lawin.org  / password123
echo.

:start
node index.js
echo Server crashed, restarting in 3s...
timeout /t 3 /nobreak >nul
goto start
