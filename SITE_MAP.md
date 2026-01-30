# SWAPP Website Site Map & URL Structure

## 📊 Site Architecture Overview

```
swapp.church/
│
├── 🏠 Homepage (/)
│   └── index.html
│
├── 🎁 Free Church App (/free-church-app/) ⭐ NEW!
│   └── index.html (High-intent SEO Landing Page)
│
├── ✨ Features (/features/)
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
│   ├── ... (27+ total articles)
│
├── 📧 Contact (/contact/)
│   └── index.html
│
├── 🔒 Privacy Policy (/privacy/)
│   └── index.html
│
├── 🗺️ Sitemap (/sitemap.xml)
│
└── 🛠️ Redirects (/_redirects) ⭐ NEW!
```

## 🎯 Navigation Flow

### Main Navigation (Header)
```
Home → Features → Free Church App → Church App → Blog → Contact
  ↓        ↓              ↓               ↓         ↓       ↓
  /    /features/ /free-church-app/   /church-app/ /blog/ /contact/
```

## 📈 SEO Structure

### URL Pattern
```
Clean URLs with directory-based routing:
✅ /features/giving/
✅ /blog/increase-church-giving/
✅ /free-church-app/
```

### 301 Redirect Consolidation
All legacy URLs (from previous site versions) and name changes (e.g. `prayer-wall` → `prayer-requests`) are handled via the `/_redirects` file to preserve SEO authority and eliminate 404 errors.

## 🎨 Page Types

1. **Strategic Landing Pages** (3)
   - Homepage (`/`)
   - Features Landing (`/features/`)
   - Free Church App Landing (`/free-church-app/`) ⭐ NEW

2. **Feature Pages** (9)
   - Individual feature detail pages

3. **Blog Pages** (30+)
   - Blog home + extensive library of ministry guides

4. **Utility Pages** (3)
   - Contact, Privacy, Church App

**Total Pages: 45+**

## 🔗 Key CTAs Throughout Site

- **Start Free Trial** → `https://theswapp.io/register?referral_code=zuPaoR`
- **Phone** → `tel:6169148392`
- **Contact Form** → `/contact/`

---

**Last Updated:** 2026-01-30
**Status:** ✅ Site architecture optimized for Google Search Console indexing and technical SEO.
