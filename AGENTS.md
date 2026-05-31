# AGENTS.md — Vishwas Tiwari Portfolio

This document orients AI coding agents to the **Vishwas-tiwari-web** repository. Read it before making changes.

---

## What this project is

**Vishwas Tiwari Portfolio** is a personal portfolio website showcasing the work and experience of Vishwas Tiwari, an AI/ML & Backend Engineer. The site presents professional experience, technical skills, projects, education, and contact information in a modern, interactive format.

This repo is **frontend-only**. There is no backend, API layer, or database. All content is static data defined in component files.

**Key focus areas:**

- AI/ML and Backend Engineering specialization
- Professional experience at TestDino and Alphabin Technologies
- Technical skills across AI, backend, data science, and DevOps
- Project portfolio and educational background
- Modern, accessible UI with smooth animations

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + CSS variables |
| UI Components | shadcn/ui |
| Icons | `lucide-react` |
| Animations | `framer-motion` |
| Routing | React Router v6 |
| Package Manager | npm |

---

## Commands

```bash
npm install
npm run dev       # local dev server (Vite HMR)
npm run build     # TypeScript + Vite build → dist/
npm run preview   # serve production build
npm run lint      # ESLint
```

---

## Repository layout

```
Vishwas-tiwari-web/
├── AGENTS.md                 # This file
├── index.html                # Entry HTML
├── public/
│   ├── Resume/              # Resume PDF and logos
│   ├── fonts/               # Custom fonts
│   ├── images/              # Static images
│   └── vishwas-portrait.png # Profile photo
├── src/
│   ├── main.tsx             # React root mount
│   ├── App.tsx              # Main app with routing
│   ├── index.css            # Global styles + Tailwind + CSS variables
│   ├── components/          # React components
│   │   ├── About.tsx
│   │   ├── Hero.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Contact.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ui/             # shadcn/ui components
│   ├── pages/              # Page components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   └── lib/                # Utilities
└── tailwind.config.ts      # Tailwind configuration
```

---

## Architecture

### Routing

Uses **React Router v6** for navigation:

- `/` — Home page (Index.tsx)
- `/portfolio` — Full portfolio view
- `*` — 404 page

### Component Structure

**Main sections (in order):**

1. **Hero** — Name, title, summary, CTA buttons, social links
2. **About** — Profile card, personal profile, mission statement
3. **Experience** — Professional work history with timeline
4. **Skills** — Technical capabilities organized by category
5. **Projects** — Portfolio showcase
6. **Education** — Academic background
7. **Contact** — Contact form and information

### Design System

**Color Scheme:**
- Cherry red theme (`--primary: 352 82% 51%`)
- Dark background (`--background: 350 14% 5%`)
- Muted foreground for text (`--muted-foreground`)

**Typography:**
- **Geist Sans** — Primary font for body and headings
- **Svetze** — Display font for special headings

**Key Design Principles:**
- Dark theme with cherry red accents
- Glass-morphism effects (`card-hover` class)
- Smooth animations with framer-motion
- Responsive design (mobile-first)
- Accessibility-compliant

---

## Key Components

### Hero Component

**Location:** `src/components/Hero.tsx`

**Features:**
- Animated name with letter-by-letter reveal
- Professional title and summary
- Download Resume button
- View Projects button
- Social links (GitHub, LinkedIn)
- Scroll to explore button

**Important:**
- Summary highlights AI/ML and Backend focus
- Resume downloads from `/Resume/Vishwas Tiwari CV June 2026.pdf`
- Uses `useIntroOptional` context for animation timing

### About Component

**Location:** `src/components/About.tsx`

**Structure:**
- 3-column grid (portrait, profile, removed quick facts)
- Profile card with photo and role badges
- Personal profile with description
- Mission statement card

**Key Points:**
- No `.eyebrow` above section titles
- Left-aligned section headers
- Emphasizes adaptability and versatility

### Experience Component

**Location:** `src/components/Experience.tsx`

**Features:**
- Timeline layout (centered on mobile, left-aligned on desktop)
- Two positions:
  1. AI/ML & Backend Engineer at TestDino (May 2026 - Present)
  2. Data Science Intern at Alphabin Technologies (Aug 2025 - April 2026)
- Company info cards with website links
- Key responsibilities listed
- No Technologies or Highlights sections

**Mobile Timeline:**
- Centered vertical line
- Icons centered above cards
- More breathing room

**Desktop Timeline:**
- Left-aligned rail
- Icons on the left side
- Traditional timeline layout

### Skills Component

**Location:** `src/components/Skills.tsx`

**Categories:**
1. Languages (Python, Java, HTML/CSS, JavaScript)
2. Data Science (Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn)
3. Development Tools (Git & GitHub, VS Code, Jupyter Lab, Google Colab, CI/CD Pipelines)
4. Office & Productivity
5. Databases (MySQL, MongoDB)
6. Soft Skills

**Layout:**
- Left-aligned section headers
- 3-column grid on desktop
- Card-based layout with icons

---

## Styling Conventions

### CSS Variables (index.css)

```css
--primary: 352 82% 51%;        /* Cherry red */
--background: 350 14% 5%;      /* Dark background */
--foreground: 350 12% 96%;     /* Light text */
--muted-foreground: 350 10% 60%; /* Muted text */
```

### Key Tailwind Classes

- `card-hover` — Glass-morphism card with hover effects
- `section-band` / `section-band-alt` — Section backgrounds
- `section-container` — Max-width container with padding
- `section-eyebrow` — Small uppercase label
- `section-title` — Main section heading
- `section-desc` — Section description
- `text-primary` — Cherry red text
- `link-cyan` — Styled link with hover

### Component Patterns

**Section Headers:**
```tsx
<p className="section-eyebrow text-left">Label</p>
<h2 className="section-title text-left block">Title</h2>
<p className="section-desc text-left mx-0 mb-14">Description</p>
```

**Cards:**
```tsx
<Card className="card-hover border-0">
  <CardContent className="p-6 md:p-8">
    {/* Content */}
  </CardContent>
</Card>
```

---

## Content Guidelines

### Professional Summary

**Current focus:** AI/ML and Backend systems

**Key themes:**
- Adaptability across the tech stack
- Building with AI models and backend flows
- Automation, testing, and deployment
- NLP and technology integration
- Continuous learning and exploration

### Experience Descriptions

**TestDino (Current):**
- AI product development
- LLM integrations
- Backend infrastructure
- MCP-based AI systems
- Distributed backend flows

**Alphabin Technologies (Completed):**
- Machine Learning and NLP
- LLM evaluation and testing
- Text classification and clustering
- AI workflow automation

### Tone and Voice

- Professional but approachable
- Technical but accessible
- Emphasizes versatility and adaptability
- Action-oriented (building, exploring, turning ideas into reality)
- No em dashes (use periods or commas)

---

## Coding Guidelines

### Do

- Use TypeScript with proper typing
- Follow existing component patterns
- Use Tailwind classes for styling
- Implement responsive design (mobile-first)
- Use framer-motion for animations
- Keep components modular and reusable
- Use shadcn/ui components when available
- Left-align section headers
- Highlight "AI/ML and Backend" in red (`text-primary font-semibold`)

### Avoid

- Using em dashes (—) in copy
- Center-aligning section headers
- Adding `.eyebrow` above main section titles
- Hardcoding colors (use CSS variables)
- Inline styles (use Tailwind)
- Breaking responsive layouts
- Adding unnecessary dependencies
- Committing secrets or sensitive data

### TypeScript

- Strict mode enabled
- Define interfaces for component props
- Use proper typing for data structures
- No `any` types unless absolutely necessary

---

## Data Management

### Experience Data

Defined in `Experience.tsx` as an array of `ExperienceEntry` objects:

```typescript
type ExperienceEntry = {
  position: string;
  company: string;
  period: string;
  location: string;
  status: string;
  description: string;
  responsibilities: string[];
  companyInfo: {
    industry: string;
    size: string;
    focus: string;
    description: string;
    website: string;
  };
  logoSrc?: string;
  logoAlt?: string;
};
```

### Skills Data

Organized by category with icons and descriptions.

### Projects Data

Stored in `Projects.tsx` component.

---

## Resume Download

**Implementation:** `src/lib/resumeDownload.ts`

**File location:** `/public/Resume/Vishwas Tiwari CV June 2026.pdf`

**Download name:** `Vishwas_Tiwari_CV_June_2026.pdf`

**Behavior:**
1. Fetches PDF from public folder
2. Creates blob and download link
3. Triggers download
4. Fallback: opens in new tab if download fails

---

## Responsive Design

### Breakpoints

- Mobile: `< 640px` (sm)
- Tablet: `640px - 768px` (md)
- Desktop: `768px - 1024px` (lg)
- Large: `> 1024px` (xl)

### Mobile Considerations

- Centered timeline in Experience section
- Stacked layouts for cards
- Reduced padding and margins
- Touch-friendly button sizes
- Readable font sizes

---

## Animation Patterns

### Framer Motion

Used for:
- Hero letter-by-letter animation
- Section reveal animations
- Card hover effects
- Scroll-triggered animations

### Reveal Component

**Location:** `src/components/motion/Reveal.tsx`

Wraps content for scroll-triggered fade-in animations.

---

## Assets

### Images

- `/public/vishwas-portrait.png` — Profile photo
- `/public/Resume/download (1).png` — TestDino logo
- `/public/lovable-uploads/OIP.jpeg` — Alphabin logo

### Fonts

- Geist Sans (imported from @fontsource)
- Svetze (custom font in `/public/fonts/`)

---

## Common Tasks

### Update Experience

1. Edit `src/components/Experience.tsx`
2. Update `experienceData` array
3. Ensure company logo exists in `/public/`
4. Update website links in `companyInfo`

### Add New Skill

1. Edit `src/components/Skills.tsx`
2. Add to appropriate category array
3. Include icon from `lucide-react` or `react-icons`

### Update Resume

1. Replace PDF in `/public/Resume/`
2. Update filename in `src/lib/resumeDownload.ts`
3. Update download name if needed

### Modify Color Scheme

1. Edit CSS variables in `src/index.css`
2. Update Tailwind config if needed
3. Test all components for contrast

---

## Summary

| Question | Answer |
|----------|--------|
| What is it? | Personal portfolio website for AI/ML & Backend Engineer |
| Backend? | None (static frontend) |
| Router? | React Router v6 |
| Styling? | Tailwind CSS + CSS variables |
| Main focus? | AI/ML and Backend Engineering |
| Current role? | AI/ML & Backend Engineer at TestDino |
| Key sections? | Hero, About, Experience, Skills, Projects, Education, Contact |
| Color theme? | Cherry red on dark background |
| Responsive? | Yes, mobile-first design |

When in doubt, check existing components for patterns, use Tailwind for styling, and maintain the professional yet approachable tone throughout.
