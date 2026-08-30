# 🧠 Neuralabs - Websites com Neurociência

Criamos sites que entendem o cérebro do seu cliente. **Neurociência + Design + SEO + LGPD**

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000 → Landing Page
# http://localhost:3000/dashboard → Admin Dashboard
```

### Deployment to Vercel

```bash
# Option 1: Using Vercel CLI
npm install -g vercel
vercel deploy --prod

# Option 2: GitHub Integration
# 1. git push origin main
# 2. Connect repo at vercel.com
# 3. Auto-deploy on every push
```

## 📁 Project Structure

```
neuralabs/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   └── dashboard/
│       ├── page.tsx            # Admin dashboard
│       └── layout.tsx
├── components/
│   ├── Button.tsx              # Reusable button component
│   └── Navbar.tsx              # Navigation bar
├── public/                      # Static assets
├── assets-effects/             # Design reference guides
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── vercel.json                 # Vercel deployment config
└── README.md                   # This file
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js
- **Deployment**: Vercel
- **Database**: Supabase (planned)
- **AI**: Claude API (planned)
- **Payments**: Stripe (planned)
- **Email**: Resend (planned)

## 🔧 Environment Variables

Create `.env.local` in the root:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Supabase (Database) - Add when ready
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Claude API (AI Agents)
CLAUDE_API_KEY=your-claude-api-key

# Stripe (Payments)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# Resend (Email)
RESEND_API_KEY=your-resend-api-key
```

## 📱 Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Landing | `/` | Marketing page + lead capture |
| Dashboard | `/dashboard` | Admin panel for leads/projects |
| Coming Soon | `/api/leads` | Lead submission API |
| Coming Soon | `/api/chat` | AI chatbot API |
| Coming Soon | `/api/stripe` | Payment webhook |

## 🤖 AI Agents (Roadmap)

- [ ] **Lead Qualification** - 24/7 automated chatbot
- [ ] **Proposal Generator** - Auto-create project proposals
- [ ] **Email Automation** - Automated follow-ups
- [ ] **Lead Scoring** - Qualify hot leads automatically
- [ ] **Customer Support** - AI-powered support agent

## ✨ Features

✅ **Responsive Design** - Mobile-first approach
✅ **Dark Mode** - Full dark mode support
✅ **SEO Optimized** - Meta tags, Open Graph, sitemap
✅ **Performance Focused** - Optimized images, code splitting
✅ **Accessibility** - WCAG AA compliant
✅ **Component Library** - Reusable UI components
✅ **TypeScript** - Full type safety
✅ **Tailwind CSS** - Utility-first styling

## 🚀 Development Workflow

1. **Local Development**
   ```bash
   npm run dev
   ```

2. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

3. **Linting & Formatting**
   ```bash
   npm run lint
   ```

## 📊 Next Steps

### Phase 1 (Week 1-2)
- [x] Create landing page
- [x] Setup dashboard
- [ ] Deploy to Vercel
- [ ] Setup custom domain (neuralabs.online)

### Phase 2 (Week 2-3)
- [ ] Integrate Supabase
- [ ] Build lead form
- [ ] Email notifications (Resend)
- [ ] Lead database

### Phase 3 (Week 3-4)
- [ ] AI agents (Claude API)
- [ ] Chatbot on site
- [ ] Stripe integration
- [ ] Payment processing

### Phase 4 (Week 4+)
- [ ] Analytics & tracking
- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Scale to 24/7 leads

## 🎯 Business Model

- **Price**: R$ 5.000 - R$ 8.000 per site
- **Support**: R$ 800 - R$ 1.200/month (optional)
- **Target**: PMEs with <R$ 1M revenue
- **Timeline**: 30 days per project

## 👨‍💼 Team

👤 **Bruna Borba** - Founder, Product Lead
- Woman in tech
- Neurociência specialist
- Design + Development

## 📞 Support & Contact

- Email: bruna@neuralabs.online (planned)
- WhatsApp: Form on website
- Dashboard: Internal lead management

## 📄 Legal

- **LGPD Compliant** ✅
- **Privacy Policy** (planned)
- **Terms of Service** (planned)

## 🔗 Links

- **Website**: https://neuralabs.online (live soon)
- **GitHub**: (private repo)
- **Dashboard**: https://neuralabs.online/dashboard (after auth)

---

**Made with 🧠 by Bruna Borba** © 2026 Neuralabs. All rights reserved.
