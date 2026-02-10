# oneXengine

A premium digital agency portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- Modern, responsive design
- Smooth animations with Framer Motion
- Custom cursor interaction
- Portfolio showcase
- Services and process overview
- Client testimonials
- Contact form

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### Automatic Deployment

1. Push your changes to the `main` branch
2. GitHub Actions will automatically:
   - Install dependencies
   - Build the project (`npm run build`)
   - Deploy the `dist/` folder to GitHub Pages

The site will be available at: `https://anupam-codespace.github.io/OneXengine/`

### Manual Deployment

To deploy to other platforms (Vercel, Netlify, etc.):

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider

For custom domains or different hosting providers, you may need to update the `base` path in `vite.config.js`.
