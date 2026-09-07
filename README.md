# Portfolio

A modern, interactive personal portfolio website built with Next.js, featuring 3D elements, smooth animations, and a clean design.

## 🌐 Live Demo

**[https://portfolio-saiteja6.vercel.app](https://portfolio-saiteja6.vercel.app)**

## ✨ Features

- **3D Interactive Elements** - React Three Fiber for immersive 3D visuals
- **Smooth Animations** - Framer Motion for fluid transitions and effects
- **Responsive Design** - Works seamlessly on all devices
- **Modern Stack** - Next.js 16 with React 19
- **Sections Included**:
  - Hero with 3D background
  - About Me
  - Skills
  - Projects
  - Education
  - Certifications
  - Contact
  - Custom cursor and magnetic buttons
  - Particle/Orb background effects

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [React 19](https://react.dev/) + TypeScript
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/saitejauppala/portfolio.git

# Navigate to the project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Main page
│   │   ├── globals.css   # Global styles
│   │   ├── sitemap.ts    # SEO sitemap
│   │   └── robots.ts     # Robots.txt
│   ├── components/       # React components
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Hero3D.tsx    # 3D hero element
│   │   ├── About.tsx     # About section
│   │   ├── Skills.tsx    # Skills section
│   │   ├── Projects.tsx  # Projects showcase
│   │   ├── Education.tsx # Education timeline
│   │   ├── Certifications.tsx # Certifications
│   │   ├── Contact.tsx   # Contact form/info
│   │   ├── Navbar.tsx    # Navigation
│   │   ├── ...           # Other UI components
│   ├── data/
│   │   └── portfolio.ts  # Portfolio data
│   └── lib/
│       └── interaction.ts # Interaction utilities
├── public/               # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Adding Your Information

Edit `src/data/portfolio.ts` to update:
- Personal details
- Skills
- Projects
- Education
- Certifications

### Customizing Styles

- Modify `src/app/globals.css` for global styles
- Tailwind classes can be customized in component files

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/app/page.tsx`
3. Update the sitemap if needed

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🚀 Deployment

This portfolio is deployed on **Vercel**. To deploy your own:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Next.js and deploys

### Environment Variables

No environment variables required for the base setup.

## 📧 Contact

- **GitHub**: [@saitejauppala](https://github.com/saitejauppala)
- **Live Portfolio**: https://portfolio-saiteja6.vercel.app

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and React Three Fiber
