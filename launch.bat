@echo off
echo ========================================
echo   Next of Dakshin Vaarahi AI Platform
echo ========================================
echo.

echo [1/4] Checking prerequisites...
echo - Node.js version:
node --version
echo - npm version:
npm --version
echo.

echo [2/4] Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependency installation failed!
    pause
    exit /b 1
)

echo [3/4] Installing backend dependencies...
cd auraos-backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend dependency installation failed!
    pause
    exit /b 1
)
cd ..

echo [4/4] Starting platform...
echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd auraos-backend && npm run dev"
timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Platform Launch Complete!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo.
echo Press any key to open the frontend...
pause >nul
start http://localhost:5173
