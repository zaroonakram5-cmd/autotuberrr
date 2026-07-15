#!/bin/bash

cd /home/user/autoshorts

# Fix lib files - they are in src/lib/ or src/lib/<subdir>/
# Need relative paths from each file to the target

# Fix auth/config.ts - it's at src/lib/auth/config.ts, needs to go to src/lib/db/prisma
# From auth/config.ts to db/prisma: ../db/prisma
sed -i "s|import prisma from '../../../lib/db/prisma'|import prisma from '../db/prisma'|g" src/lib/auth/config.ts

# Fix queue/index.ts - at src/lib/queue/index.ts, needs to go to various lib subdirs
sed -i "s|import.*from '../../../lib/llm'|import { generateScript, generateVideoTitles, generateHashtags } from '../llm'|g" src/lib/queue/index.ts
sed -i "s|import.*from '../../../lib/tts'|import { generateVoiceover, generateVoiceoverBuffer } from '../tts'|g" src/lib/queue/index.ts
sed -i "s|import.*from '../../../lib/api/media'|import { searchVideos, searchImages, searchMusic, cacheMediaAsset, downloadMedia } from '../api/media'|g" src/lib/queue/index.ts
sed -i "s|import.*from '../../../lib/video/renderer'|import { renderVideo } from '../video/renderer'|g" src/lib/queue/index.ts
sed -i "s|import.*from '../../../lib/social'|import { postVideo, getConnectedAccounts, refreshAccessToken } from '../social'|g" src/lib/queue/index.ts
sed -i "s|import.*from '../../../lib/db/prisma'|import prisma from '../db/prisma'|g" src/lib/queue/index.ts

# Fix social/index.ts - at src/lib/social/index.ts
sed -i "s|import prisma from '../../../lib/db/prisma'|import prisma from '../db/prisma'|g" src/lib/social/index.ts

# Fix stripe/index.ts - at src/lib/stripe/index.ts
sed -i "s|import prisma from '../../../lib/db/prisma'|import prisma from '../db/prisma'|g" src/lib/stripe/index.ts

# Fix video/renderer.ts - at src/lib/video/renderer.ts, needs to go up two levels to lib/
sed -i "s|import prisma from '../../../lib/db/prisma'|import prisma from '../../db/prisma'|g" src/lib/video/renderer.ts

echo "Done fixing lib imports"
