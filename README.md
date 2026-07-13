# The Walking Textbooks (TWT) Website

A world-class, fully responsive website for **The Walking Textbooks** — a South African education and technology company dedicated to transforming learning through innovation, AI, and technology.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (jsonwebtoken + bcryptjs) |
| **Email** | Nodemailer |
| **Icons** | Lucide React |

## Features

- **15+ Pages** — Home, About, Services (5 sub-pages), Blog, Contact, Projects, Careers, Gallery, Testimonials, FAQs, Privacy Policy, Terms
- **Admin Dashboard** — Full CRUD for blog posts, services, testimonials, team members, messages, subscribers
- **Dark Mode** — Full light/dark theme support with system preference detection
- **Animations** — Smooth page transitions and scroll-triggered animations with Framer Motion
- **Responsive** — Mobile-first design, works beautifully on all devices
- **SEO Optimized** — Server-side rendering, dynamic sitemap, robots.txt, Open Graph, Schema.org markup
- **Glassmorphism UI** — Premium glass-effect cards and components
- **Contact Form** — Professional form with validation and email integration
- **Newsletter** — Email subscription system
- **WhatsApp Integration** — Floating WhatsApp contact button
- **Cookie Banner** — GDPR-compliant cookie consent
- **Loading Screen** — Animated loading overlay

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
cd "TWT WEBSITE/website"
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/twt

# JWT
JWT_SECRET=your-super-secret-key-change-this

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Site
NEXT_PUBLIC_SITE_URL=https://thewalkingtextbooks.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Seed Database

```bash
npm run seed
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── sitemap.ts                  # Dynamic sitemap
│   ├── robots.ts                   # Robots.txt
│   ├── about/page.tsx              # About page
│   ├── services/
│   │   ├── page.tsx                # Services overview
│   │   ├── tutoring/page.tsx       # Academic Tutoring
│   │   ├── trading-academy/page.tsx # Trading Academy
│   │   ├── technology/page.tsx     # Technology Solutions
│   │   └── ai-solutions/page.tsx   # AI Solutions
│   ├── blog/
│   │   ├── page.tsx                # Blog listing
│   │   └── [slug]/page.tsx         # Blog post detail
│   ├── projects/page.tsx           # Projects showcase
│   ├── careers/page.tsx            # Careers page
│   ├── gallery/page.tsx            # Photo gallery
│   ├── testimonials/page.tsx       # Testimonials
│   ├── faqs/page.tsx               # FAQs
│   ├── contact/page.tsx            # Contact page
│   ├── privacy/page.tsx            # Privacy Policy
│   ├── terms/page.tsx              # Terms of Service
│   ├── admin/                      # Admin panel
│   │   ├── layout.tsx              # Admin layout
│   │   ├── page.tsx                # Dashboard
│   │   ├── login/page.tsx          # Admin login
│   │   ├── posts/page.tsx          # Blog management
│   │   ├── services/page.tsx       # Services management
│   │   ├── testimonials/page.tsx   # Testimonial management
│   │   ├── team/page.tsx           # Team management
│   │   ├── messages/page.tsx       # Message inbox
│   │   └── subscribers/page.tsx    # Subscriber management
│   └── api/                        # API routes
│       ├── contact/route.ts
│       ├── newsletter/route.ts
│       ├── blog/route.ts
│       ├── blog/[slug]/route.ts
│       ├── services/route.ts
│       ├── services/[id]/route.ts
│       ├── testimonials/route.ts
│       ├── team/route.ts
│       ├── faqs/route.ts
│       ├── auth/login/route.ts
│       ├── auth/logout/route.ts
│       ├── auth/me/route.ts
│       ├── subscribers/route.ts
│       └── messages/route.ts
├── components/
│   ├── ui/                         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Container.tsx
│   │   ├── GradientText.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── testimonial/Carousel.tsx
│   ├── layout/                     # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── DarkModeToggle.tsx
│   │   └── ThemeProvider.tsx
│   └── shared/                     # Shared components
│       ├── LoadingScreen.tsx
│       ├── CookieBanner.tsx
│       └── ScrollToTop.tsx
├── lib/                            # Utilities
│   ├── mongodb.ts
│   ├── auth.ts
│   ├── email.ts
│   └── seed.ts
├── models/                         # MongoDB models
│   ├── User.ts
│   ├── BlogPost.ts
│   ├── Service.ts
│   ├── Testimonial.ts
│   ├── TeamMember.ts
│   ├── ContactMessage.ts
│   ├── Subscriber.ts
│   └── FAQ.ts
├── types/
│   └── index.ts                    # TypeScript interfaces
└── middleware.ts                    # Route protection
```

## Admin Panel

Access the admin dashboard at `/admin/login`.

**Default credentials** (change in production):
- Email: `admin@thewalkingtextbooks.com`
- Password: `admin123`

The admin panel allows you to:
- Manage blog posts (create, edit, delete)
- Manage services and their details
- Manage testimonials
- Manage team members
- View and respond to contact messages
- View newsletter subscribers

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Manual Deployment

1. Run `npm run build`
2. Copy the `.next` folder and `node_modules` to your server
3. Set environment variables
4. Run `npm start`

## Brand Guidelines

- **Primary Color**: Deep Blue (#0A1628)
- **Secondary Color**: Purple (#6C3CE1)
- **Accent Color**: Cyan (#00D4FF)
- **Font**: Inter
- **Style**: Premium, Clean, Modern, Glassmorphism

## License

© 2024 The Walking Textbooks. All rights reserved.
