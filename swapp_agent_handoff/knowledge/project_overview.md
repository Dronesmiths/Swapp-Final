# SWAPP (Soul Winning Application) - Complete Knowledge Base

## Executive Summary

**SWAPP** is a comprehensive church management platform designed for outreach-centered churches, with **1,800+ churches** currently using the system. The platform helps churches organize soul winning, manage member engagement, coordinate outreach efforts, track follow-ups, and build stronger communities through prayer and ministry coordination.

### Target Audience
- Churches focused on outreach and evangelism
- Ministry leaders and church administrators
- Church members participating in soul winning activities
- Churches managing multiple ministries, groups, and service routes

---

## System Architecture Overview

### Technology Stack

#### Backend (Node.js/Express)
- **Framework**: Express.js
- **Database**: MongoDB (hosted on MongoDB Atlas)
- **Authentication**: JWT (JSON Web Tokens) with refresh tokens
- **File Storage**: AWS S3 (for media, profiles, PDFs)
- **Payment Processing**: Stripe
- **SMS/Phone**: Twilio
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Email**: Nodemailer
- **Security**: Helmet.js, CORS, reCAPTCHA v3
- **Image Processing**: Sharp
- **PDF Generation**: jsPDF, PDFMake
- **Geocoding**: node-geocoder, Google Maps API

#### Mobile App (React Native)
- **Framework**: React Native 0.64.1
- **Navigation**: React Navigation v5
- **State Management**: Context API, AsyncStorage
- **Maps**: react-native-maps with Google Maps
- **Real-time**: Firebase Messaging
- **Networking**: Axios
- **Offline Support**: react-native-offline

#### Web Frontend (Angular)
- **Framework**: Angular 16
- **UI Libraries**: Bootstrap 4, ng-bootstrap, Ngx-Bootstrap
- **Maps**: Google Maps API (@types/googlemaps)
- **Calendar**: FullCalendar (@fullcalendar/angular)
- **Rich Text**: @kolkov/angular-editor
- **Payment**: Stripe (@stripe/stripe-js, ngx-stripe)
- **Charts**: Chart.js with chartjs-plugin-datalabels
- **Analytics**: angulartics2, angular-google-tag-manager

### Project Structure

```
swapp/
├── webapp/                    # Backend API server (Node.js/Express)
│   ├── server.js              # Entry point - starts 5 server instances
│   ├── package.json           # Backend dependencies
│   └── server/
│       ├── app.js             # Express app configuration
│       ├── config.js          # Environment configuration
│       ├── database/          # MongoDB connection and collections
│       ├── models/            # Data validation schemas (Joi)
│       ├── controllers/       # Business logic
│       ├── routes/            # API routes (v1, v2, v3)
│       ├── services/          # Service layer
│       ├── middlewares/       # Auth, language, etc.
│       ├── utils/             # Helper functions
│       └── TEST/              # Jest test files
│
├── mobile-app/                # React Native mobile app
│   ├── App.js                 # Main app component
│   ├── Navigation.js          # Screen navigation setup
│   ├── package.json           # Mobile dependencies
│   ├── screens/               # All screen components
│   ├── components/            # Reusable UI components
│   ├── ApiManager/            # API service
│   ├── axios/                 # HTTP client config
│   └── constants/             # App constants
│
├── swapp-revamp/
│   └── frontend/              # Angular web app (newer version)
│       ├── package.json       # Frontend dependencies
│       ├── proxy.conf.json    # API proxy configuration
│       └── src/
│           └── app/
│               ├── layouts/   # Page layouts (landing, admin, kiosk)
│               ├── services/  # Angular services
│               ├── models/    # TypeScript models
│               └── components/ # Reusable components
│
└── angular-webapp/            # Angular web app (legacy)
    └── src/
        └── app/
            └── layouts/       # Admin, landing pages
```

---

## Core Features & Modules

### 1. **User Management**
- **Roles**: Member, Leader, Admin
- **Authentication**: Email/phone login with OTP verification
- **Profile Management**: Photos, addresses, contact info
- **Organization Membership**: Users join churches via invite codes or referral codes
- **Permissions**: Role-based access control using AccessControl library

### 2. **Prospects Management** 
*Core feature for tracking evangelism contacts*

**Data Model:**
- Personal info (name, email, phone, address, coordinates)
- Demographic data (gender, marital status, date of birth)
- Status: Active, Inactive, Dead End, Added to Church
- Notes with timestamps (text, images, audio)
- Appointments for follow-ups
- Folder organization for categorization

**Features:**
- Add prospects via mobile app or web
- Attach notes and photos during door-to-door outreach
- QR code generation for prospects to self-register
- Share prospects between team members
- Track follow-up appointments
- Organize into folders (e.g., "Baptism Candidates", "New Contacts")
- Export to CSV
- Kiosk mode for church events

### 3. **Areas (Territory Management)**
*Map-based outreach planning*

**Data Model:**
- Name, number of doors
- Type: polyline (route) or marker (single location)
- Status: open or close
- Encoded path (Google Maps polyline)
- Overlay color (green, red, black, yellow, purple)
- Coordinates, folders
- Pins (house pins with notes)
- Check-ins (track who visited when)
- Appointments

**Features:**
- Draw territories on map using polylines
- Mark individual houses with pins
- Add notes and photos per house
- Track check-ins by date
- Schedule area appointments
- Color-code areas by status
- Organize into folders

### 4. **Service Routes**
*Planned outreach routes with optimized stops*

**Data Model:**
- Starting point, ending point (addresses + coordinates)
- Overview polyline (route visualization)
- Bounds (map boundaries)
- Stops array (ordered list of prospects to visit)
- Associated prospect_ids
- Folder organization

**Features:**
- Create routes with multiple prospect stops
- Optimize route using Google Maps Directions API
- Start/end session tracking
- Check-in/check-out at each stop
- Track service route engagements
- Timeline view of route progress

### 5. **Ministries & Groups**
*Church ministry and small group management*

**Data Model (V2):**
- Name, description, address, coordinates
- Encoded path (for ministry boundaries)
- Start/end times
- Folder organization
- Follower/member tracking
- Ministry posts (like social media)
- Likes, comments on posts
- Engagements (attendance tracking)

**Features:**
- Create and manage ministries (worship team, youth group, etc.)
- Ministry posts with text/images
- Like and comment on posts
- Join/leave ministries
- Track ministry engagement by date
- Schedule ministry events
- Organize into folders

### 6. **Prayer Requests**
*Church-wide prayer tracking*

**Data Model:**
- Prayer request text
- Requester information
- Organization affiliation
- Comments from members
- Likes (people praying)
- Date tracking

**Features:**
- Submit prayer requests
- Comment on prayers
- "Like" to indicate praying
- View all church prayers
- Get notifications for new prayers
- Activity feed

### 7. **Appointments**
*Follow-up scheduling*

**Features:**
- Schedule appointments with prospects
- Schedule area visits
- Calendar integration
- Notifications and reminders
- Appointment history

### 8. **Events & Calendar**
*Church event management*

**Features:**
- Create and manage church events
- Calendar view (FullCalendar integration)
- RSVPs (coming soon)
- Event notifications
- Integrate with ministry schedules

### 9. **Notifications**
*Multi-channel notification system*

**Channels:**
- Firebase Cloud Messaging (FCM) for push notifications
- In-app notifications
- Email notifications (Nodemailer)
- SMS notifications (Twilio)

**Types:**
- New prayer requests
- Appointment reminders
- Ministry updates
- Broadcast messages from admin
- Activity updates

### 10. **Organization Management**
*Church administration*

**Features:**
- Church profile (name, logo, contact info)
- Member management
- User permissions
- Broadcast messaging
- Statistics dashboard
- Subscription management
- Invoice generation
- Custom branding
- Referral codes for member invitations

### 11. **Subscriptions & Billing**
*Stripe-powered payment system*

**Pricing Tiers:**
- **FREE**: 0-2 Users, $0/mo
- **BASIC**: 3-20 Users, $19.99/mo
- **GOLD**: 21-150 Users, $99/mo (includes 5-page website)
- **PLATINUM**: 151+ Users, $199/mo (includes custom website)

**Features:**
- Automatic tier adjustment based on user count
- 30-day trial period
- Monthly/yearly billing
- Discount code support
- Payment source management
- Invoice history

### 12. **Activity Logs**
*Audit trail for church activities*

**Tracks:**
- Prospect additions/updates
- User actions
- Organization changes
- System events

### 13. **Kiosk Mode**
*Self-service check-in at church events*

**Features:**
- Prospect self-registration
- QR code scanning
- Check-in tracking
- Simplified UI for public use

---

## Database Collections (MongoDB)

### Core Collections
- **users**: Member profiles and authentication
- **organizations**: Church information
- **prospects**: Evangelism contacts
- **prospect_folders**: Prospect categorization
- **areas**: Territory maps
- **area_folders**: Area categorization
- **service_routes**: Planned outreach routes
- **service_route_folders**: Route organization
- **service_route_engagements**: Route tracking
- **appointments**: Scheduled follow-ups
- **prayers**: Prayer requests
- **notifications**: In-app notifications
- **fcm_notifications**: Push notification tracking
- **ministriesV2**: Ministries and groups
- **ministry_posts**: Ministry social feed
- **ministry_folders**: Ministry categorization
- **ministry_engagements**: Attendance tracking
- **activity_logs**: System audit trail
- **clients**: (Legacy feature - possibly related to contracts/waivers)
- **locations**: Geographic data
- **versions**: App version tracking for updates

### Authentication Collections
- **signup_tokens**: Email verification tokens
- **login_tokens**: OTP codes
- **forgot_tokens**: Password reset tokens
- **jwt_tokens**: Active JWT sessions
- **change_email_token**: Email change verification

---

## API Structure

### Base URL Pattern
```
/api/v[version]/[resource]/[action]
```

### API Versions
- **v1**: Legacy API (deprecated with error middleware)
- **v2**: Legacy API (deprecated with error middleware)
- **v3**: Current active API

### Key Endpoints (from mobile-app README)

#### Authentication
- `POST /auth/access-token` - Refresh access token

#### Users
- `GET /users` - Get user profile
- `PUT /users` - Update user
- `GET /users/all` - Get all organization users
- `GET /users/statistics/` - User statistics
- `GET /users/login/email` - Email login
- `GET /users/login/phone` - Phone login
- `POST /users/verify/phone` - Verify phone OTP
- `POST /users/join` - Join organization
- `POST /users/signup` - Register new user
- `POST /users/password/change` - Change password
- `POST /users/password/forgot` - Request password reset
- `DELETE /users/account` - Delete account
- `DELETE /users/profile` - Delete profile

#### Organizations
- `GET /organisations` - Get organization details
- `PUT /organisations` - Update organization
- `GET /organisations/search` - Search organizations

#### Prospects
- `GET /prospects` - Get prospects
- `POST /prospects` - Add prospect
- `PUT /prospects` - Update prospect
- `DELETE /prospects` - Delete prospect
- `GET /prospects/all` - All prospects for member
- `GET /prospects/admin` - Admin view (paginated)
- `GET /prospects/admin/paginated` - Paginated admin list
- `GET /prospects/folders/admin/paginated` - Folder prospects
- `GET /prospects/folders/all` - All prospect folders
- `POST /prospects/appointments` - Share contacts/set appointments
- `GET /prospects/appointments/user` - User appointments

#### Areas
- `GET /areas` - Get area by ID
- `GET /areas/member` - Get all areas for member
- `GET /areas/folders/all` - Get area categories
- `GET /areas/folders/member` - Areas for category
- `POST /areas/checkins` - Check-in to area
- `PUT /areas/checkins` - Update check-in
- `POST /areas/pins` - Drop house pin
- `GET /areas/appointments/user` - Area appointments

#### Service Routes
- `GET /service_routes` - Route details
- `GET /service_routes/all` - All routes for user
- `GET /service_routes/folders` - Routes list for folder
- `GET /service_routes/folders/all/users` - Router folders
- `POST /service_routes/start` - Start route session
- `POST /service_routes/end` - End route session
- `PUT /service_routes/checkin` - Check in stop
- `PUT /service_routes/checkout` - Check out stop

#### Ministries (V2)
- `GET /social-ministries/all` - All ministries
- `GET /social-ministries/all/_ids` - Joined ministries
- `GET /social-ministries/followers/all` - Ministry users
- `PUT /social-ministries/join` - Join ministry
- `PUT /social-ministries/leave` - Leave ministry
- `GET /social-ministries/posts` - Ministry post
- `GET /social-ministries/posts/all` - All ministry posts
- `POST /social-ministries/posts` - Create post
- `POST /social-ministries/posts/likes` - Like post
- `GET /social-ministries/posts/comments/all` - All comments
- `POST /social-ministries/posts/comments` - Add comment

#### Prayers
- `GET /prayers` - Get prayers
- `POST /prayers` - Add prayer
- `DELETE /prayers` - Delete prayer
- `GET /prayers/comments/all` - All comments
- `POST /prayers/comments` - Add comment
- `DELETE /prayers/comments` - Delete comment
- `POST /prayers/likes` - Like prayer
- `DELETE /prayers/likes` - Unlike prayer

#### Notifications
- `GET /fcm-notifications/all` - All notifications

#### Misc
- `GET /ping` - Health check with version info

---

## Server Configuration

### Multiple Server Instances
The backend runs on **5 concurrent ports** for load distribution:
- PORT_1: 8080
- PORT_2: 8081
- PORT_3: 8082
- PORT_4: 8083
- PORT_5: 8084

### CORS Configuration
Allowed origins:
- https://theswapp.io
- https://www.theswapp.io
- http://localhost:4200
- http://localhost:3001
- http://localhost:8080

### Environment Variables (from config.js)
Key configuration includes:
- MongoDB connection string (Atlas cluster)
- AWS S3 credentials (bucket: "theswapp")
- Stripe API keys (test and production)
- Google Maps API key
- Twilio credentials
- JWT secrets
- reCAPTCHA keys

---

## Mobile App Architecture

### Navigation Stack
- **FirstScreen**: Onboarding/intro
- **Auth Stack**: Login, SignUp, ForgotPassword, OTP
- **Main Stack**: Dashboard and all authenticated screens
- **Home Stack**: Tab-based navigation within dashboard

### Key Screens
- **Dashboard**: Main hub with stats and quick actions
- **ProspectList**: Browse and search prospects
- **AddProspect**: Form to add new prospect
- **ProspectNotes**: View/add notes for prospect
- **EditProspect**: Update prospect details
- **Area/AreaList**: View territories on map
- **Map**: Map view with pins and routes
- **ServiceRoutes**: Route planning and execution
- **Prayers**: Prayer request feed
- **MinistryList/MinistryDetails**: Ministry management
- **Appointments**: Scheduled follow-ups
- **Profile/EditProfile**: User settings
- **Leaderboard**: Gamification/stats

### Offline Support
- Local storage using AsyncStorage
- Network status detection
- Queue actions when offline
- Sync when connection restored

### Push Notifications
Firebase Cloud Messaging integration:
- Foreground: Shows in-app banner
- Background: System notification
- Deep linking to relevant screens

---

## Web Frontend Architecture (Angular)

### Main Layouts
1. **Landing Page** (`LandingPageComponent`)
   - Marketing site
   - Sign-up/login modals
   - About, Terms, Privacy pages
   - QR prospect registration

2. **Admin Layout** (`AdminComponent`)
   - Main dashboard
   - Full feature access for church admin
   - Lazy-loaded admin module
   - Protected by `AuthGuard`

3. **Kiosk Layout**
   - Public-facing check-in interface
   - Simplified prospect registration
   - Event check-ins

### Key Admin Modules
- **dashboard-v2**: Main admin dashboard
- **prospects**: Prospect management with list/map views
- **area**: Territory management
- **map** / **new-map**: Interactive map interfaces
- **ministry-list**: Ministry management
- **service-routes**: Route planning
- **event**: Event management
- **calender-event**: Calendar view
- **user-profile**: Profile settings
- **subscription**: Billing management
- **planning-center**: Integration (possibly with Planning Center Online)
- **track-progress**: Analytics and reporting

### Folder Settings Modules
- **prospect-folder-settings**: Organize prospect categories
- **map-folder-settings**: Organize territories
- **ministry-folder-settings**: Organize ministries

---

## Authentication & Authorization

### JWT Token System
1. **Access Token**: Short-lived (expires quickly)
2. **Refresh Token**: Long-lived (stored in jwt_tokens collection)
3. Token refresh endpoint: `/auth/access-token`

### User Roles
- **Member**: Basic church member, can add prospects, join ministries
- **Leader**: Can manage team members, view analytics
- **Admin**: Full organization control, billing, settings

### Permission System
Uses AccessControl library (@casl/ability) for fine-grained permissions:
- Resource-based permissions (prospects, areas, ministries)
- Action-based (create, read, update, delete)
- Conditional access based on ownership

---

## Data Validation (Joi Schemas)

All API inputs validated using Joi schemas located in `/server/models/`:
- User registration: email format, password strength (8+ chars, uppercase, lowercase, number)
- Prospect data: required fields, date formats (unix timestamp)
- Area data: coordinates, polyline encoding
- MongoDB ObjectId validation using regex: `/^[0-9a-fA-F]{24}$/`

---

## File Upload & Storage

### AWS S3 Integration
- Bucket: "theswapp"
- Region: us-west-2
- Max image size: 5MB
- Allowed formats: JPG, JPEG, PNG, PDF
- Uses `sharp` for image optimization
- Multer middleware for file handling

### Upload Endpoints
- `/api/v1/organizations/logo` - Organization logo
- `/api/v1/users/profile` - User profile photo
- Prospect notes can include images
- Ministry posts support images

---

## Third-Party Integrations

### Google Maps
- Map rendering (web and mobile)
- Geocoding (address ↔ coordinates)
- Directions API for route optimization
- Polyline encoding for territory boundaries
- Places Autocomplete for address input

### Stripe
- Subscription management
- Payment source storage
- Invoice generation
- Webhook handling for subscription events
- Discount/coupon codes

### Twilio
- SMS for OTP verification
- Phone number validation
- International phone support

### Firebase
- Cloud Messaging (FCM) for push notifications
- Firebase Admin SDK for server-side operations

### Planning Center (Integration in progress)
- Endpoints exist for Planning Center API
- Likely for member sync/import

---

## Testing

### Backend Tests
- Framework: Jest
- Config: `/server/TEST/jest.config.js`
- Command: `npm run test-server`
- Uses `supertest` for HTTP testing
- Uses `chai` for assertions

### Frontend Tests
- Framework: Karma + Jasmine (Angular standard)
- E2E: Protractor
- Command: `npm test`

---

## Development Workflow

### Getting Started Locally

#### 1. Backend Setup
```bash
cd webapp
npm install
# Configure server/config.js with local MongoDB or use existing Atlas connection
npm start
```
Server will start on ports 8080-8084.

#### 2. Web Frontend Setup (Angular - swapp-revamp)
```bash
cd swapp-revamp/frontend
npm install
npm start  # Runs on localhost:4200 with proxy to backend
```

#### 3. Mobile App Setup
```bash
cd mobile-app
npm install

# iOS (requires macOS)
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

### Proxy Configuration
The Angular app uses `proxy.conf.json` to forward API calls:
- Local development: `/api` → `http://localhost:8080/api`
- Avoids CORS issues during development

---

## Deployment Architecture

### Backend
- Multiple server instances (load balanced)
- MongoDB Atlas (cloud database)
- AWS S3 for file storage
- Environment-based configuration

### Frontend
- Hosted at https://theswapp.io
- Angular production build
- Static assets on S3 or CDN

### Mobile Apps
- iOS: App Store
- Android: Google Play Store
- Deep linking scheme configured
- Version checking via `/ping` endpoint

---

## Business Model

### Pricing Strategy
Automatically adjusts based on active user count:
- **Growth-friendly**: Start free, pay as you grow
- **No user limits**: Just different pricing tiers
- **Value-added**: Higher tiers include website and strategy support

### Revenue Streams
1. Monthly subscriptions ($19.99 - $199/mo)
2. Annual subscriptions (discounted)
3. Potential custom enterprise plans

---

## Key Business Metrics

### Current Status
- **1,800+ churches** using SWAPP
- Multi-tenant SaaS architecture
- International phone support (via google-libphonenumber)
- Multi-language support (language middleware present)

### Success Metrics (Tracked)
- User statistics per organization
- Check-in statistics
- Prospect conversion rates
- Ministry engagement rates
- Active user counts (affects subscription tier)

---

## Known Issues & Technical Debt

### From note.txt
- Bug in user delete within organization (needs fixing)

### Observations
- Two Angular frontends exist (swapp-revamp/frontend and angular-webapp)
  - Likely migration in progress or different use cases
  - Investigate which is primary
- API versioning: v1 and v2 are deprecated with error middleware
  - All new development should use v3
- Multiple similar controllers (e.g., ministryController vs v2/ministryController)
  - Code duplication to address

---

## Future Development Considerations

### Planned Features
- **RSVPs for Events** (marked "Coming Soon" on website)
- Possibly enhanced Planning Center integration

### Recommended Improvements
1. **Code Consolidation**: Merge or clarify purpose of dual Angular apps
2. **API Documentation**: Generate OpenAPI/Swagger docs from routes
3. **Automated Testing**: Expand test coverage (currently limited)
4. **Error Handling**: Standardize error response format across API versions
5. **Logging**: Implement structured logging (Winston, Bunyan)
6. **Monitoring**: Add APM (Application Performance Monitoring)
7. **Caching**: Implement Redis for frequently accessed data
8. **Rate Limiting**: Protect API from abuse
9. **Database Indexing**: Optimize queries with proper indexes
10. **Migration Scripts**: Version database schema changes

---

## Development Best Practices for Non-Developers

### When Adding New Features
1. **Model First**: Define data structure in `/server/models/` with Joi validation
2. **Controller Logic**: Add business logic in `/server/controllers/`
3. **Routes**: Expose via `/server/routes/v3/`
4. **Frontend**: Create Angular components/services or React Native screens
5. **Test**: Write Jest tests for backend, Karma tests for frontend

### Code Standards
- **Backend**: Follow existing patterns in controllers
  - Always validate input with Joi
  - Use try-catch for error handling
  - Return consistent response format: `{ status: boolean, message: string, data: object }`
- **Frontend (Angular)**: Follow Angular style guide
  - Use services for API calls
  - Use reactive forms for validation
  - Use TypeScript interfaces for type safety
- **Mobile**: Follow React Native best practices
  - Use functional components with hooks
  - Keep business logic in services (ApiManager)
  - Use constants for config values

### Database Operations
- Always use ObjectId for MongoDB _id fields
- Use unix timestamps for dates (Math.floor(Date.now() / 1000))
- Add `date_added` and `date_updated` to all documents
- Use meaningful collection names (plural, snake_case)

### Security Considerations
- Never commit credentials (use environment variables)
- Always validate and sanitize user input
- Use parameterized queries (MongoDB already does this)
- Implement rate limiting on auth endpoints
- Hash passwords (existing system does this)
- Validate JWT tokens on protected routes

---

## Support & Documentation

### User-Facing Resources
- Marketing site: https://thesoulwinningapp.com
- Help Center: https://thesoulwinningapp.com/help
- Email support: admin@theswapp.io

### Developer Resources
- This knowledge base document
- Code comments in controllers and models
- API endpoints list in mobile-app README
- Jest tests for behavior examples

---

## Glossary

- **Prospect**: A person contacted during evangelism/outreach efforts
- **Area**: A geographic territory marked for outreach (polyline or marker)
- **Service Route**: A planned route visiting multiple prospects in sequence
- **Ministry**: A church group or team (worship, youth, etc.)
- **Check-in**: Recording presence at an area or service route stop
- **Pin**: A marker on a house within an area (house pin)
- **Folder**: A category for organizing prospects, areas, ministries, or routes
- **Soul Winning**: Christian evangelism/outreach activities
- **Kiosk Mode**: Self-service interface for public use at church events
- **Organization**: A church using the SWAPP platform
- **Member**: A user within an organization

---

## Contact & Next Steps

### For Feature Development
1. Review this knowledge base
2. Identify the module related to your feature
3. Study existing similar features in the codebase
4. Plan data model changes (if any)
5. Implement backend → frontend → mobile (or as needed)
6. Test thoroughly
7. Deploy incrementally

### Questions to Clarify
1. Which Angular frontend is primary? (swapp-revamp vs angular-webapp)
2. What's the migration plan for v1/v2 API clients?
3. Are there any planned major architectural changes?
4. What's the deployment process? (CI/CD pipeline?)
5. Are there staging/development environments?

---

*Last Updated: January 8, 2026*
*Version: 1.0*
*Compiled by: AI Assistant based on codebase analysis*
