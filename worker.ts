import './lib/queue';

console.log('🚀 AutoShorts Worker started');
console.log('📋 Processing queues: video-generation, voiceover, rendering, posting, media-fetch');

// Keep the process alive
process.stdin.resume();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  process.exit(0);
});