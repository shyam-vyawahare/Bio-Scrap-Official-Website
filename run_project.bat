@echo off
setlocal
title Green Cycle Solutions - Launcher

echo ===================================================
echo   Green Cycle Solutions - Project Launcher
echo ===================================================

cd /d "%~dp0\green-cycle-solutions-main"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Project directory 'green-cycle-solutions-main' not found!
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo [INFO] First time setup: Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies. Please check your internet connection or node installation.
        pause
        exit /b 1
    )
)

echo [INFO] Starting development server...
echo [INFO] The application will open in your default browser.
echo.

:: Start the server and open browser
call npm run dev -- --open

pause
