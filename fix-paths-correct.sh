#!/bin/bash

cd /home/user/autoshorts

# The correct depth calculation:
# src/app/api/xxx/route.ts -> need to go up to src/ then into lib/
# Route at: src/app/api/<segment1>/<segment2>/.../route.ts
# Count segments after api/

fix_file() {
    local file="$1"
    # Get path relative to src/app/api/
    local rel_path="${file#src/app/api/}"
    # Count directories (segments before route.ts)
    local segments=$(echo "$rel_path" | sed 's|/route.ts$||' | tr '/' '\n' | grep -c .)
    # Need to go up (segments + 2) levels: segments to get out of api/, +2 to get to src/
    local up=$((segments + 2))
    local relative=""
    for ((i=0; i<up; i++)); do
        relative="../$relative"
    done
    relative="${relative}lib"
    
    echo "Fixing $file (segments=$segments, up=$up) -> $relative"
    
    # Replace all relative imports to lib
    sed -i "s|from '../../../../../../lib/|from '$relative/|g" "$file"
    sed -i "s|from '../../../../../lib/|from '$relative/|g" "$file"
    sed -i "s|from '../../../../lib/|from '$relative/|g" "$file"
    sed -i "s|from '../../../lib/|from '$relative/|g" "$file"
    sed -i "s|from '../../lib/|from '$relative/|g" "$file"
    sed -i "s|from '../lib/|from '$relative/|g" "$file"
    sed -i "s|from './lib/|from '$relative/|g" "$file"
}

# Fix all API route files
find src/app/api -name "route.ts" | while read file; do
    fix_file "$file"
done

echo "Done fixing API route imports"
