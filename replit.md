# Ephaphatha Construction Website

## Overview

This is a single-page, fully responsive React website for Ephaphatha Construction (Pty) Ltd, a construction company based in Bloemfontein, South Africa. The website showcases the company's comprehensive services including general building, plumbing, fencing, borehole drilling, electrical work, painting, waterproofing, and landscaping. It features a modern, clean design with sections for hero/landing, about us, services, and a contact form for quote requests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18+ with TypeScript** - Chosen for type safety, component reusability, and modern development practices
- **Vite** - Selected as the build tool for fast Hot Module Replacement (HMR) and optimized production builds
- **Wouter** - Lightweight routing library used instead of React Router for minimal bundle size in this single-page application
- **TailwindCSS** - Utility-first CSS framework for rapid UI development and consistent design system

**UI Component System**
- **Shadcn/ui** - Headless component library built on Radix UI primitives, configured in "new-york" style
- Component architecture follows atomic design principles with reusable UI components in `client/src/components/ui/`
- Custom theming through CSS variables for colors, spacing, and typography defined in `client/src/index.css`

**State Management & Data Fetching**
- **TanStack Query (React Query)** - Handles server state management, caching, and API communication
- **React Hook Form** - Form state management with Zod validation schemas for type-safe form handling
- Custom hooks in `client/src/hooks/` for shared logic (mobile detection, toast notifications)

### Backend Architecture

**Server Framework**
- **Express.js** - Minimal Node.js web framework chosen for simplicity and flexibility
- RESTful API design with routes defined in `server/routes.ts`
- Custom middleware for request logging and JSON parsing with raw body preservation

**API Endpoints**
- `POST /api/contact` - Accepts contact form submissions, validates against Zod schema, stores in database
- `GET /api/contact` - Admin endpoint to retrieve all contact submissions

**Development vs Production**
- Development mode uses Vite middleware for HMR and dynamic module loading
- Production mode serves pre-built static assets from `dist/public/`
- Build process: Vite bundles frontend, esbuild bundles backend server code

### Data Storage & Schema

**Database**
- **PostgreSQL** via Neon serverless driver (@neondatabase/serverless)
- **Drizzle ORM** - Type-safe ORM chosen for excellent TypeScript integration and zero-runtime overhead
- Schema-first design with shared types between frontend and backend

**Database Schema** (`shared/schema.ts`)
- `users` table - Stores user credentials with UUID primary keys
- `contact_submissions` table - Stores contact form data (fullName, email, service, message, createdAt)
- Zod schemas generated from Drizzle tables ensure validation consistency across the stack

**Storage Abstraction**
- Interface-based storage layer (`IStorage`) allows swapping implementations
- `MemStorage` class provides in-memory storage for development/testing
- Database operations abstracted to support future migration to persistent PostgreSQL

### External Dependencies

**Core Libraries**
- `@neondatabase/serverless` - PostgreSQL connection for serverless environments
- `drizzle-orm` & `drizzle-kit` - Database ORM and migration toolkit
- `drizzle-zod` - Automatic Zod schema generation from Drizzle schemas

**UI & Styling**
- `@radix-ui/*` - Comprehensive set of unstyled, accessible UI primitives (30+ components)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` & `clsx` - Conditional className utilities
- `lucide-react` - Icon library for consistent iconography

**Form Handling**
- `react-hook-form` - Performant form state management
- `@hookform/resolvers` - Integration with validation libraries
- `zod` - Runtime type validation and schema definition

**Development Tools**
- `tsx` - TypeScript execution for development server
- `esbuild` - Fast JavaScript bundler for production backend
- `@replit/vite-plugin-*` - Replit-specific development enhancements (error overlay, cartographer, dev banner)

**Additional Utilities**
- `date-fns` - Date manipulation and formatting
- `embla-carousel-react` - Carousel/slider functionality
- `cmdk` - Command menu component
- `vaul` - Drawer component library

**Design Patterns**
- Separation of concerns: shared schema definitions prevent duplication
- Path aliases (`@/`, `@shared/`, `@assets/`) improve import clarity
- Type inference from database schema ensures end-to-end type safety
- Monorepo structure with client, server, and shared directories