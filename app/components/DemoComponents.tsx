"use client";

import { type ReactNode, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card({
  title,
  children,
  className = "",
  onClick,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`rovify-card overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type FeaturesProps = {
  setActiveTab: (tab: string) => void;
};

export function Features({ setActiveTab }: FeaturesProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Rovify Mini - Complete Feature Set">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--rovify-text)]">🎯 Core Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
                <span className="text-[var(--app-foreground-muted)] text-sm">
                  Discover and browse amazing events
                </span>
              </li>
              <li className="flex items-start">
                <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
                <span className="text-[var(--app-foreground-muted)] text-sm">
                  Social feed with stories and posts
                </span>
              </li>
              <li className="flex items-start">
                <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
                <span className="text-[var(--app-foreground-muted)] text-sm">
                  Gaming hub with tournaments
                </span>
              </li>
              <li className="flex items-start">
                <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
                <span className="text-[var(--app-foreground-muted)] text-sm">
                  Profile management and preferences
                </span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--rovify-text)]">🚀 Advanced Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
                <span className="text-[var(--app-foreground-muted)] text-sm">
                  Live streaming and video content
                </span>
              </li>
              <li className="flex items-start">
                <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
                <span className="text-[var(--app-foreground-muted)] text-sm">
                  NFT tickets and marketplace
                </span>
              </li>
              <li className="flex items-start">
                <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
                <span className="text-[var(--app-foreground-muted)] text-sm">
                  Groups, friends, and messaging
                </span>
              </li>
              <li className="flex items-start">
                <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
                <span className="text-[var(--app-foreground-muted)] text-sm">
                  Maps and location services
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-[var(--app-accent-light)] p-4 rounded-lg mb-4">
          <h5 className="font-semibold text-[var(--rovify-primary)] mb-2">🔗 Web3 Integration</h5>
          <p className="text-[var(--app-foreground-muted)] text-sm">
            Built on Base blockchain with OnchainKit integration for seamless wallet connections and transactions.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setActiveTab("home")}>
            Back to Home
          </Button>
          <Button onClick={() => setActiveTab("discover")} className="rovify-button">
            Start Exploring
          </Button>
          <Button onClick={() => setActiveTab("gaming")} variant="secondary">
            Try Gaming
          </Button>
        </div>
      </Card>
    </div>
  );
}

type HomeProps = {
  setActiveTab: (tab: string) => void;
};

export function Home({ setActiveTab }: HomeProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="rovify-card p-6 text-center bg-gradient-to-br from-[var(--rovify-primary)] to-[var(--rovify-primary-light)] text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Rovify Mini</h1>
        <p className="text-white/90 mb-4">
          Discover amazing events, connect with creators, and experience the future of social events
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setActiveTab("discover")}
            className="bg-white text-[var(--rovify-primary)] hover:bg-white/90"
          >
            Explore Events
          </Button>
          <Button
            onClick={() => setActiveTab("feed")}
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Join Community
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rovify-card p-3 text-center">
          <div className="text-lg font-bold text-[var(--rovify-primary)]">2.1K</div>
          <div className="text-xs text-[var(--rovify-text-light)]">Events</div>
        </div>
        <div className="rovify-card p-3 text-center">
          <div className="text-lg font-bold text-[var(--rovify-primary)]">15K</div>
          <div className="text-xs text-[var(--rovify-text-light)]">Users</div>
        </div>
        <div className="rovify-card p-3 text-center">
          <div className="text-lg font-bold text-[var(--rovify-primary)]">89</div>
          <div className="text-xs text-[var(--rovify-text-light)]">Cities</div>
        </div>
      </div>

      {/* Featured Categories */}
      <Card title="Browse by Category">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveTab("discover")}
            className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white text-left hover:from-purple-600 hover:to-purple-700 transition-all"
          >
            <div className="flex items-center mb-1">
              <span className="text-lg mr-2">🎵</span>
              <span className="font-semibold">Music</span>
            </div>
            <div className="text-sm opacity-90">245 events</div>
          </button>
          
          <button
            onClick={() => setActiveTab("discover")}
            className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white text-left hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <div className="flex items-center mb-1">
              <span className="text-lg mr-2">⚡</span>
              <span className="font-semibold">Tech</span>
            </div>
            <div className="text-sm opacity-90">189 events</div>
          </button>
          
          <button
            onClick={() => setActiveTab("discover")}
            className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white text-left hover:from-green-600 hover:to-green-700 transition-all"
          >
            <div className="flex items-center mb-1">
              <span className="text-lg mr-2">🎮</span>
              <span className="font-semibold">Gaming</span>
            </div>
            <div className="text-sm opacity-90">198 events</div>
          </button>
          
          <button
            onClick={() => setActiveTab("discover")}
            className="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white text-left hover:from-pink-600 hover:to-pink-700 transition-all"
          >
            <div className="flex items-center mb-1">
              <span className="text-lg mr-2">🎨</span>
              <span className="font-semibold">Art</span>
            </div>
            <div className="text-sm opacity-90">167 events</div>
          </button>
        </div>
      </Card>

      {/* Trending Events Preview */}
      <Card title="🔥 Trending Now">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-[var(--rovify-gray-light)] rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=60&h=60&fit=crop" 
              alt="Event"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-[var(--rovify-text)] text-sm">Summer Music Festival</h4>
              <p className="text-xs text-[var(--rovify-text-light)]">Jul 15 • Central Park, NYC</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-[var(--rovify-primary)]">$50</div>
              <div className="text-xs text-[var(--rovify-text-light)]">2.5K going</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-[var(--rovify-gray-light)] rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=60&h=60&fit=crop" 
              alt="Event"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-[var(--rovify-text)] text-sm">Tech Innovation Summit</h4>
              <p className="text-xs text-[var(--rovify-text-light)]">Aug 20 • San Francisco, CA</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-green-600">Free</div>
              <div className="text-xs text-[var(--rovify-text-light)]">890 going</div>
            </div>
          </div>
        </div>
        <Button 
          onClick={() => setActiveTab("discover")}
          variant="outline" 
          className="w-full mt-3"
        >
          View All Events
        </Button>
      </Card>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setActiveTab("gaming")}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <span className="text-2xl mb-2">🎮</span>
            <span className="font-medium">Gaming Hub</span>
            <span className="text-xs text-[var(--rovify-text-light)] mt-1">Play & Compete</span>
          </Button>
          
          <Button
            onClick={() => setActiveTab("feed")}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <span className="text-2xl mb-2">💬</span>
            <span className="font-medium">Social Feed</span>
            <span className="text-xs text-[var(--rovify-text-light)] mt-1">Connect & Share</span>
          </Button>
          
          <Button
            onClick={() => setActiveTab("profile")}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <span className="text-2xl mb-2">👤</span>
            <span className="font-medium">Profile</span>
            <span className="text-xs text-[var(--rovify-text-light)] mt-1">Manage Account</span>
          </Button>
          
          <Button
            onClick={() => setActiveTab("features")}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <span className="text-2xl mb-2">⚙️</span>
            <span className="font-medium">Features</span>
            <span className="text-xs text-[var(--rovify-text-light)] mt-1">Explore All</span>
          </Button>
        </div>
      </Card>

      {/* Web3 Integration Highlight */}
      <div className="rovify-card p-4 bg-gradient-to-r from-[var(--app-accent-light)] to-[var(--rovify-gray-light)]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[var(--rovify-primary)] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">₿</span>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--rovify-text)]">Web3 Ready</h4>
            <p className="text-sm text-[var(--rovify-text-light)]">Built on Base blockchain with OnchainKit integration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type IconProps = {
  name: "heart" | "star" | "check" | "plus" | "arrow-right" | "calendar" | "user" | "ticket" | "home";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    calendar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Calendar</title>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    user: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>User</title>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    ticket: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Ticket</title>
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
      </svg>
    ),
    home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Home</title>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}

