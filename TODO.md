# Fixing App Errors (Firebase, React Warnings, Assets)

Plan approved. Implementing step-by-step.

## TODO Steps
### 1. **Fix Firebase tweet posting** (Critical - blocks tweeting)
   - [x] Edit `src/components/input/input.tsx`: Add user null check, safe `images` handling in Promise.all, ensure `text` not null if converter strict.

### 2. **Fix React warnings**
   - [x] Edit `src/components/input/image-preview.tsx`: Change outer `motion.button` → `motion.div`, fix nesting + propagate onClick.
   - [x] Verify/add keys in ImagePreview map (already present).

### 3. **Fix static assets** ✅ (Low priority - dev warnings)
   - [x] Check/update `next.config.js` for assets (no changes needed; unoptimized images ok).
   - [x] Add font preloads if needed (added to app-head.tsx).

### 4. **Test & Verify** ✅
   - [x] Restart `npm run dev`.
   - [x] Test: Post tweet (empty/images/reply), check console, Firestore docs.
   - [x] Hard refresh, check Network tab (fonts/403).

### 5. **Polish (if issues)**
   - [ ] Cloudinary: utils.ts uploadImages.
   - [ ] Mark complete, attempt_completion.

Progress will be updated after each step.

