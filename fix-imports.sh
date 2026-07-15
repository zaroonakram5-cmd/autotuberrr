#!/bin/bash

# Fix all API routes to use relative imports instead of @/ aliases
# This script calculates the correct relative path based on file depth

cd /home/user/autoshorts

# Function to calculate relative path from a file to src/lib
fix_file() {
    local file="$1"
    # Count depth from src/app/api/
    local depth=$(echo "$file" | sed 's|src/app/api/||' | tr '/' '\n' | wc -l)
    # Each route.ts is in a folder, so depth is number of folders
    # Need to go up (depth + 2) levels to reach src/ then into lib
    local up_levels=$((depth + 2))
    local relative=""
    for ((i=0; i<up_levels; i++)); do
        relative="../$relative"
    done
    relative="${relative}lib"
    
    echo "Fixing $file (depth=$depth, up=$up_levels) -> $relative"
    
    # Replace @/lib/ with relative path
    sed -i "s|from '@/lib/|from '$relative/|g" "$file"
    sed -i "s|from '@/lib\"|from '$relative\"|g" "$file"
    sed -i "s|from '@/lib'|from '$relative'|g" "$file"
}

# Fix all API route files
find src/app/api -name "route.ts" -o -name "route.js" | while read file; do
    fix_file "$file"
done

# Also fix the auth config which is used by API routes
# src/lib/auth/config.ts might import from @/lib/db/prisma
sed -i "s|from '@/lib/db/prisma'|from '../../../lib/db/prisma'|g" src/lib/auth/config.ts
sed -i "s|from '@/lib/db/prisma'|from '../../../lib/db/prisma'|g" src/lib/queue/index.ts 2>/dev/null || true

echo "Done fixing imports"
