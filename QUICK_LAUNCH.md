# 🚀 Quick Launch Guide - Next of Dakshin Vaarahi AI Platform

## ⚡ **5-Minute Launch (Windows)**

1. **Double-click `launch.bat`**
2. **Wait for automatic setup** (dependencies, servers)
3. **Platform opens automatically** in your browser

## ⚡ **5-Minute Launch (Linux/Mac)**

1. **Make script executable**: `chmod +x launch.sh`
2. **Run script**: `./launch.sh`
3. **Platform opens automatically** in your browser

## 🔧 **Manual Setup (Alternative)**

### **Prerequisites Check**
```bash
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

### **Step 1: Environment Setup**
```bash
# Frontend
cp env.template .env.local
# Edit .env.local with your Google Gemini API key

# Backend
cd auraos-backend
cp env.template .env
# Edit .env with your MongoDB URI and API keys
cd ..
```

### **Step 2: Install Dependencies**
```bash
# Frontend
npm install

# Backend
cd auraos-backend
npm install
cd ..
```

### **Step 3: Start Services**
```bash
# Terminal 1: Backend
cd auraos-backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

## 🌐 **Access URLs**

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api-docs

## 🔑 **Required API Keys**

### **Google Gemini AI (Required)**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Add to `.env.local`: `VITE_GEMINI_API_KEY=your_key_here`
4. Add to `auraos-backend/.env`: `GEMINI_API_KEY=your_key_here`

### **MongoDB (Required)**
1. **Local**: Install MongoDB Community Server
2. **Cloud**: Use [MongoDB Atlas](https://www.mongodb.com/atlas)
3. Add connection string to `auraos-backend/.env`

## ✅ **Launch Verification**

### **Frontend Check**
- ✅ Landing page loads
- ✅ Navigation works
- ✅ AI tools accessible
- ✅ 3D visualization working

### **Backend Check**
- ✅ Server starts on port 8000
- ✅ API endpoints responding
- ✅ Database connection successful
- ✅ AI services functional

## 🚨 **Troubleshooting**

### **Port Already in Use**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### **Dependencies Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Build Errors**
```bash
# Check TypeScript
npm run type-check

# Check build
npm run build
```

## 🎯 **Platform Features**

### **Phase 1: Enhanced AI Architecture** ✅
- AI-powered architectural analysis
- Vastu compliance checking
- Professional prompt templates

### **Phase 2: Custom Training & Advanced AI** ✅
- Multi-modal AI analysis
- Predictive design engine
- Real-time collaboration

### **Phase 3: Future Advanced Capabilities** ✅
- VR integration preparation
- IoT management tools
- Quantum computing interfaces

## 📞 **Support**

- **Documentation**: Check README.md and implementation guides
- **Issues**: Report via GitHub Issues
- **Community**: Join Discord for real-time help

---

**🎉 Your Next of Dakshin Vaarahi AI Platform is Ready!**

*Experience the future of AI-powered architecture today.*
