'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiFilter, FiMapPin, FiCalendar, FiUsers, FiDollarSign, 
  FiHeart, FiShare, FiTrendingUp, FiClock, FiStar, FiTag
} from 'react-icons/fi';
import { 
  BsMusicNote, BsLightningCharge, BsBrush, BsFlag, BsTree, 
  BsGem, BsTicket, BsFire, BsCameraVideo
} from 'react-icons/bs';
import { FaMountainSun } from 'react-icons/fa6';
import { IoGameControllerOutline, IoTicketOutline } from 'react-icons/io5';
import { Button } from './DemoComponents';
import { Icon } from './DemoComponents';

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  attendees: number;
  category: string;
  description: string;
  isHot?: boolean;
  isFeatured?: boolean;
  isNFT?: boolean;
  isFree?: boolean;
  tags: string[];
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Events', icon: <FiCalendar />, count: 2145, color: 'bg-blue-500' },
  { id: 'trending', label: 'Trending', icon: <FiTrendingUp />, count: 89, color: 'bg-red-500' },
  { id: 'this-week', label: 'This Week', icon: <FiClock />, count: 156, color: 'bg-green-500' },
  { id: 'music', label: 'Music', icon: <BsMusicNote />, count: 245, color: 'bg-purple-500' },
  { id: 'tech', label: 'Tech', icon: <BsLightningCharge />, count: 189, color: 'bg-blue-600' },
  { id: 'art', label: 'Art', icon: <BsBrush />, count: 167, color: 'bg-pink-500' },
  { id: 'sports', label: 'Sports', icon: <BsFlag />, count: 234, color: 'bg-orange-500' },
  { id: 'gaming', label: 'Gaming', icon: <IoGameControllerOutline />, count: 198, color: 'bg-indigo-500' },
  { id: 'food', label: 'Food', icon: <FiTag />, count: 356, color: 'bg-yellow-500' },
  { id: 'wellness', label: 'Wellness', icon: <BsTree />, count: 145, color: 'bg-green-600' },
  { id: 'outdoor', label: 'Outdoor', icon: <FaMountainSun />, count: 287, color: 'bg-emerald-500' },
  { id: 'free', label: 'Free', icon: <BsGem />, count: 67, color: 'bg-teal-500' },
  { id: 'nft', label: 'NFT', icon: <BsTicket />, count: 23, color: 'bg-violet-500' },
];

const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2025",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
    date: "2025-07-15",
    location: "Central Park, NYC",
    price: "$50",
    attendees: 2500,
    category: "music",
    description: "Join us for an amazing summer music festival featuring top artists and local talent.",
    isHot: true,
    isFeatured: true,
    tags: ["festival", "outdoor", "live-music"],
    creator: {
      name: "EventPro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true
    }
  },
  {
    id: "2",
    title: "Tech Innovation Summit 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    date: "2025-08-20",
    location: "Convention Center, SF",
    price: "Free",
    attendees: 800,
    category: "tech",
    description: "Explore the latest in technology, AI, and innovation with industry leaders.",
    isFree: true,
    tags: ["networking", "innovation", "startup"],
    creator: {
      name: "TechEvents",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: true
    }
  },
  {
    id: "3",
    title: "Digital Art Exhibition: Future Visions",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    date: "2025-09-10",
    location: "Modern Gallery, LA",
    price: "$25",
    attendees: 456,
    category: "art",
    description: "Experience contemporary art from emerging and established artists.",
    isNFT: true,
    tags: ["exhibition", "digital-art", "gallery"],
    creator: {
      name: "ArtCollective",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      verified: false
    }
  },
  {
    id: "4",
    title: "Gaming Championship Finals",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    date: "2025-10-05",
    location: "Esports Arena, Austin",
    price: "$30",
    attendees: 2100,
    category: "gaming",
    description: "Watch the best players compete for the ultimate prize.",
    isHot: true,
    tags: ["esports", "competition", "gaming"],
    creator: {
      name: "GameMasters",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      verified: true
    }
  },
  {
    id: "5",
    title: "Street Food Festival",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    date: "2025-08-12",
    location: "Santa Monica Pier, CA",
    price: "Free",
    attendees: 1200,
    category: "food",
    description: "Savor exquisite wines and gourmet dishes from local chefs.",
    isFree: true,
    tags: ["food", "festival", "outdoor"],
    creator: {
      name: "FoodFest",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      verified: true
    }
  }
];

function EventCard({ event }: { event: Event }) {
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rovify-card overflow-hidden animate-fade-in"
    >
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {event.isHot && (
            <div className="rovify-badge">
              🔥 Hot
            </div>
          )}
          {event.isFeatured && (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ⭐ Featured
            </div>
          )}
          {event.isNFT && (
            <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              🎫 NFT
            </div>
          )}
          {event.isFree && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              🆓 Free
            </div>
          )}
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors backdrop-blur-sm"
        >
          <FiHeart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <img 
              src={event.creator.avatar} 
              alt={event.creator.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-[var(--rovify-text-light)]">{event.creator.name}</span>
            {event.creator.verified && (
              <span className="text-blue-500 text-xs">✓</span>
            )}
          </div>
          <span className="text-sm font-semibold text-green-600">{event.price}</span>
        </div>
        
        <h3 className="font-semibold text-[var(--rovify-text)] mb-2 line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 text-sm text-[var(--rovify-text-light)] mb-3">
          <div className="flex items-center">
            <FiCalendar className="w-4 h-4 mr-2" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center">
            <FiMapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center">
            <FiUsers className="w-4 h-4 mr-2" />
            {event.attendees.toLocaleString()} attendees
          </div>
        </div>
        
        <p className="text-sm text-[var(--rovify-text-light)] mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-[var(--app-accent-light)] text-[var(--rovify-primary)] rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 rovify-button">
            Get Tickets
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-[var(--app-accent-light)]">
            <FiShare className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function DiscoverPanel() {
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--rovify-text)] mb-2">Discover Events</h2>
        <p className="text-[var(--rovify-text-light)]">Find amazing events happening near you</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--rovify-text-light)] w-5 h-5" />
          <input
            type="text"
            placeholder="Search events, locations, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[var(--rovify-card-bg)] border border-[var(--app-card-border)] rounded-xl text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
                selectedCategory === category.id
                  ? 'rovify-badge'
                  : 'bg-[var(--rovify-gray-light)] text-[var(--rovify-text-light)] hover:bg-[var(--rovify-gray-dark)] hover:text-[var(--rovify-text)]'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-[var(--rovify-text-light)]">
          {filteredEvents.length} events found
        </div>
        <div className="flex bg-[var(--rovify-gray-light)] rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Events Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
        <AnimatePresence>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </AnimatePresence>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Icon name="calendar" size="lg" className="text-[var(--rovify-text-light)] mb-4" />
          <h3 className="text-lg font-medium text-[var(--rovify-text)] mb-2">No events found</h3>
          <p className="text-[var(--rovify-text-light)]">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
