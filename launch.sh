#!/bin/bash

echo "========================================"
echo "  Next of Dakshin Vaarahi AI Platform"
echo "========================================"
echo

echo "[1/4] Checking prerequisites..."
echo "- Node.js version:"
node --version
echo "- npm version:"
npm --version
echo

echo "[2/4] Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend dependency installation failed!"
    exit 1
fi

echo "[3/4] Installing backend dependencies..."
cd auraos-backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend dependency installation failed!"
    exit 1
fi
cd ..

echo "[4/4] Starting platform..."
echo
echo "Starting backend server..."
gnome-terminal --title="Backend Server" -- bash -c "cd auraos-backend && npm run dev; exec bash" &
sleep 3

echo "Starting frontend server..."
gnome-terminal --title="Frontend Server" -- bash -c "npm run dev; exec bash" &
sleep 3

echo
echo "========================================"
echo "  Platform Launch Complete!"
echo "========================================"
echo
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
echo
echo "Opening frontend in browser..."
sleep 2
xdg-open http://localhost:5173 2>/dev/null || open http://localhost:5173 2>/dev/null || echo "Please manually open: http://localhost:5173"
