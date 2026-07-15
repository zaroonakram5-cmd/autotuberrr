import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const demoPassword = await hash('demo1234', 12);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@autoshorts.ai' },
    update: {},
    create: {
      email: 'demo@autoshorts.ai',
      name: 'Demo User',
      passwordHash: demoPassword,
      role: 'USER',
    },
  });

  // Create subscription for demo user
  await prisma.subscription.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      tier: 'HARDCORE',
      status: 'ACTIVE',
    },
  });

  // Create user preferences
  await prisma.userPreferences.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      theme: 'system',
      language: 'en',
      timezone: 'UTC',
    },
  });

  // Create sample series
  const series = await prisma.series.upsert({
    where: { id: 'demo-series-1' },
    update: {},
    create: {
      id: 'demo-series-1',
      userId: demoUser.id,
      name: 'Daily AI News',
      topic: 'Latest AI breakthroughs and news',
      promptStyle: 'news',
      language: 'en',
      videoLength: 60,
      aspectRatio: '9:16',
      quality: 'balanced',
      hardware: 'cpu',
      scheduleEnabled: false,
      isActive: true,
    },
  });

  // Create sample videos
  const sampleVideos = [
    {
      id: 'demo-video-1',
      userId: demoUser.id,
      seriesId: series.id,
      title: 'AI Breakthrough: GPT-5 Changes Everything',
      script: JSON.stringify({
        title: 'AI Breakthrough: GPT-5 Changes Everything',
        script: 'OpenAI just announced GPT-5 and it\'s a game changer. The new model can reason, code, and create like never before. Here\'s what you need to know...',
        scenes: [
          { id: '1', text: 'OpenAI just announced GPT-5', duration: 5, visualPrompt: 'futuristic AI brain neural network glowing', mediaType: 'video', textOverlay: 'GPT-5 Announced' },
          { id: '2', text: 'and it\'s a game changer', duration: 5, visualPrompt: 'explosion of digital particles transforming into code', mediaType: 'video', textOverlay: 'Game Changer' },
          { id: '3', text: 'The new model can reason, code, and create like never before', duration: 10, visualPrompt: 'developer coding with AI assistant hologram', mediaType: 'video', textOverlay: 'Reason, Code, Create' },
          { id: '4', text: 'Here\'s what you need to know', duration: 5, visualPrompt: 'person checking phone with notification', mediaType: 'image', textOverlay: 'What You Need to Know' },
        ],
        hashtags: ['#AI', '#GPT5', '#OpenAI', '#TechNews', '#ArtificialIntelligence'],
        description: 'OpenAI announces GPT-5 with breakthrough reasoning capabilities. Everything you need to know about the latest AI milestone.',
      }),
      status: 'READY',
      videoUrl: '/demo/video1.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=711&fit=crop',
      duration: 60,
      aspectRatio: '9:16',
      resolution: '1080p',
      metadata: { hashtags: ['#AI', '#GPT5', '#OpenAI', '#TechNews', '#ArtificialIntelligence'] },
    },
    {
      id: 'demo-video-2',
      userId: demoUser.id,
      seriesId: series.id,
      title: 'Why AI Agents Are The Next Big Thing',
      script: JSON.stringify({
        title: 'Why AI Agents Are The Next Big Thing',
        script: 'AI agents are autonomous programs that can perform tasks without human supervision. They\'re revolutionizing how we work...',
        scenes: [
          { id: '1', text: 'AI agents are autonomous programs', duration: 5, visualPrompt: 'robot assistant working independently', mediaType: 'video', textOverlay: 'Autonomous AI' },
          { id: '2', text: 'that can perform tasks without human supervision', duration: 5, visualPrompt: 'computer screen showing automated workflow', mediaType: 'video', textOverlay: 'No Supervision Needed' },
          { id: '3', text: 'They\'re revolutionizing how we work', duration: 10, visualPrompt: 'office with AI agents helping workers', mediaType: 'video', textOverlay: 'Work Revolution' },
        ],
        hashtags: ['#AIAgents', '#Automation', '#FutureOfWork', '#TechTrends'],
        description: 'Discover why AI agents are the next big thing in technology and how they will transform the workplace.',
      }),
      status: 'POSTED',
      videoUrl: '/demo/video2.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=711&fit=crop',
      duration: 45,
      aspectRatio: '9:16',
      resolution: '1080p',
      postedAt: new Date(),
      metadata: { hashtags: ['#AIAgents', '#Automation', '#FutureOfWork', '#TechTrends'] },
    },
    {
      id: 'demo-video-3',
      userId: demoUser.id,
      title: 'The Secret to Viral TikTok Videos',
      script: JSON.stringify({
        title: 'The Secret to Viral TikTok Videos',
        script: 'Want to go viral on TikTok? It\'s not luck - it\'s a formula. The hook, the story, the payoff. Here\'s the exact structure...',
        scenes: [
          { id: '1', text: 'Want to go viral on TikTok?', duration: 3, visualPrompt: 'TikTok app opening on phone', mediaType: 'video', textOverlay: 'Go Viral on TikTok' },
          { id: '2', text: 'It\'s not luck - it\'s a formula', duration: 5, visualPrompt: 'mathematical formula glowing on screen', mediaType: 'image', textOverlay: 'It\'s a Formula' },
          { id: '3', text: 'The hook, the story, the payoff', duration: 10, visualPrompt: 'three panels showing hook, story, payoff', mediaType: 'image', textOverlay: 'Hook → Story → Payoff' },
        ],
        hashtags: ['#TikTokTips', '#ViralVideo', '#ContentCreator', '#SocialMedia'],
        description: 'Learn the exact formula for creating viral TikTok videos. Hook, story, payoff - master the structure.',
      }),
      status: 'RENDERING',
      aspectRatio: '9:16',
      resolution: '1080p',
      metadata: { hashtags: ['#TikTokTips', '#ViralVideo', '#ContentCreator', '#SocialMedia'] },
    },
  ];

  for (const video of sampleVideos) {
    await prisma.video.upsert({
      where: { id: video.id },
      update: {},
      create: video,
    });
  }

  // Create prompt templates
  const templates = [
    {
      name: 'Viral Hook',
      category: 'viral',
      prompt: 'Create a script that grabs attention in the first 3 seconds with a powerful hook, builds tension, and delivers a satisfying payoff.',
      variables: { topic: 'string', length: 'number' },
      isSystem: true,
    },
    {
      name: 'Educational Explainer',
      category: 'educational',
      prompt: 'Create an informative script that teaches a concept clearly with examples and actionable takeaways.',
      variables: { topic: 'string', audience: 'string', length: 'number' },
      isSystem: true,
    },
    {
      name: 'Storytelling',
      category: 'storytelling',
      prompt: 'Create a narrative-driven script with character development, conflict, and resolution.',
      variables: { topic: 'string', protagonist: 'string', length: 'number' },
      isSystem: true,
    },
  ];

  for (const template of templates) {
    await prisma.promptTemplate.upsert({
      where: { id: `template-${template.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `template-${template.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...template,
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('📧 Demo user: demo@autoshorts.ai');
  console.log('🔑 Demo password: demo1234');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });