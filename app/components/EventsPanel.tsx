'use client';

import { useState, useEffect } from 'react';
import { Button } from './DemoComponents';
import { Icon } from './DemoComponents';
import { FiCalendar, FiMapPin, FiUsers, FiDollarSign, FiClock, FiHeart, FiShare } from 'react-icons/fi';

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
}

// Sample events data
const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2025",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
    date: "2025-07-15",
    location: "Central Park, NYC",
    price: "$50",
    attendees: 2500,
    category: "Music",
    description: "Join us for an amazing summer music festival featuring top artists and local talent.",
    isHot: true
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    date: "2025-08-20",
    location: "Convention Center, SF",
    price: "$150",
    attendees: 800,
    category: "Technology",
    description: "Explore the latest in technology, AI, and innovation with industry leaders."
  },
  {
    id: "3",
    title: "Art Gallery Opening",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
    date: "2025-06-10",
    location: "Modern Art Museum, LA",
    price: "Free",
    attendees: 150,
    category: "Art",
    description: "Experience contemporary art from emerging and established artists."
  },
  {
    id: "4",
    title: "Food & Wine Tasting",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    date: "2025-09-05",
    location: "Wine Country, Napa",
    price: "$75",
    attendees: 300,
    category: "Food & Drink",
    description: "Savor exquisite wines and gourmet dishes from local chefs."
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
    <div className="rovify-card overflow-hidden animate-fade-in">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        {event.isHot && (
          <div className="rovify-badge absolute top-3 left-3">
            🔥 Hot
          </div>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors backdrop-blur-sm"
        >
          <FiHeart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[var(--rovify-primary)] bg-[var(--app-accent-light)] px-3 py-1 rounded-full">
            {event.category}
          </span>
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
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 rovify-button">
            Get Tickets
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-[var(--app-accent-light)]">
            <FiShare className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EventsPanel() {
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'Music', label: 'Music' },
    { id: 'Technology', label: 'Tech' },
    { id: 'Art', label: 'Art' },
    { id: 'Food & Drink', label: 'Food' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--rovify-text)] mb-2">Discover Events</h2>
        <p className="text-[var(--rovify-text-light)]">Find amazing events happening near you</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              selectedCategory === category.id
                ? 'rovify-badge'
                : 'bg-[var(--rovify-gray-light)] text-[var(--rovify-text-light)] hover:bg-[var(--rovify-gray-dark)] hover:text-[var(--rovify-text)]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8">
          <Icon name="calendar" size="lg" className="text-[var(--rovify-text-light)] mb-2" />
          <p className="text-[var(--rovify-text-light)]">No events found in this category</p>
        </div>
      )}
    </div>
  );
}
