# bonannidominic.me Portfolio

My personal portfolio website built with Next.js, NestJS, and PostgreSQL. Features dynamic theming, an admin CMS, and interactive components.

## Project Overview

This is my personal portfolio website that showcases my work, skills, and experiences. While the code is open source for reference and inspiration, it's primarily maintained by me for my personal use.

### Features
- Dynamic theme generation using OpenAI
- Custom CMS for content management
- Interactive project showcases
- Blog platform with rich content support
- Real-time admin notifications
- Performance metrics dashboard

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion, Radix UI
- **Backend**: NestJS, PostgreSQL, Prisma
- **Infrastructure**: Docker, DigitalOcean App Platform
- **CI/CD**: GitHub Actions

## Development Setup

### Prerequisites
- Node.js (v18 or later)
- Docker Desktop
- Git

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/bonannidominic/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Run with Docker:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Documentation
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Security Policy](docs/SECURITY.md)
- [Testing Strategy](docs/TESTING.md)

## License
This project is proprietary and confidential. The source code is provided as reference and inspiration for others building their own portfolio websites. See the [LICENSE](./LICENSE) file for details. 