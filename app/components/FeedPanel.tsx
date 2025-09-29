'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeart, FiMessageCircle, FiShare, FiMoreHorizontal, FiPlus,
  FiImage, FiVideo, FiMapPin, FiCalendar, FiUsers, FiTag
} from 'react-icons/fi';
import { 
  BsHeartFill, BsChatDots, BsShare, BsThreeDots, BsCamera,
  BsPlayCircle, BsGeoAlt, BsCalendarEvent, BsPeople
} from 'react-icons/bs';
import { Button } from './DemoComponents';
import { Icon } from './DemoComponents';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
    handle: string;
  };
  content: string;
  image?: string;
  video?: string;
  event?: {
    id: string;
    title: string;
    date: string;
    location: string;
    image: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  type: 'text' | 'image' | 'video' | 'event';
}

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  isViewed: boolean;
}

const SAMPLE_STORIES: Story[] = [
  {
    id: "1",
    user: { name: "Alex", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=300&fit=crop",
    isViewed: false
  },
  {
    id: "2",
    user: { name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=300&fit=crop",
    isViewed: true
  },
  {
    id: "3",
    user: { name: "Mike", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop",
    isViewed: false
  },
  {
    id: "4",
    user: { name: "Emma", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=300&fit=crop",
    isViewed: true
  }
];

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true,
      handle: "@alexj"
    },
    content: "Just had an amazing time at the Summer Music Festival! The energy was incredible and the lineup was perfect. Can't wait for next year! 🎵✨",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=300&fit=crop",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
    type: 'image'
  },
  {
    id: "2",
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      verified: false,
      handle: "@sarahc"
    },
    content: "Excited to announce that I'll be speaking at the Tech Innovation Summit next month! Looking forward to sharing insights about the future of AI and machine learning.",
    event: {
      id: "2",
      title: "Tech Innovation Summit 2025",
      date: "2025-08-20",
      location: "Convention Center, SF",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=120&fit=crop"
    },
    timestamp: "4 hours ago",
    likes: 45,
    comments: 12,
    shares: 7,
    isLiked: true,
    type: 'event'
  },
  {
    id: "3",
    user: {
      name: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: true,
      handle: "@miker"
    },
    content: "Check out this amazing digital art piece I created! The future of art is here 🎨",
    video: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    timestamp: "6 hours ago",
    likes: 67,
    comments: 15,
    shares: 9,
    isLiked: false,
    type: 'video'
  },
  {
    id: "4",
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      verified: false,
      handle: "@emmaw"
    },
    content: "Just discovered this amazing new gaming event happening next weekend! Who's going? 🎮",
    timestamp: "8 hours ago",
    likes: 18,
    comments: 5,
    shares: 2,
    isLiked: false,
    type: 'text'
  }
];

function StoryItem({ story }: { story: Story }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-16 h-16 rounded-full p-0.5 ${
        story.isViewed ? 'bg-gray-300' : 'bg-gradient-to-tr from-[var(--rovify-primary)] to-[var(--rovify-primary-light)]'
      }`}>
        <img 
          src={story.user.avatar} 
          alt={story.user.name}
          className="w-full h-full rounded-full object-cover border-2 border-white"
        />
      </div>
      <span className="text-xs text-[var(--rovify-text-light)] mt-1 truncate max-w-16">
        {story.user.name}
      </span>
    </div>
  );
}

function PostItem({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rovify-card p-4 mb-4"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img 
            src={post.user.avatar} 
            alt={post.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="flex items-center">
              <h4 className="font-semibold text-[var(--rovify-text)]">{post.user.name}</h4>
              {post.user.verified && (
                <span className="ml-1 text-blue-500 text-sm">✓</span>
              )}
            </div>
            <p className="text-sm text-[var(--rovify-text-light)]">{post.user.handle} • {post.timestamp}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-[var(--rovify-gray-light)] rounded-full transition-colors">
          <FiMoreHorizontal className="w-5 h-5 text-[var(--rovify-text-light)]" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        <p className="text-[var(--rovify-text)] leading-relaxed">{post.content}</p>
      </div>

      {/* Post Media */}
      {post.image && (
        <div className="mb-3 rounded-xl overflow-hidden">
          <img 
            src={post.image} 
            alt="Post content"
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {post.video && (
        <div className="mb-3 rounded-xl overflow-hidden relative">
          <img 
            src={post.video} 
            alt="Post content"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BsPlayCircle className="w-16 h-16 text-white opacity-80" />
          </div>
        </div>
      )}

      {/* Event Card */}
      {post.event && (
        <div className="mb-3 border border-[var(--app-card-border)] rounded-xl overflow-hidden">
          <div className="flex">
            <img 
              src={post.event.image} 
              alt={post.event.title}
              className="w-24 h-24 object-cover"
            />
            <div className="p-3 flex-1">
              <h5 className="font-semibold text-[var(--rovify-text)] mb-1">{post.event.title}</h5>
              <div className="space-y-1 text-sm text-[var(--rovify-text-light)]">
                <div className="flex items-center">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  {post.event.date}
                </div>
                <div className="flex items-center">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  {post.event.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--app-card-border)]">
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLike}
            className="flex items-center space-x-2 hover:bg-[var(--rovify-gray-light)] px-3 py-2 rounded-lg transition-colors"
          >
            {isLiked ? (
              <BsHeartFill className="w-5 h-5 text-red-500" />
            ) : (
              <FiHeart className="w-5 h-5 text-[var(--rovify-text-light)]" />
            )}
            <span className="text-sm text-[var(--rovify-text-light)]">{likes}</span>
          </button>
          
          <button className="flex items-center space-x-2 hover:bg-[var(--rovify-gray-light)] px-3 py-2 rounded-lg transition-colors">
            <FiMessageCircle className="w-5 h-5 text-[var(--rovify-text-light)]" />
            <span className="text-sm text-[var(--rovify-text-light)]">{post.comments}</span>
          </button>
          
          <button className="flex items-center space-x-2 hover:bg-[var(--rovify-gray-light)] px-3 py-2 rounded-lg transition-colors">
            <FiShare className="w-5 h-5 text-[var(--rovify-text-light)]" />
            <span className="text-sm text-[var(--rovify-text-light)]">{post.shares}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeedPanel() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [stories, setStories] = useState<Story[]>(SAMPLE_STORIES);
  const [newPost, setNewPost] = useState('');

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          verified: true,
          handle: "@you"
        },
        content: newPost,
        timestamp: "now",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        type: 'text'
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--rovify-text)] mb-2">Feed</h2>
        <p className="text-[var(--rovify-text-light)]">Stay connected with your community</p>
      </div>

      {/* Create Post */}
      <div className="rovify-card p-4 mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="What's happening?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="flex-1 bg-[var(--rovify-gray-light)] rounded-full px-4 py-2 text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-[var(--rovify-text-light)] hover:text-[var(--rovify-primary)] transition-colors">
              <FiImage className="w-5 h-5" />
              <span className="text-sm">Photo</span>
            </button>
            <button className="flex items-center space-x-2 text-[var(--rovify-text-light)] hover:text-[var(--rovify-primary)] transition-colors">
              <FiVideo className="w-5 h-5" />
              <span className="text-sm">Video</span>
            </button>
            <button className="flex items-center space-x-2 text-[var(--rovify-text-light)] hover:text-[var(--rovify-primary)] transition-colors">
              <FiMapPin className="w-5 h-5" />
              <span className="text-sm">Location</span>
            </button>
          </div>
          <Button 
            onClick={handleCreatePost}
            disabled={!newPost.trim()}
            className="rovify-button"
          >
            Post
          </Button>
        </div>
      </div>

      {/* Stories */}
      <div className="rovify-card p-4 mb-6">
        <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[var(--rovify-primary)] to-[var(--rovify-primary-light)]">
              <div className="w-full h-full rounded-full bg-[var(--rovify-gray-light)] flex items-center justify-center">
                <FiPlus className="w-6 h-6 text-[var(--rovify-primary)]" />
              </div>
            </div>
            <span className="text-xs text-[var(--rovify-text-light)] mt-1">Your Story</span>
          </div>
          {stories.map((story) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        <AnimatePresence>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
