# Styling Troubleshooting Guide

If you're experiencing missing styles when running this project on a new machine, follow these steps:

## 🚨 Quick Fix Steps

### 1. **Clean Install Dependencies**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clean npm cache
npm cache clean --force

# Fresh install
npm install
```

### 2. **Verify Node.js Version**
```bash
# Check Node.js version (should be 18+ for Next.js 15)
node --version

# Check npm version
npm --version
```

### 3. **Clear Next.js Cache**
```bash
# Remove Next.js cache
rm -rf .next

# Start development server
npm run dev
```

### 4. **Force Rebuild Tailwind**
```bash
# Stop the dev server (Ctrl+C)
# Then restart
npm run dev
```

## 🔧 Advanced Troubleshooting

### Check Tailwind CSS Configuration

1. **Verify these files exist:**
   - `tailwind.config.ts` ✅
   - `postcss.config.mjs` ✅
   - `src/app/globals.css` ✅

2. **Check globals.css imports:**
   ```css
   @import "tailwindcss";
   @import "tw-animate-css";
   ```

3. **Verify Tailwind dependencies:**
   ```bash
   npm list tailwindcss
   npm list @tailwindcss/postcss
   ```

### Common Issues & Solutions

#### Issue: "Tailwind classes not working"
**Solution:**
```bash
# Make sure Tailwind CSS v4 is properly installed
npm install tailwindcss@next @tailwindcss/postcss@next
```

#### Issue: "shadcn/ui components unstyled"
**Solution:**
```bash
# Reinstall shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add dialog
```

#### Issue: "CSS variables not defined"
**Check:** The CSS variables are defined in `src/app/globals.css`:
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... more variables */
}
```

#### Issue: "Dark mode not working"
**Solution:**
```bash
# Check if dark mode classes are properly configured
# Look for .dark class definitions in globals.css
```

### Environment-Specific Issues

#### Windows-Specific
- Ensure line endings are set to LF (not CRLF)
- Run `git config core.autocrlf false` if needed

#### macOS/Linux-Specific
- Check file permissions: `chmod +x node_modules/.bin/*`
- Verify npm registry: `npm config get registry`

## 🔍 Debugging Steps

### 1. **Check Browser Developer Tools**
- Open DevTools (F12)
- Look for CSS loading errors in Console
- Check if Tailwind classes are being applied in Elements tab

### 2. **Verify Build Process**
```bash
# Try building the project
npm run build

# If build fails, check for errors
npm run build --verbose
```

### 3. **Check File Structure**
```
src/
├── app/
│   ├── globals.css          # Tailwind imports
│   ├── layout.tsx           # CSS imports
│   └── components/          # Component pages
├── components/
│   └── ui/                  # shadcn/ui components
└── lib/
    └── utils.ts             # Tailwind utilities
```

## 🚀 Fresh Setup Commands

If all else fails, here's the complete setup sequence:

```bash
# 1. Clone the repository
git clone <repository-url>
cd translation-request2

# 2. Install dependencies
npm install

# 3. Verify Tailwind installation
npx tailwindcss --version

# 4. Start development server
npm run dev
```

## 📝 Dependencies Check

Make sure these are in your `package.json`:

```json
{
  "dependencies": {
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "tw-animate-css": "^1.3.7",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  }
}
```

## 🆘 Still Having Issues?

1. **Check the exact error message** in browser console
2. **Compare working vs non-working environments:**
   - Node.js versions
   - npm versions
   - Operating systems
3. **Try running on a different port:**
   ```bash
   npm run dev -- --port 3001
   ```

## 📞 Contact

If none of these steps work, please provide:
- Operating system and version
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Exact error messages from console
- Screenshots of the unstyled page