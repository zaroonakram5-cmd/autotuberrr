#!/bin/bash

cd /home/user/autoshorts

# Fix lib files - they are in src/lib/ so need to go up 1 level to src/ then to lib/
# Actually they are already in lib, so relative to other lib files

# Fix media.ts
sed -i "s|import prisma from '@/lib/db/prisma'|import prisma from '../db/prisma'|g" src/lib/api/media.ts

# Fix queue/index.ts
sed -i "s|from '@/lib/llm'|from '../llm'|g" src/lib/queue/index.ts
sed -i "s|from '@/lib/tts'|from '../tts'|g" src/lib/queue/index.ts
sed -i "s|from '@/lib/api/media'|from '../api/media'|g" src/lib/queue/index.ts
sed -i "s|from '@/lib/video/renderer'|from '../video/renderer'|g" src/lib/queue/index.ts
sed -i "s|from '@/lib/social'|from '../social'|g" src/lib/queue/index.ts

# Fix social/index.ts
sed -i "s|import prisma from '@/lib/db/prisma'|import prisma from '../db/prisma'|g" src/lib/social/index.ts

# Fix stripe/index.ts
sed -i "s|import prisma from '@/lib/db/prisma'|import prisma from '../db/prisma'|g" src/lib/stripe/index.ts

# Fix video/renderer.ts
sed -i "s|import prisma from '@/lib/db/prisma'|import prisma from '../../db/prisma'|g" src/lib/video/renderer.ts

echo "Done fixing lib imports"
