# Auralearn - AI-Powered Learning Platform

Auralearn is a revolutionary AI-powered, student-centered web platform designed to transform personalized learning. Built with modern technologies, it serves as a unified digital workspace where learners can upload study materials, interact with an AI tutor, create structured study plans, and access powerful productivity tools.

![Auralearn Homepage](https://github.com/user-attachments/assets/2ddd33b5-2753-4da9-82d5-aaae50315a8c)

## 🚀 Features

### 📚 Upload Study Materials
- **Drag & drop file upload** with support for multiple formats (PDF, DOC, TXT, MP4, etc.)
- **Real-time upload progress** with status indicators
- **File management** with organized storage and retrieval

![Upload Interface](https://github.com/user-attachments/assets/ac1a1371-898a-4f42-8c16-92228b00ce92)

### 🤖 AI Tutor Chat
- **Interactive AI conversations** for personalized learning guidance
- **Context-aware responses** based on uploaded study materials
- **Suggested questions** to get started quickly
- **Real-time messaging** with typing indicators

![AI Chat Interface](https://github.com/user-attachments/assets/41f7f82c-4d1d-41ee-9dd9-9551c787a48e)

### 📅 Study Plans Management
- **Create and manage** structured study plans
- **Topic organization** with customizable learning paths
- **Progress tracking** with creation and update timestamps
- **CRUD operations** for complete plan management

![Study Plans](https://github.com/user-attachments/assets/450d6065-5056-4f40-b3b9-edf83773ec53)

### 🎯 Additional Features
- **Smart Notes** - AI-generated summaries from uploaded materials
- **Practice Quizzes** - Automated question generation
- **Analytics** - Learning progress insights and optimization

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server for FastAPI
- **Pydantic** - Data validation and settings management
- **Python Multipart** - File upload handling

### Features
- **CORS enabled** for seamless frontend-backend communication
- **RESTful API** design with OpenAPI documentation
- **Real-time file processing** and AI interactions
- **Responsive design** for all device sizes

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arise485/Auralearn.git
   cd Auralearn
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```
   The backend will start on `http://localhost:8000`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`

### Development

- **Frontend Development**: `npm run dev` in the `frontend` directory
- **Backend Development**: `python main.py` in the `backend` directory
- **Build Production**: `npm run build` in the `frontend` directory

## 📋 API Endpoints

### File Management
- `POST /api/upload` - Upload study materials
- `GET /api/files` - List uploaded files

### AI Tutor
- `POST /api/chat` - Chat with AI tutor

### Study Plans
- `GET /api/study-plans` - List all study plans
- `POST /api/study-plans` - Create new study plan
- `GET /api/study-plans/{id}` - Get specific study plan
- `PUT /api/study-plans/{id}` - Update study plan
- `DELETE /api/study-plans/{id}` - Delete study plan

## 🎨 Design Philosophy

Auralearn follows a **student-centered design approach** with:
- **Intuitive user interface** with clear navigation
- **Responsive design** for all devices
- **Accessibility-first** development
- **Modern, clean aesthetics** with gradient backgrounds
- **Interactive elements** with hover effects and smooth transitions

## 🔧 Configuration

### Backend Configuration
The backend uses environment variables for configuration. Create a `.env` file:
```env
# Add any environment-specific configurations here
```

### Frontend Configuration
Next.js configuration is handled in `next.config.ts` with TypeScript support and TailwindCSS integration.

## 📈 Performance

- **Fast build times** with Turbopack (Next.js 15)
- **Optimized bundle sizes** with automatic code splitting
- **Static generation** for better performance
- **Efficient API communication** with proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- **Advanced AI Integration** with OpenAI/GPT models
- **Real-time collaboration** features
- **Mobile applications** for iOS and Android
- **Advanced analytics** and learning insights
- **Integration with learning management systems**
- **Multilingual support**

## 🙏 Acknowledgments

Built with modern web technologies and best practices to create an exceptional learning experience for students worldwide.

---

**Auralearn** - Revolutionizing personalized learning with AI 🚀