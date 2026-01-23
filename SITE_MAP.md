# SWAPP Website Site Map & URL Structure

## 📊 Site Architecture Overview

```
swapp.church/
│
├── 🏠 Homepage (/)
│   └── index.html
│
├── ✨ Features (/features/) ⭐ NEW!
│   ├── index.html (Features Landing Page)
│   │
│   ├── /features/giving/
│   │   └── Online Giving & Donations
│   │
│   ├── /features/prayer-requests/
│   │   └── Prayer Request Management
│   │
│   ├── /features/check-ins/
│   │   └── Event Check-Ins & Attendance
│   │
│   ├── /features/outreach/
│   │   └── Outreach Tools & Tracking
│   │
│   ├── /features/mapping/
│   │   └── Mapping & Route Planning
│   │
│   ├── /features/follow-up-and-outreach/
│   │   └── Follow-Up Management
│   │
│   ├── /features/new-visitor-intake/
│   │   └── New Visitor Welcome System
│   │
│   ├── /features/volunteer-scheduling/
│   │   └── Volunteer Management
│   │
│   └── /features/group-management/
│       └── Small Group Management
│
├── 📱 Church App (/church-app/)
│   └── index.html
│
├── 📝 Blog (/blog/)
│   ├── index.html (Blog Home)
│   │
│   ├── Giving & Generosity:
│   │   ├── /blog/best-church-giving-platforms/
│   │   ├── /blog/encourage-online-giving/
│   │   └── /blog/increase-church-giving/
│   │
│   ├── Prayer & Community:
│   │   ├── /blog/building-prayer-community/
│   │   ├── /blog/church-prayer-requests-guide/
│   │   └── /blog/start-prayer-ministry/
│   │
│   ├── Events & Check-ins:
│   │   ├── /blog/church-check-in-guide/
│   │   ├── /blog/kids-ministry-check-in-security/
│   │   └── /blog/tracking-church-attendance/
│   │
│   ├── Outreach & Mapping:
│   │   ├── /blog/church-mapping-benefits/
│   │   ├── /blog/church-outreach-strategies/
│   │   ├── /blog/community-outreach-ideas/
│   │   ├── /blog/map-church-congregation/
│   │   ├── /blog/plan-church-locations/
│   │   └── /blog/track-church-outreach/
│   │
│   ├── Visitor Management:
│   │   ├── /blog/church-visitor-follow-up/
│   │   ├── /blog/church-welcome-team/
│   │   ├── /blog/pastoral-care-follow-up/
│   │   └── /blog/welcome-first-time-visitors/
│   │
│   ├── Volunteer Management:
│   │   ├── /blog/recruit-church-volunteers/
│   │   ├── /blog/reduce-volunteer-no-shows/
│   │   └── /blog/volunteer-scheduling-best-practices/
│   │
│   ├── Small Groups:
│   │   ├── /blog/grow-small-group-ministry/
│   │   ├── /blog/organize-small-groups/
│   │   └── /blog/small-group-leader-guide/
│   │
│   └── Analytics & Reports:
│       ├── /blog/essential-church-reports/
│       └── /blog/track-member-engagement/
│
├── 📧 Contact (/contact/)
│   └── index.html
│
├── 🔒 Privacy Policy (/privacy/)
│   └── index.html
│
└── 🗺️ Sitemap (/sitemap.xml)

```

## 🎯 Navigation Flow

### Main Navigation (Header)
```
Home → Features → Church App → Blog → Contact
  ↓        ↓          ↓         ↓       ↓
  /    /features/  /church-app/ /blog/ /contact/
```

### Features Section Flow
```
Homepage → Features Landing → Individual Feature Pages
    /    →    /features/    →   /features/{feature-name}/
```

### Content Hierarchy

**Level 1: Main Pages**
- `/` - Homepage
- `/features/` - Features Overview ⭐ NEW
- `/church-app/` - Church App Info
- `/blog/` - Blog Home
- `/contact/` - Contact Form

**Level 2: Feature Pages (9 total)**
- `/features/giving/`
- `/features/prayer-requests/`
- `/features/check-ins/`
- `/features/outreach/`
- `/features/mapping/`
- `/features/follow-up-and-outreach/`
- `/features/new-visitor-intake/`
- `/features/volunteer-scheduling/`
- `/features/group-management/`

**Level 2: Blog Articles (27 total)**
- Organized by topic (see tree above)

## 📈 SEO Structure

### URL Pattern
```
Clean URLs with directory-based routing:
✅ /features/giving/
✅ /blog/increase-church-giving/
❌ /features/giving.html (not used)
```

### Internal Linking Strategy
```
Homepage
  ├─→ Features Landing (NEW hub page)
  │     ├─→ Individual Feature Pages
  │     └─→ Related Blog Articles
  │
  ├─→ Blog Home
  │     └─→ Individual Articles
  │           └─→ Related Features
  │
  └─→ Church App
        └─→ Features
```

## 🎨 Page Types

1. **Landing Pages** (2)
   - Homepage (`/`)
   - Features Landing (`/features/`) ⭐ NEW

2. **Feature Pages** (9)
   - Individual feature detail pages

3. **Blog Pages** (28)
   - Blog home + 27 articles

4. **Utility Pages** (3)
   - Contact, Privacy, Church App

**Total Pages: 42**

## 🔗 Key CTAs Throughout Site

- **Start Free Trial** → `https://theswapp.io/register?referral_code=zuPaoR`
- **Phone** → `tel:6169148392`
- **Contact** → `/contact/`

## 📱 Mobile-First Design
All pages are responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

---

**Last Updated:** 2026-01-23
**Status:** ✅ All pages functional and SEO-optimized
