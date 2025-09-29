'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiCompass, FiPlus, FiUser, FiTag, FiSearch, FiBell,
  FiMessageCircle, FiMapPin, FiCalendar, FiHeart, FiSettings,
  FiShoppingBag, FiCamera, FiUsers, FiTrendingUp, FiZap
} from 'react-icons/fi';
import { 
  BsCameraVideoFill, BsController, BsTicket, BsShop, BsChatDots,
  BsMap, BsCalendarEvent, BsHeart, BsGear, BsBell
} from 'react-icons/bs';
import { 
  IoGameControllerOutline, IoTicketOutline, IoStorefrontOutline,
  IoChatbubblesOutline, IoLocationOutline, IoCalendarOutline,
  IoHeartOutline, IoSettingsOutline, IoNotificationsOutline
} from 'react-icons/io5';
import { MdOutlineAddBox, MdOutlineNotifications } from 'react-icons/md';
import { AiOutlineShop } from 'react-icons/ai';

interface NavigationItem {
  id: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  category: 'main' | 'social' | 'commerce' | 'entertainment' | 'tools';
  isNew?: boolean;
  isPro?: boolean;
}

interface MainNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

export function MainNavigation({ activeTab, setActiveTab, className = '' }: MainNavigationProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showAllTabs, setShowAllTabs] = useState(false);

  const navigationItems: NavigationItem[] = useMemo(() => [
    // Main Features
    { id: 'home', href: '/home', icon: <FiHome />, label: 'Home', description: 'Discover events', category: 'main' },
    { id: 'discover', href: '/discover', icon: <FiCompass />, label: 'Discover', description: 'Explore events', category: 'main' },
    { id: 'feed', href: '/feed', icon: <MdOutlineAddBox />, label: 'Feed', description: 'Social feed', category: 'main' },
    { id: 'events', href: '/events', icon: <FiCalendar />, label: 'Events', description: 'Browse events', category: 'main' },
    
    // Social Features
    { id: 'stream', href: '/stream', icon: <BsCameraVideoFill />, label: 'Live', description: 'Live streaming', category: 'entertainment' },
    { id: 'gaming', href: '/gaming', icon: <BsController />, label: 'Gaming', description: 'Gaming hub', category: 'entertainment' },
    { id: 'chat', href: '/chat', icon: <BsChatDots />, label: 'Chat', description: 'Messaging', category: 'social' },
    { id: 'groups', href: '/groups', icon: <FiUsers />, label: 'Groups', description: 'Join communities', category: 'social' },
    { id: 'friends', href: '/friends', icon: <FiHeart />, label: 'Friends', description: 'Connect with friends', category: 'social' },
    
    // Commerce Features
    { id: 'marketplace', href: '/marketplace', icon: <BsShop />, label: 'Marketplace', description: 'Buy & sell', category: 'commerce' },
    { id: 'nft-tickets', href: '/nft-tickets', icon: <BsTicket />, label: 'NFT Tickets', description: 'Digital tickets', category: 'commerce', isNew: true },
    { id: 'tickets', href: '/tickets', icon: <IoTicketOutline />, label: 'My Tickets', description: 'Your tickets', category: 'commerce' },
    
    // Blockchain Features
    { id: 'web3-profile', href: '/web3-profile', icon: <FiZap />, label: 'Web3', description: 'Blockchain profile', category: 'tools', isNew: true },
    { id: 'blockchain-events', href: '/blockchain-events', icon: <FiCalendar />, label: 'Create', description: 'On-chain events', category: 'tools', isNew: true },
    
    // Tools & Utilities
    { id: 'map', href: '/map', icon: <BsMap />, label: 'Map', description: 'Event locations', category: 'tools' },
    { id: 'notifications', href: '/notifications', icon: <BsBell />, label: 'Notifications', description: 'Stay updated', category: 'tools' },
    { id: 'profile', href: '/profile', icon: <FiUser />, label: 'Profile', description: 'Your profile', category: 'tools' },
    { id: 'settings', href: '/settings', icon: <FiSettings />, label: 'Settings', description: 'App settings', category: 'tools' },
  ], []);

  const mainTabs = navigationItems.filter(item => item.category === 'main');
  const otherTabs = navigationItems.filter(item => item.category !== 'main');

  const isActiveRoute = useCallback((id: string): boolean => {
    return activeTab === id;
  }, [activeTab]);

  const handleTabClick = useCallback((id: string) => {
    setActiveTab(id);
  }, [setActiveTab]);

  return (
    <div className={`w-full ${className}`}>
      {/* Main Navigation */}
      <nav className="flex justify-center mb-4">
        <div className="flex bg-[var(--rovify-gray-light)] rounded-lg p-1 max-w-full overflow-x-auto no-scrollbar">
          {mainTabs.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap flex items-center ${
                isActiveRoute(item.id)
                  ? 'rovify-badge'
                  : 'hover:bg-[var(--app-accent-light)] text-[var(--rovify-text-light)] hover:text-[var(--rovify-text)]'
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
              {item.isNew && (
                <span className="ml-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          ))}
          
          {/* Show More Button */}
          <button
            onClick={() => setShowAllTabs(!showAllTabs)}
            className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:bg-[var(--app-accent-light)] text-[var(--rovify-text-light)] hover:text-[var(--rovify-text)]"
          >
            <FiPlus className="mr-1" />
            More
          </button>
        </div>
      </nav>

      {/* Expanded Navigation */}
      <AnimatePresence>
        {showAllTabs && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="bg-[var(--rovify-card-bg)] rounded-xl p-4 shadow-sm border border-[var(--app-card-border)]">
              <div className="grid grid-cols-2 gap-2">
                {otherTabs.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleTabClick(item.id);
                      setShowAllTabs(false);
                    }}
                    className={`p-3 rounded-lg text-left transition-all duration-300 flex items-center ${
                      isActiveRoute(item.id)
                        ? 'bg-[var(--app-accent-light)] text-[var(--rovify-primary)]'
                        : 'hover:bg-[var(--rovify-gray-light)] text-[var(--rovify-text)]'
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-[var(--rovify-text-light)]">{item.description}</div>
                    </div>
                    {item.isNew && (
                      <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
