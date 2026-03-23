# Elon's Personal Website

A personal website built with React + TypeScript + Vite + Tailwind CSS + Supabase, featuring an Apple-inspired minimal design.

## Features

- **Dual Mode Access**
  - **Owner Mode**: Access via `?admin=elon19991214` to add, edit, and delete records
  - **Visitor Mode**: Any other `admin` value (e.g., `?admin=fanke`) shows a beautiful read-only view
- **Data Categories**
  - Fitness Records (date, exercise type, duration, notes)
  - Dance Records (date, dance style, duration, notes)
  - Daily Thoughts (date, content)
- **Apple-style Design**: Clean, minimal, generous whitespace, smooth animations

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase (Free Tier)

#### Step 1: Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click **Start your project** and sign up with GitHub or email

#### Step 2: Create a New Project
1. Click **New Project** in the dashboard
2. Fill in:
   - **Name**: `personal-website` (or any name you like)
   - **Database Password**: Choose a strong password (save it somewhere)
   - **Region**: Pick the closest region to you
3. Click **Create new project** and wait for it to provision (~2 minutes)

#### Step 3: Create Database Tables

Go to **SQL Editor** in the left sidebar and run the following SQL:

```sql
-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Fitness Records
create table fitness_records (
  id uuid default uuid_generate_v4() primary key,
  date date not null,
  exercise_type text not null,
  duration integer not null,
  notes text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Dance Records
create table dance_records (
  id uuid default uuid_generate_v4() primary key,
  date date not null,
  dance_style text not null,
  duration integer not null,
  notes text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Daily Thoughts
create table daily_thoughts (
  id uuid default uuid_generate_v4() primary key,
  date date not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) and allow public access
-- Note: Since we use URL parameter auth (not real auth), we allow public access
-- For a production app, you should implement proper authentication

alter table fitness_records enable row level security;
alter table dance_records enable row level security;
alter table daily_thoughts enable row level security;

-- Allow all operations for anonymous users (public access)
create policy "Allow public read" on fitness_records for select using (true);
create policy "Allow public insert" on fitness_records for insert with check (true);
create policy "Allow public update" on fitness_records for update using (true);
create policy "Allow public delete" on fitness_records for delete using (true);

create policy "Allow public read" on dance_records for select using (true);
create policy "Allow public insert" on dance_records for insert with check (true);
create policy "Allow public update" on dance_records for update using (true);
create policy "Allow public delete" on dance_records for delete using (true);

create policy "Allow public read" on daily_thoughts for select using (true);
create policy "Allow public insert" on daily_thoughts for insert with check (true);
create policy "Allow public update" on daily_thoughts for update using (true);
create policy "Allow public delete" on daily_thoughts for delete using (true);
```

#### Step 4: Get Your API Keys

1. Go to **Project Settings** > **API** in the left sidebar
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (under Project API keys)

#### Step 5: Configure Environment Variables

Edit the `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

---

## Usage

### Owner Mode (Manage Data)
Visit: `http://localhost:5173/?admin=elon19991214`

You can:
- Add new fitness/dance records and daily thoughts
- Edit existing records (hover to see edit/delete buttons)
- Delete records with confirmation

### Visitor Mode (View Only)
Visit: `http://localhost:5173/?admin=fanke` (or any other value)

Visitors see:
- Beautiful card-based data display
- Statistics summaries
- Monthly grouped timelines
- Smooth animations

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| Supabase | Cloud database (PostgreSQL) |

---

## Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder. You can deploy it to any static hosting service (Vercel, Netlify, Cloudflare Pages, etc.).

---

## Project Structure

```
src/
  components/
    admin/          # Admin CRUD forms and record lists
    visitor/        # Read-only card displays
    shared/         # Header, TabNav, Toast, ConfirmDialog
    AdminPage.tsx   # Admin dashboard page
    VisitorPage.tsx # Visitor display page
  hooks/
    useAdminMode.ts # URL parameter detection
  lib/
    supabase.ts     # Supabase client initialization
    api.ts          # CRUD operations for all tables
  types/
    index.ts        # TypeScript interfaces
  App.tsx           # Main app with mode routing
  main.tsx          # Entry point
  index.css         # Tailwind imports and custom animations
```
