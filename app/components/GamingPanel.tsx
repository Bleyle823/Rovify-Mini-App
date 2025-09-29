'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiSettings, FiUsers,
  FiStar, FiClock, FiTarget, FiZap
} from 'react-icons/fi';
import { 
  BsController, BsTrophy, BsStar, BsClock, BsLightning,
  BsPlayCircle, BsPauseCircle, BsVolumeUp, BsVolumeMute
} from 'react-icons/bs';
import { IoGameControllerOutline, IoTrophyOutline, IoStarOutline } from 'react-icons/io5';
import { Button } from './DemoComponents';
import { Icon } from './DemoComponents';

interface Game {
  id: string;
  title: string;
  image: string;
  category: string;
  players: number;
  rating: number;
  isLive: boolean;
  isPopular: boolean;
  description: string;
  tags: string[];
}

interface LeaderboardEntry {
  rank: number;
  player: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  score: number;
  level: number;
  badge: string;
}

interface Tournament {
  id: string;
  title: string;
  game: string;
  prize: string;
  participants: number;
  maxParticipants: number;
  startDate: string;
  status: 'upcoming' | 'live' | 'finished';
  image: string;
}

const SAMPLE_GAMES: Game[] = [
  {
    id: "1",
    title: "Rovify Racing",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    category: "Racing",
    players: 1250,
    rating: 4.8,
    isLive: true,
    isPopular: true,
    description: "High-speed racing through futuristic cities",
    tags: ["racing", "multiplayer", "3d"]
  },
  {
    id: "2",
    title: "Crypto Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    category: "Adventure",
    players: 890,
    rating: 4.6,
    isLive: false,
    isPopular: true,
    description: "Explore the blockchain universe",
    tags: ["adventure", "crypto", "puzzle"]
  },
  {
    id: "3",
    title: "Event Defender",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop",
    category: "Strategy",
    players: 2100,
    rating: 4.9,
    isLive: true,
    isPopular: false,
    description: "Defend your events from chaos",
    tags: ["strategy", "tower-defense", "events"]
  },
  {
    id: "4",
    title: "NFT Collector",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    category: "Collection",
    players: 567,
    rating: 4.4,
    isLive: false,
    isPopular: false,
    description: "Collect and trade digital assets",
    tags: ["collection", "nft", "trading"]
  }
];

const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    player: {
      name: "AlexGamer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true
    },
    score: 12500,
    level: 25,
    badge: "🏆"
  },
  {
    rank: 2,
    player: {
      name: "SarahPro",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      verified: true
    },
    score: 11800,
    level: 23,
    badge: "🥈"
  },
  {
    rank: 3,
    player: {
      name: "MikeMaster",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: false
    },
    score: 11200,
    level: 22,
    badge: "🥉"
  },
  {
    rank: 4,
    player: {
      name: "EmmaChamp",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      verified: true
    },
    score: 10800,
    level: 21,
    badge: "⭐"
  }
];

const SAMPLE_TOURNAMENTS: Tournament[] = [
  {
    id: "1",
    title: "Summer Gaming Championship",
    game: "Rovify Racing",
    prize: "$10,000",
    participants: 45,
    maxParticipants: 100,
    startDate: "2025-07-20",
    status: 'upcoming',
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=120&fit=crop"
  },
  {
    id: "2",
    title: "Crypto Quest Tournament",
    game: "Crypto Quest",
    prize: "$5,000",
    participants: 78,
    maxParticipants: 100,
    startDate: "2025-07-15",
    status: 'live',
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=120&fit=crop"
  },
  {
    id: "3",
    title: "Event Defender League",
    game: "Event Defender",
    prize: "$7,500",
    participants: 100,
    maxParticipants: 100,
    startDate: "2025-07-10",
    status: 'finished',
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=200&h=120&fit=crop"
  }
];

function GameCard({ game }: { game: Game }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rovify-card overflow-hidden"
    >
      <div className="relative">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {game.isLive && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
              Live
            </div>
          )}
          {game.isPopular && (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              🔥 Popular
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
          >
            {isPlaying ? (
              <BsPauseCircle className="w-6 h-6 text-white" />
            ) : (
              <BsPlayCircle className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[var(--rovify-primary)] bg-[var(--app-accent-light)] px-2 py-1 rounded-full">
            {game.category}
          </span>
          <div className="flex items-center">
            <BsStar className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{game.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-[var(--rovify-text)] mb-2">{game.title}</h3>
        <p className="text-sm text-[var(--rovify-text-light)] mb-3 line-clamp-2">{game.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-[var(--rovify-text-light)]">
            <FiUsers className="w-4 h-4 mr-1" />
            {game.players.toLocaleString()} players
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {game.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-[var(--app-accent-light)] text-[var(--rovify-primary)] rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <Button className="w-full rovify-button">
          {isPlaying ? 'Playing...' : 'Play Now'}
        </Button>
      </div>
    </motion.div>
  );
}

function LeaderboardItem({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-[var(--rovify-gray-light)] rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--app-accent-light)] text-[var(--rovify-primary)] font-bold text-sm">
          {entry.rank}
        </div>
        <img 
          src={entry.player.avatar} 
          alt={entry.player.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="flex items-center">
            <h4 className="font-medium text-[var(--rovify-text)]">{entry.player.name}</h4>
            {entry.player.verified && (
              <span className="ml-1 text-blue-500 text-sm">✓</span>
            )}
          </div>
          <p className="text-sm text-[var(--rovify-text-light)]">Level {entry.level}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-[var(--rovify-text)]">{entry.score.toLocaleString()}</div>
        <div className="text-2xl">{entry.badge}</div>
      </div>
    </div>
  );
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      case 'finished':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="rovify-card p-4">
      <div className="flex items-start space-x-3">
        <img 
          src={tournament.image} 
          alt={tournament.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-[var(--rovify-text)]">{tournament.title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
              {tournament.status}
            </span>
          </div>
          <p className="text-sm text-[var(--rovify-text-light)] mb-2">{tournament.game}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--rovify-primary)] font-semibold">Prize: {tournament.prize}</span>
            <span className="text-[var(--rovify-text-light)]">
              {tournament.participants}/{tournament.maxParticipants} players
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-[var(--rovify-gray-light)] rounded-full h-2">
              <div 
                className="bg-[var(--rovify-primary)] h-2 rounded-full" 
                style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GamingPanel() {
  const [activeTab, setActiveTab] = useState<'games' | 'leaderboard' | 'tournaments'>('games');
  const [games, setGames] = useState<Game[]>(SAMPLE_GAMES);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(SAMPLE_LEADERBOARD);
  const [tournaments, setTournaments] = useState<Tournament[]>(SAMPLE_TOURNAMENTS);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--rovify-text)] mb-2">Gaming Hub</h2>
        <p className="text-[var(--rovify-text-light)]">Play, compete, and win rewards</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setActiveTab('games')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
            activeTab === 'games'
              ? 'rovify-badge'
              : 'bg-[var(--rovify-gray-light)] text-[var(--rovify-text-light)] hover:bg-[var(--rovify-gray-dark)] hover:text-[var(--rovify-text)]'
          }`}
        >
          <BsController className="mr-2" />
          Games
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
            activeTab === 'leaderboard'
              ? 'rovify-badge'
              : 'bg-[var(--rovify-gray-light)] text-[var(--rovify-text-light)] hover:bg-[var(--rovify-gray-dark)] hover:text-[var(--rovify-text)]'
          }`}
        >
          <BsTrophy className="mr-2" />
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('tournaments')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
            activeTab === 'tournaments'
              ? 'rovify-badge'
              : 'bg-[var(--rovify-gray-light)] text-[var(--rovify-text-light)] hover:bg-[var(--rovify-gray-dark)] hover:text-[var(--rovify-text)]'
          }`}
        >
          <BsLightning className="mr-2" />
          Tournaments
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'games' && (
          <motion.div
            key="games"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rovify-card p-4"
          >
            <h3 className="text-lg font-semibold text-[var(--rovify-text)] mb-4">Global Leaderboard</h3>
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <LeaderboardItem key={entry.rank} entry={entry} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'tournaments' && (
          <motion.div
            key="tournaments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
