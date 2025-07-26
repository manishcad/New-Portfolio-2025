# 🚀 Manish Chand - Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2.0-2D3748?style=for-the-badge&logo=prisma)

</div>

---

## ✨ Overview

A stunning, modern portfolio website showcasing my skills, projects, and professional journey. Built with cutting-edge technologies and featuring a beautiful, responsive design that captivates visitors.

### 🌟 Key Features

- 🎨 **Modern Design** - Clean, responsive UI with beautiful gradients and animations
- 📱 **Mobile-First** - Perfect experience on all devices
- ⚡ **Lightning Fast** - Optimized for performance and speed
- 🔐 **Secure Admin Panel** - Protected content management system
- 📊 **Dynamic Content** - Real-time project and skill management
- 📧 **Contact Integration** - Functional contact form with email
- 🖼️ **Image Management** - Cloudinary integration for media handling

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Beautiful icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database queries
- **PostgreSQL** - Robust relational database (Neon)
- **Nodemailer** - Email functionality

### Infrastructure
- **Cloudinary** - Cloud image management
- **Neon Database** - Serverless PostgreSQL
- **Vercel** - Deployment platform

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Cloudinary account
- Gmail account (for email)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   ```

4. **Configure your environment**
   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   
   # Email
   EMAIL_USER="your_email@gmail.com"
   EMAIL_PASS="your_app_password"
   
   # Admin (optional)
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="admin123"
   ```

5. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
my-portfolio/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 api/                    # 🔌 API Routes
│   │   │   ├── 📂 projects/           # 📊 Project CRUD
│   │   │   ├── 📂 skills/             # 🎯 Skill Management
│   │   │   ├── 📂 contact/            # 📧 Contact Form
│   │   │   ├── 📂 admin/              # 🔐 Admin Panel
│   │   │   └── 📂 health/             # 💚 Health Check
│   │   ├── 📂 components/             # 🧩 React Components
│   │   ├── 📂 about/                  # 👤 About Page
│   │   ├── 📂 projects/               # 📋 Projects Page
│   │   ├── 📂 contact/                # 📞 Contact Page
│   │   └── 📂 admin/                  # ⚙️ Admin Dashboard
│   └── 📂 lib/                        # 🔧 Utilities
├── 📂 prisma/                         # 🗄️ Database Schema
├── 📂 public/                         # 📁 Static Assets
└── 📂 lib/                           # 📚 External Libraries
```

---

## 🔧 API Endpoints

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | Get all projects |
| `POST` | `/api/projects` | Create new project |
| `PUT` | `/api/projects` | Update project |
| `DELETE` | `/api/projects?id={id}` | Delete project |
| `GET` | `/api/projects/[id]` | Get single project |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/skills` | Get all skills |
| `POST` | `/api/skills` | Create new skill |
| `DELETE` | `/api/skills?id={id}` | Delete skill |
| `GET` | `/api/skills/[id]` | Get single skill |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/login` | Admin authentication |
| `POST` | `/api/admin/logout` | Admin logout |
| `GET` | `/api/admin/projects` | Admin project list |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Send contact email |
| `GET` | `/api/health` | System health check |

---

## 🎨 Features

### 🏠 Homepage
- **Hero Section** - Eye-catching introduction with animated gradients
- **Call-to-Action** - Direct links to projects and contact
- **Professional Image** - High-quality profile photo

### 👤 About Page
- **Personal Story** - Engaging narrative about your journey
- **Skills Showcase** - Interactive skill cards with icons
- **Professional Photo** - High-quality profile image

### 📋 Projects Page
- **Project Grid** - Beautiful card-based layout
- **Image Galleries** - High-quality project screenshots
- **Live Links** - Direct links to GitHub and live demos
- **Responsive Design** - Perfect on all screen sizes

### 📞 Contact Page
- **Contact Form** - Professional contact form
- **Email Integration** - Automatic email notifications
- **Form Validation** - Client and server-side validation
- **Success Feedback** - User-friendly success messages

### ⚙️ Admin Panel
- **Secure Login** - Username/password authentication
- **Project Management** - Add, edit, delete projects
- **Skill Management** - Add, edit, delete skills
- **Image Upload** - Drag-and-drop image uploads
- **Real-time Updates** - Instant content updates

---

## 🚀 Deployment

### Vercel (Recommended)
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

### Other Platforms
- **Netlify** - Similar to Vercel setup
- **Railway** - Great for full-stack apps
- **DigitalOcean** - App Platform deployment

---

## 🔒 Security Features

- **Admin Authentication** - Secure login system
- **HTTP-only Cookies** - Protected session management
- **Input Validation** - Server-side validation
- **Error Handling** - Graceful error management
- **CORS Protection** - Cross-origin request security

---

## 🎯 Performance Optimizations

- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Static Generation** - Pre-rendered pages for speed
- **CDN Integration** - Global content delivery
- **Database Optimization** - Efficient Prisma queries

---

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database
npx prisma db push --force-reset

# Check connection
npm run db:test
```

### Image Upload Issues
```bash
# Test Cloudinary
curl http://localhost:3000/api/test-cloudinary
```

### Build Issues
```bash
# Clear cache
rm -rf .next
npm run build
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **Portfolio**: [manishchand.dev](https://manishchand.dev)
- **GitHub**: [@manishcad](https://github.com/manishcad)
- **LinkedIn**: [Manish Chand](https://linkedin.com/in/manish-chand)
- **Email**: manishtochand@gmail.com

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Built with ❤️ by Manish Chand**

</div>
