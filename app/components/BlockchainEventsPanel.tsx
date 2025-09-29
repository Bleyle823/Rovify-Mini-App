'use client';

import { useState } from 'react';
import { Button } from './DemoComponents';
import { useWeb3 } from '../context/Web3Context';
import { 
  FiPlus, FiCalendar, FiMapPin, FiDollarSign, FiUsers, FiImage,
  FiClock, FiTag, FiZap, FiCheck, FiX, FiEdit, FiTrash2
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  maxTickets: number;
  image: string;
  category: string;
  isOnChain: boolean;
}

export function BlockchainEventsPanel() {
  const { 
    isConnected, 
    createEventOnChain,
    isLoading,
    connectWallet 
  } = useWeb3();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    description: '',
    date: '',
    location: '',
    price: 0,
    maxTickets: 100,
    image: '',
    category: 'music',
    isOnChain: false
  });

  const [createdEvents, setCreatedEvents] = useState<EventData[]>([
    {
      title: 'Summer Music Festival 2025',
      description: 'Join thousands for the ultimate summer music experience',
      date: '2025-07-15',
      location: 'Central Park, NYC',
      price: 50,
      maxTickets: 1000,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
      category: 'music',
      isOnChain: true
    },
    {
      title: 'Tech Innovation Summit 2025',
      description: 'Connect with innovators and builders shaping the future',
      date: '2025-08-20',
      location: 'San Francisco, CA',
      price: 0,
      maxTickets: 500,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      category: 'tech',
      isOnChain: true
    }
  ]);

  const categories = [
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'tech', label: 'Tech', icon: '⚡' },
    { id: 'art', label: 'Art', icon: '🎨' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'food', label: 'Food', icon: '🍕' },
    { id: 'sports', label: 'Sports', icon: '⚽' }
  ];

  const handleCreateEvent = async () => {
    if (!eventData.title || !eventData.description || !eventData.date || !eventData.location) {
      return;
    }

    try {
      await createEventOnChain(eventData);
      setCreatedEvents(prev => [{ ...eventData, isOnChain: true }, ...prev]);
      setShowCreateModal(false);
      setEventData({
        title: '',
        description: '',
        date: '',
        location: '',
        price: 0,
        maxTickets: 100,
        image: '',
        category: 'music',
        isOnChain: false
      });
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleInputChange = (field: keyof EventData, value: string | number) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  if (!isConnected) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <div className="rovify-card p-8 text-center">
          <div className="w-16 h-16 bg-[var(--rovify-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
            <FiZap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--rovify-text)] mb-2">Connect Your Wallet</h2>
          <p className="text-[var(--rovify-text-light)] mb-6">
            Connect your wallet to create and manage blockchain-based events.
          </p>
          <Button onClick={connectWallet} className="rovify-button">
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--rovify-text)] mb-2">Blockchain Events</h2>
          <p className="text-[var(--rovify-text-light)]">Create and manage on-chain events</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="rovify-button flex items-center"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Events Grid */}
      <div className="space-y-4">
        {createdEvents.length === 0 ? (
          <div className="rovify-card p-8 text-center">
            <FiCalendar className="w-12 h-12 text-[var(--rovify-text-light)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--rovify-text)] mb-2">No Events Created</h3>
            <p className="text-[var(--rovify-text-light)] mb-4">
              Create your first blockchain event to get started.
            </p>
            <Button onClick={() => setShowCreateModal(true)} className="rovify-button">
              Create Your First Event
            </Button>
          </div>
        ) : (
          createdEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rovify-card overflow-hidden"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-3 py-1 bg-[var(--rovify-primary)] text-white rounded-full text-sm font-semibold">
                    {categories.find(c => c.id === event.category)?.icon} {categories.find(c => c.id === event.category)?.label}
                  </span>
                  {event.isOnChain && (
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold flex items-center">
                      <FiZap className="w-3 h-3 mr-1" />
                      On-Chain
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex items-center space-x-2">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors backdrop-blur-sm">
                    <FiEdit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors backdrop-blur-sm">
                    <FiTrash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[var(--rovify-text)] mb-2">{event.title}</h3>
                <p className="text-sm text-[var(--rovify-text-light)] mb-3">{event.description}</p>

                <div className="space-y-2 text-sm text-[var(--rovify-text-light)] mb-4">
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="w-4 h-4 mr-2" />
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="w-4 h-4 mr-2" />
                    Max {event.maxTickets} tickets
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <FiEdit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <FiUsers className="w-4 h-4 mr-1" />
                    View Attendees
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rovify-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-[var(--app-card-border)]">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[var(--rovify-text)]">Create Blockchain Event</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-[var(--rovify-text-light)] hover:text-[var(--rovify-text)]"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={eventData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter event title"
                    className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                    Description *
                  </label>
                  <textarea
                    value={eventData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your event"
                    rows={3}
                    className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={eventData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                      Category
                    </label>
                    <select
                      value={eventData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={eventData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter event location"
                    className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      value={eventData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      placeholder="0 for free"
                      min="0"
                      step="0.01"
                      className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                      Max Tickets
                    </label>
                    <input
                      type="number"
                      value={eventData.maxTickets}
                      onChange={(e) => handleInputChange('maxTickets', parseInt(e.target.value) || 100)}
                      placeholder="100"
                      min="1"
                      className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                    Event Image URL
                  </label>
                  <input
                    type="url"
                    value={eventData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setShowCreateModal(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateEvent}
                    disabled={isLoading || !eventData.title || !eventData.description || !eventData.date || !eventData.location}
                    className="flex-1 rovify-button"
                  >
                    {isLoading ? 'Creating...' : 'Create on Blockchain'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
