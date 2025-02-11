# System Architecture

## Frontend Architecture

### Directory Structure
```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout with common elements
│   │   ├── page.tsx        # Homepage
│   │   ├── not-found.tsx   # Custom 404 page with themes
│   │   └── globals.css     # Global styles and animations
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Layout components
│   │   │   ├── Header.tsx  # Site header/navigation
│   │   │   └── Footer.tsx  # Site footer
│   │   └── home/          # Homepage components
│   │       ├── Hero.tsx   # Hero section with stats
│   │       ├── About.tsx  # About section
│   │       ├── Projects.tsx # Projects showcase
│   │       └── Contact.tsx # Contact form
│   └── lib/               # Utility functions and shared logic
├── scripts/              # Build and development scripts
├── public/              # Static assets
├── config/             # Configuration files
│   ├── next.config.js  # Next.js configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── postcss.config.js # PostCSS configuration
│   └── tsconfig.json  # TypeScript configuration
└── package.json       # Dependencies and scripts

backend/
├── src/
│   ├── app.module.ts     # Root application module
│   ├── projects/        # Projects feature module
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   ├── projects.module.ts
│   │   └── dto/        # Data Transfer Objects
│   └── main.ts         # Application entry point
├── prisma/            # Database schema and migrations
│   ├── schema.prisma  # Prisma schema
│   └── seed.ts       # Database seeding
├── test/             # Test files
├── config/          # Configuration files
│   ├── tsconfig.json
│   ├── .eslintrc.js
│   └── .prettierrc
└── package.json     # Dependencies and scripts
```

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Components**: Custom components with Radix UI primitives
- **Animation**: Framer Motion with custom transitions
- **State Management**: React Context for theming
- **Testing**: Jest with React Testing Library

### Key Features
- Server-side rendering for optimal performance
- Responsive design with Tailwind CSS
- Dynamic theme system with 5 variations for 404 page
- Custom animations (glitch effect, transitions)
- Enhanced metadata and SEO optimization
- Type-safe development with TypeScript
- Component-based architecture
- Automated testing setup

### Performance Optimizations
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS purging with Tailwind
- Custom scrollbar optimization
- Caching strategies
- Static page generation where applicable

## Overview
The portfolio website is built using a modern microservices architecture, with clear separation between frontend and backend services.

## System Components

### Frontend (Next.js)
- **Pages**: Server-side rendered React components
- **Components**: Reusable UI components built with Radix UI
- **State Management**: React Context for theming and user preferences
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion for smooth transitions

### Backend (NestJS)
- **API Layer**: RESTful endpoints with OpenAPI documentation
- **Services Layer**: Business logic implementation
- **Data Access Layer**: 
  - Prisma ORM for database operations
  - Type-safe database queries
  - Automatic migrations
  - Database seeding support
- **Caching Layer**: Redis for performance optimization
- **Authentication**: JWT-based auth system

### Database
- **Primary Database**: PostgreSQL for persistent storage
- **Schema Design**: 
  - Projects
    - id: UUID
    - title: String
    - description: String
    - technologies: String[]
    - imageUrl: String
    - githubUrl: String?
    - liveUrl: String?
    - featured: Boolean
    - order: Int
    - createdAt: DateTime
    - updatedAt: DateTime
  - Blog Posts (planned)
  - Admin Settings (planned)
  - Theme Configurations (planned)
  - Analytics Data (planned)

### Infrastructure
- **Container Orchestration**: Docker with docker-compose
- **Hosting**: DigitalOcean App Platform
- **CI/CD**: GitHub Actions
- **Monitoring**: DigitalOcean built-in metrics

## Security Measures
- HTTPS enforcement
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- CORS configuration
- Environment variable encryption

## Performance Optimizations
- Redis caching
- Image optimization
- Code splitting
- CDN integration
- Lazy loading
- Service worker implementation

## Deployment Strategy
- Blue-green deployment
- Automated rollbacks
- Database migrations
- Environment-specific configurations

## Component Documentation

### Layout Components

#### Header (`components/layout/Header.tsx`)
- **Purpose**: Main navigation component with responsive design
- **Features**:
  - Responsive navigation menu
  - Dark/Light theme toggle
  - Smooth scroll navigation
  - Mobile hamburger menu
  - Dynamic active link highlighting
- **State Management**:
  - Theme context for dark/light mode
  - Mobile menu state
- **Animations**:
  - Menu transition effects
  - Theme switch animation
  - Scroll-triggered transparency

### Homepage Components

#### Hero Section (`components/home/Hero.tsx`)
- **Purpose**: Landing section with personal introduction
- **Features**:
  - Dynamic typewriter effect
  - Glowing card animations
  - Experience and project stats
  - Social media links
  - Animated CTA buttons
- **Animations**:
  - Typewriter text animation
  - Scroll-triggered parallax
  - Hover effects on cards
  - Button interaction animations
- **State Management**:
  - Typewriter state
  - Animation states

#### Projects Section (`components/home/Projects.tsx`)
- **Purpose**: Showcase featured projects
- **Features**:
  - Project card carousel
  - Filtering system
  - Project details modal
  - GitHub and live demo links
  - Technology tags
- **Animations**:
  - Card hover effects
  - Smooth transitions
  - Modal animations
  - Loading states
- **Data Integration**:
  - Fetches project data from API
  - Handles loading and error states

#### Contact Section (`components/home/Contact.tsx`)
- **Purpose**: Contact form and social links
- **Features**:
  - Responsive contact form
  - Form validation
  - Social media links
  - CV download button
  - Success/Error notifications
- **Animations**:
  - Form submission states
  - Button hover effects
  - Social link interactions
- **Form Handling**:
  - Input validation
  - Error handling
  - Success feedback

#### About Section (`components/home/About.tsx`)
- **Purpose**: Personal information and skills
- **Features**:
  - Skill showcase
  - Timeline component
  - Personal introduction
  - Technology stack display
- **Animations**:
  - Scroll-triggered reveals
  - Skill bar animations
  - Timeline progression

## API Documentation

### Projects API

#### List Projects
```typescript
GET /api/projects
```
- **Purpose**: Retrieve list of projects
- **Query Parameters**:
  - `page`: number (optional) - Page number for pagination
  - `limit`: number (optional) - Items per page
  - `featured`: boolean (optional) - Filter featured projects
  - `search`: string (optional) - Search projects by title/description
- **Response**:
  ```typescript
  {
    data: {
      id: string;
      title: string;
      description: string;
      technologies: string[];
      imageUrl: string;
      githubUrl?: string;
      liveUrl?: string;
      featured: boolean;
      order: number;
      createdAt: string;
      updatedAt: string;
    }[];
    meta: {
      total: number;
      page: number;
      lastPage: number;
    }
  }
  ```

#### Get Project
```typescript
GET /api/projects/:id
```
- **Purpose**: Retrieve single project details
- **Parameters**:
  - `id`: string - Project UUID
- **Response**: Project object

#### Create Project
```typescript
POST /api/projects
```
- **Purpose**: Create new project
- **Body**:
  ```typescript
  {
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    order?: number;
  }
  ```
- **Response**: Created project object

#### Update Project
```typescript
PATCH /api/projects/:id
```
- **Purpose**: Update existing project
- **Parameters**:
  - `id`: string - Project UUID
- **Body**: Partial project object
- **Response**: Updated project object

#### Delete Project
```typescript
DELETE /api/projects/:id
```
- **Purpose**: Delete project
- **Parameters**:
  - `id`: string - Project UUID
- **Response**: Success message

### Error Responses
All endpoints may return the following errors:
```typescript
{
  statusCode: number;
  message: string;
  error: string;
}
```
- 400: Bad Request - Invalid input
- 401: Unauthorized - Authentication required
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource not found
- 500: Internal Server Error 