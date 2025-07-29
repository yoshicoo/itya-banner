# Furusato Image Generator

This project is a Next.js 14 application that scrapes product information from the "Manpuku" website and generates images in a unified format. It uses Cheerio for server-side HTML parsing, html2canvas for client-side image generation, and Tailwind CSS for styling.

## 1. Project Setup

```bash
# Create the project folder
mkdir furusato-image-generator
cd furusato-image-generator

# Initialize package.json and install dependencies
npm init -y
npm install next@14.0.0 react@^18 react-dom@^18 axios@^1.6.0 \
    cheerio@^1.0.0-rc.12 html2canvas@^1.4.1 tailwindcss@^3.3.0 \
    autoprefixer@^10.0.1 postcss@^8

# Install development dependencies
npm install -D eslint@^8 eslint-config-next@14.0.0

# Initialize Tailwind CSS
npx tailwindcss init -p
```

## 2. Directory Structure

```
furusato-image-generator/
├── app/
│   ├── api/
│   │   └── scrape/
│   │       └── route.js
│   ├── components/
│   │   └── ImageGenerator.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── .env.local
├── .gitignore
└── README.md
```

## 3. Start Development Server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

## 4. Production Build

```bash
npm run build
npm start
```

## Key Features

- ✅ Automatically extract product info from Manpuku URLs
- ✅ Generate images in a consistent format
- ✅ Download high-quality PNG images
- ✅ Responsive UI
- ✅ Error handling
- ✅ Fetch external images with CORS support
- ✅ Debug mode (development only)

## Technical Highlights

- **Next.js 14** using the App Router
- **Cheerio** for server-side HTML parsing
- **html2canvas** for client-side image generation
- **Tailwind CSS** utility-first styling
- **Axios** for HTTP requests
- **CORS support** for external images

## 5. Environment Variables

Set `OPENAI_API_KEY` in your Vercel project to enable ChatGPT 4.1 mini for shortening text.
