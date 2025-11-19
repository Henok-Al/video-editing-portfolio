# Video Editing Portfolio with Admin Dashboard

A modern video editing portfolio website with a protected admin panel for managing projects.

## Features

- **Public Portfolio**: Showcase video editing projects with a modern UI
- **Admin Dashboard**: Protected admin panel for managing projects
- **Project Management**: Add, edit, delete, and reorder projects
- **YouTube Integration**: Auto-extract YouTube IDs and fetch thumbnails
- **Supabase Backend**: Database storage with authentication
- **Responsive Design**: Works on all device sizes
- **Animations**: Smooth animations with Framer Motion

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database & Authentication)
- Framer Motion (Animations)
- Server Actions (Admin operations)

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Supabase Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase/schema.sql` in the Supabase SQL editor
3. Set up authentication (email/password provider)
4. Create a service role key in Supabase settings

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

## Database Schema

The database schema is defined in `supabase/schema.sql`:

- `projects` table with fields for title, YouTube ID, thumbnail, description, etc.
- Row Level Security (RLS) policies
- Indexes for performance

## Admin Panel

Access the admin panel at `/admin`:

- Login with Supabase authentication
- Add new projects with YouTube URL
- Edit existing projects
- Delete projects
- Reorder projects
- Toggle visibility (draft/published/unlisted)

## Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Connect Vercel to your repository
3. Add environment variables in Vercel dashboard
4. Deploy!

## Folder Structure

```
app/
  ├── actions/           # Server actions for admin operations
  ├── admin/             # Admin dashboard pages
  ├── api/               # API routes
  ├── components/        # Reusable components
  │   ├── admin/         # Admin-specific components
  │   └── ...            # Other components
  ├── lib/               # Utility functions and Supabase clients
  ├── login/             # Login page
  ├── types/             # TypeScript types
  └── ...                # Other pages
supabase/
  └── schema.sql         # Database schema
```

## Key Components

- **Hero**: Main landing page hero section
- **ProjectCard**: Individual project display card
- **ProjectModal**: Detailed project view modal
- **BeforeAfterSlider**: Color grading comparison slider
- **AdminForm**: Form for adding/editing projects
- **ProjectList**: List of projects in admin panel

## Animations

All animations use Framer Motion:

- Hero entrance text
- Staggered grid reveal
- Hover depth effect on cards
- Modal open/close transitions
- Smooth fade-ins
