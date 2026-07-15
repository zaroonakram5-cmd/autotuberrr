# AutoShorts AI - Automated Faceless Video Creation Platform

A complete, production-ready clone of autoshorts.ai built with Next.js 15, TypeScript, Prisma, and PostgreSQL. Create viral short-form videos for TikTok, YouTube Shorts, and Instagram Reels automatically with AI.

## Features

### Core Features
- 🎬 **Topic-to-Video Generation** - Enter a topic, get a complete video with script, voiceover, footage, and subtitles
- 📚 **Series Management** - Create recurring content series with scheduling
- ✏️ **Video Editor/Preview** - Edit scripts, change titles, swap background music before rendering
- 📅 **Scheduling & Auto-Posting** - Schedule videos for TikTok, YouTube Shorts, Instagram Reels
- 🎙️ **Voice Cloning/TTS** - 50+ realistic AI voices via ElevenLabs, multi-language support
- 📊 **Analytics Dashboard** - Track views, engagement, performance per video/series
- 🔐 **Authentication** - Email/password + OAuth (Google, GitHub)
- 🎨 **Modern UI** - Dark/light mode, responsive design, accessible components

### AI Integrations
- **LLM**: Google Gemini 1.5 Pro (primary) + Grok (fallback) for script generation
- **TTS**: ElevenLabs for natural voiceovers
- **Video Gen**: Replicate (Stable Video Diffusion) for AI-generated footage
- **Stock Media**: Pixabay + Pexels for royalty-free videos/images
- **Music**: Freesound (CC0/CC-BY) + local tracks for background music
- **Social**: YouTube, TikTok, Instagram OAuth + posting APIs

### Technical Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Queue**: BullMQ + Redis for background job processing
- **Auth**: NextAuth v5 (beta) with Prisma adapter
- **Styling**: Tailwind CSS + Radix UI + shadcn/ui patterns
- **Validation**: Zod schemas throughout
- **Deployment**: Docker + Docker Compose ready

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Redis 7+
- FFmpeg installed

### Local Development

1. **Clone and install**
```bash
cd autoshorts
npm install
```

2. **Set up environment**
```bash
cp .env.example .env
# Edit .env with your API keys (already populated with provided keys)
```

3. **Start services**
```bash
# Using Docker Compose (recommended)
docker-compose up -d postgres redis

# Or start manually
# postgres: postgresql://user:password@localhost:5432/autoshorts
# redis: redis://localhost:6379
```

4. **Initialize database**
```bash
npm run db:migrate
npm run db:seed
```

5. **Start development servers**
```bash
# Terminal 1: Next.js app
npm run dev

# Terminal 2: Background worker
npm run worker
```

6. **Open** http://localhost:3000

### Demo Credentials
- **Email**: demo@autoshorts.ai
- **Password**: demo1234

### Docker Deployment
```bash
docker-compose up -d --build
```

## Project Structure

```
autoshorts/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Demo data seeding
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   ├── auth/          # Auth pages
│   │   ├── dashboard/     # Main dashboard
│   │   └── settings/      # User settings
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   ├── lib/
│   │   ├── auth/          # NextAuth config
│   │   ├── db/            # Prisma client
│   │   ├── llm/           # Gemini/Grok integration
│   │   ├── tts/           # ElevenLabs integration
│   │   ├── api/           # Media APIs (Pixabay, Pexels, Freesound)
│   │   ├── video/         # FFmpeg video rendering
│   │   ├── social/        # Social media OAuth/posting
│   │   ├── stripe/        # Billing (optional)
│   │   ├── queue/         # BullMQ workers
│   │   └── utils/         # Helpers
│   └── types/             # TypeScript types
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.worker
└── worker.ts
```

## API Keys Provided

The following API keys are pre-configured in `.env`:

| Service | Key | Purpose |
|---------|-----|---------|
| **Gemini** | `AIzaSyDnsR7...` | Script generation (primary LLM) |
| **Grok** | `xai-k99MJTQc...` | Script generation (fallback LLM) |
| **ElevenLabs** | `sk_4a3029fb...` | Voiceover generation |
| **Replicate** | `r8_PahzMn3i...` | AI video generation (Stable Video Diffusion) |
| **Pixabay** | `56686988-5570...` | Stock videos/images |
| **Freesound** | `C0iAmt6VdA7t...` | Royalty-free music/sound effects |
| **YouTube** | `AIzaSyDXgRKs...` | YouTube Data API |
| **ALO** | `aloo_sk_test...` | Additional AI services |

## Usage Guide

### Creating Your First Video

1. Go to **Dashboard → Create**
2. Click **"Create Video"** or **"New Video"**
3. Enter a topic (e.g., "How AI is changing healthcare")
3. Choose style: Viral Hook, Storytelling, Educational, Funny, News, etc.
4. Set video length (15-180 seconds)
5. Click **"Generate Video"**

The system will:
1. 🤖 Generate a viral-optimized script with scenes
2. 🎙️ Create natural voiceover with ElevenLabs
3. 🎬 Fetch relevant stock footage from Pixabay/Pexels
4. 🎵 Add background music from Freesound
5. 🎞️ Render final 9:16 video with subtitles
6. ✅ Notify when ready

### Creating a Series

1. Go to **Dashboard → Create → New Series**
2. Name your series (e.g., "Daily AI News")
3. Set topic, style, length, schedule
4. Enable auto-scheduling for recurring content
5. Click **"Generate"** anytime to create new episodes

### Connecting Social Accounts

1. Go to **Settings → Social**
2. Click **"Connect"** for TikTok, YouTube, or Instagram
3. Authorize the app
4. Videos can now be auto-posted from the video details page

## Background Job Processing

The worker handles these job types:
- **video-generation** - Script generation via LLM
- **voiceover** - TTS audio generation via ElevenLabs
- **media-fetch** - Stock media search and caching
- **rendering** - FFmpeg video composition
- **posting** - Social media publishing

Monitor queues at `/api/queue/stats` (admin only).

## Customization

### Prompt Styles
Edit `src/lib/llm/index.ts` to add new prompt styles:
```typescript
const PROMPT_STYLES = {
  your_style: 'Your custom prompt instructions...',
};
```

### Video Quality
Adjust rendering presets in `src/lib/video/renderer.ts`:
- `fast` - CRF 28, 5Mbps
- `balanced` - CRF 23, 8Mbps (default)
- `best` - CRF 18, 20Mbps

### Adding New Voices
Use ElevenLabs API to clone voices or browse the voice library in Settings.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_URL` | Yes | Redis connection string |
| `NEXTAUTH_SECRET` | Yes | 32+ char random string |
| `NEXTAUTH_URL` | Yes | App URL (e.g., http://localhost:3000) |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `ELEVENLABS_API_KEY` | Yes | ElevenLabs API key |
| `REPLICATE_API_TOKEN` | No | For AI video generation |
| `PIXABAY_API_KEY` | No | Stock media |
| `FREESOUND_CLIENT_ID/SECRET` | No | Music search |
| `YOUTUBE_CLIENT_ID/SECRET` | No | YouTube OAuth |
| `TIKTOK_CLIENT_KEY/SECRET` | No | TikTok OAuth |
| `INSTAGRAM_APP_ID/SECRET` | No | Instagram OAuth |

## Production Deployment

### Vercel + Railway/Render
1. Push to GitHub
2. Connect Vercel for frontend
3. Connect Railway/Render for PostgreSQL + Redis
4. Add environment variables
5. Deploy

### Docker (VPS/Kubernetes)
```bash
# Build images
docker-compose build

# Run migrations
docker-compose run app npx prisma migrate deploy

# Start services
docker-compose up -d
```

### Health Checks
- App: `GET /api/health`
- Worker: Check queue processing in logs
- Database: `pg_isready`
- Redis: `redis-cli ping`

## License

MIT License - Feel free to use for personal or commercial projects.

## Support

For issues and feature requests, please open a GitHub issue.