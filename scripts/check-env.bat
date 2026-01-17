@echo off
REM OAuth 2.0 Lab - Environment Check Script (Windows)
REM 检查所有必需的开发环境

echo ==================================
echo OAuth 2.0 Lab - Environment Check
echo ==================================
echo.

REM Check Docker
echo Checking Docker...
where docker >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Docker installed
    docker --version
) else (
    echo [FAIL] Docker not installed
)

where docker-compose >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Docker Compose installed
    docker-compose --version
) else (
    echo [FAIL] Docker Compose not installed
)
echo.

REM Check Node.js
echo Checking Node.js...
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js installed
    node --version
) else (
    echo [FAIL] Node.js not installed
)

where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] npm installed
    npm --version
) else (
    echo [FAIL] npm not installed
)
echo.

REM Check Java
echo Checking Java...
where java >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Java installed
    java -version
) else (
    echo [FAIL] Java not installed
)

where javac >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] javac installed
) else (
    echo [FAIL] javac not installed
)
echo.

REM Check Python
echo Checking Python...
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python installed
    python --version
) else (
    echo [FAIL] Python not installed
)

where pip >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] pip installed
    pip --version
) else (
    echo [FAIL] pip not installed
)
echo.

REM Check PHP
echo Checking PHP...
where php >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] PHP installed
    php --version
) else (
    echo [FAIL] PHP not installed
)

where composer >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Composer installed
    composer --version
) else (
    echo [FAIL] Composer not installed
)
echo.

REM Check Go
echo Checking Go...
where go >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Go installed
    go version
) else (
    echo [FAIL] Go not installed
)
echo.

REM Check Git
echo Checking Git...
where git >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Git installed
    git --version
) else (
    echo [FAIL] Git not installed
)
echo.

echo ==================================
echo Environment check completed!
echo ==================================
pause
