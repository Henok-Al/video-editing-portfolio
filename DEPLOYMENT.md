# Deployment Guide

## Deploying to Vercel

### Prerequisites

1. A GitHub/GitLab/Bitbucket account
2. A Vercel account
3. A Supabase account

### Steps

1. **Push your code to a Git repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repository-url
   git push -u origin main
   ```

2. **Create a new project on Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

3. **Configure environment variables**
   In the Vercel dashboard, go to your project settings and add these environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Deploy**
   - Vercel will automatically detect the Next.js framework
   - Click "Deploy" to start the deployment process

### Supabase Configuration

1. **Set up Supabase project**

   - Create a new project on [supabase.com](https://supabase.com)
   - Copy your project URL and anon key

2. **Run database schema**

   - In the Supabase SQL editor, run the schema from `supabase/schema.sql`

3. **Enable authentication**

   - Go to Authentication > Settings
   - Enable Email provider
   - Configure site URL to your Vercel deployment URL

4. **Create admin user**
   - Go to Authentication > Users
   - Manually create an admin user or enable signups temporarily

### Environment Variables

Make sure these environment variables are set in Vercel:

| Variable                        | Description               | Where to find it                    |
| ------------------------------- | ------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL      | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key    | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key | Supabase Dashboard > Settings > API |

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### Troubleshooting

**Authentication issues:**

- Ensure your Supabase site URL matches your Vercel deployment URL
- Check that environment variables are correctly set

**Database connection issues:**

- Verify that your Supabase credentials are correct
- Ensure the database schema has been applied

**Build errors:**

- Check the build logs in Vercel
- Ensure all dependencies are correctly installed

## Local Development vs Production

### Local Development

- Uses `.env.local` for environment variables
- Runs on `localhost:3000`

### Production

- Uses Vercel environment variables
- Runs on your Vercel deployment URL

## CI/CD

Vercel automatically deploys new changes when you push to your Git repository:

1. **Preview deployments** - Created for every pull request
2. **Production deployments** - Created when merging to the main branch

You can configure this behavior in your Vercel project settings under "Git".
