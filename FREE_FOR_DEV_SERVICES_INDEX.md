# free-for-dev Repository - Services Index

Índice de referência rápida do repositório [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev).

**Descrição:** Curated list of 300+ SaaS, PaaS, IaaS services with **free forever** (not just free trial) offerings for developers and infrastructure professionals. Maintained by 1600+ contributors.

**Source:** https://github.com/ripienaar/free-for-dev  
**Last Verified:** 2026-09-22  
**Scope:** Services for infrastructure developers, DevOps, sysadmins (opinionated, gray areas reviewed case-by-case)

---

## Criteria for Inclusion

✅ **Free Tier Requirement:** Must offer free tier (not just free trial)  
✅ **Duration:** If time-bucketed, free tier must be ≥1 year  
✅ **Security:** SSO is fine; TLS restrictions limited to paid = REJECTED  
✅ **Type:** SaaS/PaaS/IaaS (no self-hosted software)  
✅ **Scope:** Infrastructure/DevOps relevant (opinionated cutoff)  

---

## 50+ Categories Overview

### Cloud Infrastructure (8+ categories)

| Category | Example Services | Use Case |
|----------|------------------|----------|
| **Major Cloud Providers** | GCP, AWS, Azure, Oracle, IBM, Cloudflare, Zoho | Compute, storage, databases, functions |
| **Cloud Management** | Pulumi, Scalr, Brainboard | IaC, Terraform automation, visual infrastructure |
| **IaaS** | Various VM/container hosting | Virtual machines, Kubernetes |
| **PaaS** | Cloud 66, deployment.io | Application deployment, hosting |
| **CDN & Protection** | Cloudflare Workers, R2, Pages | DDoS, caching, serverless, static hosting |

### Development & DevOps (8+ categories)

| Category | Example Services | Use Case |
|----------|------------------|----------|
| **CI/CD** | GitHub Actions, Azure Pipelines, GitLab CI | Automated testing and deployment |
| **Source Repos** | GitHub, GitLab, Gitea, Codeberg | Version control, collaboration |
| **Code Quality** | SonarCloud, Snyk, DeepSource | Linting, security scanning, analysis |
| **Artifact Repos** | Gemfury, JitPack, Repsy | Package hosting (npm, PyPI, Maven) |
| **Docker & Container** | Docker Hub, GitHub Container Registry | Container hosting and distribution |

### APIs & Data (15+ categories)

| Category | Count | Examples |
|----------|-------|----------|
| **APIs, Data & ML** | 100+ | IP geolocation, weather, news, email validation, web scraping |
| **Search** | Multiple | Elasticsearch (self-hosted), Meilisearch, Algolia alternatives |
| **Data Visualization** | Multiple | Maps APIs, charting, real-time data viz |
| **Managed Data Services** | 10+ | PostgreSQL, MongoDB, Redis, DynamoDB alternatives |
| **Message & Streaming** | Multiple | Kafka alternatives, message queues, webhooks |

### Specialized Services (20+ categories)

| Category | Examples | Free Tier |
|----------|----------|-----------|
| **Analytics & Events** | Mixpanel, Segment, Posthog | Up to 1M events/month typically |
| **Authentication & User Mgmt** | Auth0, Firebase Auth, Clerk | Up to 7,500 active users |
| **Monitoring & Logging** | Datadog, New Relic, Grafana Cloud | Limited dashboards, logs, metrics |
| **Payment & Billing** | Stripe, Paddle (free until revenue) | Developer-friendly free plans |
| **Email** | SendGrid, Mailgun, Postmark | 100-500 emails/day typically |
| **SMS & Notifications** | Twilio, Firebase Cloud Messaging | Small monthly quotas |
| **Forms & Surveys** | Typeform, Formspree | 50-500 responses/month |
| **CMS** | Contentful, Sanity, Strapi | Content creation, API-first |
| **Crash & Exception** | Sentry, Rollbar, Bugsnag | Error tracking, alerting |
| **Feature Toggles** | LaunchDarkly, Split.io | Feature flags, A/B testing |
| **Testing** | BrowserStack, TestingBot | Cross-browser testing |
| **Security & PKI** | Sectigo, Let's Encrypt | SSL/TLS certificates |
| **Code Search & Browsing** | GitHub, Sourcegraph | Code navigation, search |
| **Dev Tools** | HackerMD, DevToolLab, Postman | APIs, docs, snippets |
| **Design & UI** | Figma, Adobe XD alternatives | Design collaboration |
| **Translation** | Crowdin, Lokalise | i18n management |

---

## Pricing Models Observed

### Type 1: Perpetual Free Tier (No Expiration)
- Examples: GitHub, GitLab, Cloudflare Workers
- Model: Features limited, not usage expiration
- Ideal for: Open source, personal projects

### Type 2: Generous Quota + Free Forever
- Examples: SendGrid (100 emails/day), Stripe (free until revenue)
- Model: Unlimited duration with monthly/daily quota
- Ideal for: SMB, side projects, testing

### Type 3: Time-Bounded Free Trial (REJECTED)
- Example: AWS (12-month free tier on some services)
- Status: Not included in free-for-dev unless explicitly ≥1 year
- Reason: Plans to migrate = risky for production

### Type 4: Free for Open Source / Non-Commercial
- Examples: JetBrains IDEs, many SaaS tools
- Model: Full features if OSS/personal, limited if commercial
- Note: Carefully evaluated for scope

### Type 5: Freemium (Soft Limit)
- Examples: Notion (1000 blocks), Slack (90-day message history)
- Model: Free tier usable long-term but limited
- Pitfall: Limits frustrating as usage grows

---

## High-Value Services for Startups

### Tier 1: Essential Infrastructure

| Service | Free Tier | Why It Matters |
|---------|-----------|---|
| **GitHub** | Unlimited repos, CI/CD minutes | Complete dev platform |
| **Cloudflare** | Unlimited domains, DDoS, CDN | Instant global CDN + security |
| **PostgreSQL** | Self-hosted, or ~5GB on cloud free tiers | Powerful relational DB |
| **Redis** | Self-hosted, or free limited cloud | Caching + sessions |
| **Stripe** | Process live payments, no fees until volume | Production-ready payments |

### Tier 2: Development Velocity

| Service | Free Tier | Enables |
|---------|-----------|---------|
| **Vercel / Netlify** | 100+ deployments/month | Frontend hosting + CI/CD |
| **Firebase** | Realtime DB, Auth, Hosting | Rapid MVP development |
| **SendGrid / Mailgun** | 100-1000 emails/day | Email infrastructure |
| **Auth0 / Clerk** | 7,500 active users | User auth without code |

### Tier 3: Monitoring & Observability

| Service | Free Tier | Value |
|---------|-----------|-------|
| **Sentry** | 1M events/month | Error tracking |
| **Datadog** | Limited dashboards | Infrastructure monitoring |
| **Grafana Cloud** | 10GB metrics | Time-series visualization |

---

## Neuralabs-Specific Services (Curated Selection)

### Design & UI Tools

| Service | Free Tier | Relevance to Neuralabs |
|---------|-----------|------------------------|
| **Figma** | 3 projects, 2 editors, basic features | Design system management |
| **Penpot** | Self-hosted or cloud free tier | Open-source Figma alternative |
| **Storybook** | Free, open-source | Component library hosting |
| **Zeplin** | Limited projects | Design handoff to developers |

### Visualization & Analytics

| Service | Free Tier | Use Case |
|---------|-----------|----------|
| **Metabase** | Self-hosted free | Design system metrics dashboard |
| **Grafana** | Self-hosted free | Monitor design generation performance |
| **Apache Superset** | Self-hosted free | Design audit visualization |

### API & Data Services

| Service | Free Tier | Application to Neuralabs |
|---------|-----------|--------------------------|
| **Firecrawl** | 1,000 credits/month | Scrape competitor design systems |
| **Brave Search API** | $5/month credits | Research design trends, patterns |
| **Weather API** | 1,000 requests/day | If design includes weather-based customization |
| **IP Geolocation** | 1,000+ requests/day | Location-based design variants |

### Monitoring & Logging

| Service | Free Tier | For Neuralabs |
|---------|-----------|--------------|
| **Sentry** | 1M events/month | Monitor OpenDesign daemon errors |
| **LogRocket** | Limited sessions | Design generation error tracking |
| **Datadog** | Limited dashboards | Performance monitoring of design agent |

### Testing & Quality

| Service | Free Tier | Application |
|---------|-----------|-------------|
| **BrowserStack** | Limited free tier | Test design responsiveness across browsers |
| **Playwright** | Free, open-source | UI testing of design previews |
| **Percy** | Limited snapshots/month | Visual regression testing of designs |

### Communication & Collaboration

| Service | Free Tier | Use in Neuralabs |
|---------|-----------|-----------------|
| **Discord** | Unlimited users, public/private rooms | Design team collaboration |
| **Slack** | 90-day history (limited but usable) | Team notifications from design agents |
| **Mattermost** | Self-hosted free | Self-hosted Slack alternative |

### Authentication & Security

| Service | Free Tier | Relevance |
|---------|-----------|-----------|
| **Auth0** | 7,500 active users | User auth for design platform |
| **Clerk** | Similar generous free tier | Modern auth + user management |
| **Let's Encrypt** | Unlimited free SSL certs | HTTPS for design platform |

---

## Cost Optimization Strategy for Neuralabs

### Phase 1: Bootstrap (Now)
Use free tiers for:
- ✅ GitHub (repos, CI/CD)
- ✅ Cloudflare (DNS, CDN, Workers)
- ✅ PostgreSQL (self-hosted or cloud free tier)
- ✅ Sentry (error tracking)
- ✅ Auth0 free tier (auth)

**Estimated Savings:** $0 vs ~$500/month equivalent features

### Phase 2: Growth (Scaling)
Graduate to paid only when:
- Active users exceed free limits
- Performance/reliability requirements justify investment
- ROI of premium feature justifies cost

Candidates for paid upgrade:
- Stripe (when payment volume > cost)
- DataDog (when monitoring needs > free tier)
- SendGrid (when email volume > free quota)

### Phase 3: Optimization (Mature)
Re-evaluate services quarterly:
- Retiring services no longer used
- Consolidating overlapping services
- Negotiating enterprise discounts

---

## Service Categories Ranked by Value

### Tier A: Essential (Build Nothing Alternative)
1. GitHub - Source control, CI/CD
2. PostgreSQL - Relational database
3. Cloudflare - CDN, DNS, Workers
4. Let's Encrypt - SSL certificates
5. Firebase/Supabase - Realtime DB + auth

### Tier B: High Value (Saves 10-20 hours/month)
1. Auth0/Clerk - User authentication
2. Sentry - Error tracking
3. Vercel/Netlify - Frontend deployment
4. SendGrid - Email infrastructure
5. Stripe - Payment processing

### Tier C: Nice to Have (Improves velocity)
1. Figma - Design collaboration
2. Slack - Team communication
3. DataDog - Monitoring
4. BrowserStack - Cross-browser testing
5. Metabase - Analytics

### Tier D: Niche (Solves specific problem)
1. Firecrawl - Web scraping
2. Brave Search API - Search alternative
3. Various geolocation APIs
4. Video processing (Rendi, etc.)
5. Specialized APIs by domain

---

## Integration Opportunities with Neuralabs

### Immediate (Q4 2026)
- [ ] Map all services currently in use
- [ ] Evaluate free tiers for cost savings
- [ ] Set up Sentry for OpenDesign daemon monitoring
- [ ] Configure Cloudflare Workers for design API caching

### Medium-term (Q1 2027)
- [ ] Implement Figma integration for design comparison
- [ ] Set up design analytics dashboard (Metabase)
- [ ] Evaluate Firecrawl for competitive analysis
- [ ] Test visual regression tools (Percy/Playwright)

### Long-term (2027+)
- [ ] Build custom design validation service
- [ ] Integrate with design APIs (Figma, Penpot)
- [ ] Implement advanced monitoring (DataDog)
- [ ] Set up design asset CDN (Cloudflare R2)

---

## Notable Patterns Across Free Tiers

### Pattern 1: Freemium with Generous Limits
- **Model:** Free forever but with quotas (emails/month, API calls/day)
- **Examples:** SendGrid (100/day), Stripe (no fees until revenue)
- **Pro:** Perfect for early-stage, clear upgrade path
- **Con:** Can hit limits unexpectedly

### Pattern 2: Forever Free Tier + Paid Upgrades
- **Model:** Basic features free for all; premium features paid
- **Examples:** GitHub, GitLab, Figma
- **Pro:** Zero risk of losing access; features, not data limits
- **Con:** UI/UX sometimes degrades to push upgrade

### Pattern 3: Free Tier for FOSS/Non-Commercial
- **Model:** Full features free for open-source; restricted for commercial
- **Examples:** JetBrains, many SaaS tools
- **Pro:** No hidden costs for community projects
- **Con:** Must comply with license/attribution requirements

### Pattern 4: Self-Hosted = Free; Cloud = Paid
- **Model:** Open-source software free (self-hosted); managed SaaS is paid
- **Examples:** PostgreSQL, Redis, Grafana, Meilisearch
- **Pro:** No data lock-in; freedom to self-host
- **Con:** Requires DevOps knowledge for self-hosting

### Pattern 5: Time-Limited Trial (Avoiding)
- **Model:** Free for first N days/months (not included in this list)
- **Examples:** AWS free tier (12 months), Azure (30 days)
- **Status:** ❌ Not in free-for-dev; too risky for production
- **Reason:** Forced migration deadline creates lock-in

---

## Comparing to Paid Alternatives

| Category | Free Service | Typical Paid | Savings @$1K/mo usage |
|----------|--------------|--------------|----------------------|
| Source Control | GitHub | GitLab Premium | $21/mo |
| CI/CD | GitHub Actions | CircleCI | $50-200/mo |
| DNS/CDN | Cloudflare | Akamai | $500+/mo |
| Database | PostgreSQL free tier | AWS RDS | $100-500/mo |
| Monitoring | Sentry free tier | DataDog | $500+/mo |
| Auth | Auth0 free tier | Custom implementation | 200+ hours |

**Total potential savings with smart free tier usage:** $2K-5K/month

---

## Red Flags in Free Tier Evaluation

🚩 **Free Trial Only** (not perpetual free tier)  
🚩 **TLS Restricted to Paid** (security liability)  
🚩 **Unknown Data Retention Policy** (data loss risk)  
🚩 **No SLA in Free Tier** (unreliable for production)  
🚩 **Suspicious Pricing Model** (bait-and-switch potential)  
🚩 **No API Access in Free Tier** (limits automation)  

---

## Action Items for Neuralabs

### Audit (1 week)
- [ ] List all services currently in use
- [ ] Map to categories in free-for-dev
- [ ] Identify duplicates or overlaps
- [ ] Calculate monthly spend breakdown

### Optimize (2 weeks)
- [ ] Migrate to free tier alternatives where applicable
- [ ] Remove unused services
- [ ] Implement monitoring for quota usage
- [ ] Set up alerts for approaching limits

### Monitor (Ongoing)
- [ ] Monthly: Review free tier quotas
- [ ] Quarterly: Re-evaluate pricing changes
- [ ] Annually: Benchmark against alternatives

---

## Quick Reference: Link to Main Categories

**Infrastructure:**
- [Major Cloud Providers](#major-cloud-providers)
- [IaaS](#iaas)
- [PaaS](#paas)
- [CDN and Protection](#cdn-and-protection)

**Development:**
- [Source Code Repos](#source-code-repos)
- [CI and CD](#ci-and-cd)
- [Code Quality](#code-quality)

**Data & APIs:**
- [APIs, Data and ML](#apis-data-and-ml)
- [Managed Data Services](#managed-data-services)
- [Artifact Repos](#artifact-repos)

**Operations:**
- [Monitoring](#monitoring)
- [Log Management](#log-management)
- [Crash and Exception Handling](#crash-and-exception-handling)

**Tools:**
- [Tools for Teams and Collaboration](#tools-for-teams-and-collaboration)
- [Design and UI](#design-and-ui)
- [Testing](#testing)

---

## Resources

- **Main Repository:** https://github.com/ripienaar/free-for-dev
- **Repository Size:** 1,711 lines, 50+ categories, 300+ services
- **Maintenance:** 1,600+ contributors, actively maintained
- **Contributing:** Pull requests accepted for new services or changed offerings

---

**Last Updated:** 2026-09-22  
**Maintainer:** Claude Code Session  
**Purpose:** Cost optimization reference for Neuralabs infrastructure  
**Next Review:** Quarterly or when major pricing changes occur

