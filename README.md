# Rovify Mini

A lightweight event discovery and profile management app built on Base with OnchainKit.

## Features

- **Event Discovery**: Browse and discover amazing events across different categories
- **Profile Management**: Manage your profile, interests, and activity
- **Wallet Integration**: Connect your wallet for seamless transactions
- **Responsive Design**: Beautiful UI that works on all devices
- **Base Integration**: Built on Base blockchain with OnchainKit

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app directory
  - `components/` - React components
    - `DemoComponents.tsx` - Core UI components
    - `EventsPanel.tsx` - Event discovery and browsing
    - `ProfilePanel.tsx` - User profile management
  - `page.tsx` - Main app page with navigation
  - `layout.tsx` - App layout and metadata
- `lib/` - Utility libraries
- `public/` - Static assets

## Key Components

### EventsPanel
- Browse events by category
- View event details, pricing, and attendees
- Like and share events
- Responsive event cards

### ProfilePanel
- User profile information
- Activity tracking
- Statistics display
- Interest management

### Navigation
- Tab-based navigation
- Home, Events, and Profile sections
- Smooth transitions between views

## Technologies Used

- **Next.js 15** - React framework
- **OnchainKit** - Base blockchain integration
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **Framer Motion** - Animations
- **TypeScript** - Type safety

## Environment Variables

Make sure to set up your environment variables for:
- `NEXT_PUBLIC_URL` - Your app URL
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME` - Project name
- `NEXT_PUBLIC_APP_HERO_IMAGE` - Hero image URL
- `NEXT_PUBLIC_SPLASH_IMAGE` - Splash screen image
- `NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR` - Splash background color

## Building for Production

```bash
npm run build
npm start
```

## License

MIT