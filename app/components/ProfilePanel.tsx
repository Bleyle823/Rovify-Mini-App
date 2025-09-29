'use client';

import { useState } from 'react';
import { Button } from './DemoComponents';
import { Icon } from './DemoComponents';
import { FiUser, FiMail, FiMapPin, FiCalendar, FiSettings, FiHeart, FiEdit3 } from 'react-icons/fi';
import { IoTicketOutline } from 'react-icons/io5';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  joinDate: string;
  bio: string;
  stats: {
    eventsAttended: number;
    eventsCreated: number;
    followers: number;
    following: number;
  };
  interests: string[];
  recentActivity: {
    id: string;
    type: 'event' | 'ticket' | 'follow';
    title: string;
    date: string;
    description: string;
  }[];
}

// Sample user profile data
const SAMPLE_PROFILE: UserProfile = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  location: "San Francisco, CA",
  joinDate: "2024-01-15",
  bio: "Event enthusiast and music lover. Always looking for the next great experience!",
  stats: {
    eventsAttended: 24,
    eventsCreated: 3,
    followers: 156,
    following: 89
  },
  interests: ["Music", "Technology", "Art", "Food & Drink", "Outdoor"],
  recentActivity: [
    {
      id: "1",
      type: "event",
      title: "Attended Summer Music Festival",
      date: "2024-07-15",
      description: "Had an amazing time at the music festival!"
    },
    {
      id: "2",
      type: "ticket",
      title: "Purchased ticket for Tech Conference",
      date: "2024-08-10",
      description: "Excited to learn about the latest in AI and technology"
    },
    {
      id: "3",
      type: "follow",
      title: "Started following Sarah Chen",
      date: "2024-08-05",
      description: "Great event organizer with amazing taste in music"
    }
  ]
};

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rovify-card p-4 text-center animate-fade-in">
      <div className="flex justify-center mb-2 text-[var(--rovify-primary)]">
        {icon}
      </div>
      <div className="text-2xl font-bold text-[var(--rovify-text)]">{value}</div>
      <div className="text-sm text-[var(--rovify-text-light)]">{label}</div>
    </div>
  );
}

function ActivityItem({ activity }: { activity: UserProfile['recentActivity'][0] }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <FiCalendar className="w-4 h-4" />;
      case 'ticket':
        return <IoTicketOutline className="w-4 h-4" />;
      case 'follow':
        return <FiUser className="w-4 h-4" />;
      default:
        return <FiCalendar className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'text-green-600 bg-green-50';
      case 'ticket':
        return 'text-blue-600 bg-blue-50';
      case 'follow':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rovify-card animate-fade-in">
      <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-[var(--rovify-text)]">{activity.title}</h4>
        <p className="text-sm text-[var(--rovify-text-light)] mt-1">{activity.description}</p>
        <p className="text-xs text-[var(--rovify-text-light)] mt-1">{new Date(activity.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export function ProfilePanel() {
  const [profile] = useState<UserProfile>(SAMPLE_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="rovify-card p-6 mb-6 animate-fade-in">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg animate-float"
            />
            <div>
              <h1 className="text-2xl font-bold text-[var(--rovify-text)]">{profile.name}</h1>
              <p className="text-[var(--rovify-text-light)] flex items-center">
                <FiMapPin className="w-4 h-4 mr-1" />
                {profile.location}
              </p>
              <p className="text-sm text-[var(--rovify-text-light)] flex items-center">
                <FiCalendar className="w-4 h-4 mr-1" />
                Joined {formatJoinDate(profile.joinDate)}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="hover:bg-[var(--app-accent-light)]"
          >
            <FiEdit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <p className="text-[var(--rovify-text)] mb-4">{profile.bio}</p>
        
        {/* Interests */}
        <div>
          <h3 className="text-sm font-medium text-[var(--rovify-text)] mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span 
                key={interest}
                className="px-3 py-1 bg-[var(--app-accent-light)] text-[var(--rovify-primary)] rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard 
          label="Events Attended" 
          value={profile.stats.eventsAttended} 
          icon={<FiCalendar className="w-6 h-6" />} 
        />
        <StatCard 
          label="Events Created" 
          value={profile.stats.eventsCreated} 
          icon={<IoTicketOutline className="w-6 h-6" />} 
        />
        <StatCard 
          label="Followers" 
          value={profile.stats.followers} 
          icon={<FiUser className="w-6 h-6" />} 
        />
        <StatCard 
          label="Following" 
          value={profile.stats.following} 
          icon={<FiHeart className="w-6 h-6" />} 
        />
      </div>

      {/* Recent Activity */}
      <div className="rovify-card p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-[var(--rovify-text)] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {profile.recentActivity.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
