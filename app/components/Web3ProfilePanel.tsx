'use client';

import { useState } from 'react';
import { Button } from './DemoComponents';
import { useWeb3 } from '../context/Web3Context';
import { 
  FiCopy, FiExternalLink, FiGift, FiZap, FiTrendingUp, FiAward,
  FiClock, FiMapPin, FiUsers, FiTag, FiStar, FiCheck, FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export function Web3ProfilePanel() {
  const { 
    isConnected, 
    address, 
    balance, 
    chainId,
    tokens, 
    rewards, 
    claimReward,
    isLoading,
    connectWallet 
  } = useWeb3();
  
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: string) => {
    return parseFloat(balance).toFixed(4);
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <FiUsers className="w-5 h-5" />;
      case 'referral':
        return <FiTrendingUp className="w-5 h-5" />;
      case 'achievement':
        return <FiAward className="w-5 h-5" />;
      case 'event_creation':
        return <FiZap className="w-5 h-5" />;
      default:
        return <FiGift className="w-5 h-5" />;
    }
  };

  const getRewardColor = (type: string) => {
    switch (type) {
      case 'attendance':
        return 'text-blue-600 bg-blue-50';
      case 'referral':
        return 'text-green-600 bg-green-50';
      case 'achievement':
        return 'text-purple-600 bg-purple-50';
      case 'event_creation':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
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
            Connect your wallet to view your Web3 profile, token balances, and rewards.
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--rovify-text)] mb-2">Web3 Profile</h2>
        <p className="text-[var(--rovify-text-light)]">Your blockchain identity and assets</p>
      </div>

      {/* Wallet Info */}
      <div className="rovify-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--rovify-text)]">Wallet Information</h3>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Connected
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-[var(--rovify-text-light)]">Address</label>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-[var(--rovify-text)] font-mono">{formatAddress(address!)}</p>
              <button
                onClick={() => copyToClipboard(address!)}
                className="text-[var(--rovify-primary)] hover:text-[var(--rovify-primary-dark)]"
              >
                <FiCopy className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.open(`https://basescan.org/address/${address}`, '_blank')}
                className="text-[var(--rovify-primary)] hover:text-[var(--rovify-primary-dark)]"
              >
                <FiExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--rovify-text-light)]">Network</label>
            <p className="text-[var(--rovify-text)] mt-1">Base (Chain ID: {chainId})</p>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--rovify-text-light)]">ETH Balance</label>
            <p className="text-[var(--rovify-text)] mt-1">{formatBalance(balance || '0')} ETH</p>
          </div>
        </div>
      </div>

      {/* Token Balances */}
      <div className="rovify-card p-6 mb-6">
        <h3 className="text-lg font-semibold text-[var(--rovify-text)] mb-4">Token Balances</h3>
        <div className="space-y-3">
          {tokens.map((token, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[var(--rovify-gray-light)] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[var(--rovify-primary)] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {token.symbol === 'ETH' ? 'Ξ' : token.symbol[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[var(--rovify-text)]">{token.symbol}</p>
                  <p className="text-sm text-[var(--rovify-text-light)]">{token.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[var(--rovify-text)]">
                  {parseFloat(token.balance).toLocaleString()}
                </p>
                <p className="text-sm text-[var(--rovify-text-light)]">{token.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div className="rovify-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--rovify-text)]">Rewards</h3>
          <span className="text-sm text-[var(--rovify-text-light)]">
            {rewards.filter(r => !r.isClaimed).length} unclaimed
          </span>
        </div>

        <div className="space-y-3">
          {rewards.length === 0 ? (
            <div className="text-center py-8">
              <FiGift className="w-12 h-12 text-[var(--rovify-text-light)] mx-auto mb-4" />
              <p className="text-[var(--rovify-text-light)]">No rewards available</p>
            </div>
          ) : (
            rewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${
                  reward.isClaimed 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-[var(--rovify-gray-light)] border-[var(--app-card-border)]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getRewardColor(reward.type)}`}>
                      {getRewardIcon(reward.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[var(--rovify-text)]">{reward.title}</h4>
                      <p className="text-sm text-[var(--rovify-text-light)] mt-1">{reward.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm font-semibold text-[var(--rovify-primary)]">
                          {reward.amount} {reward.token}
                        </span>
                        <span className="text-xs text-[var(--rovify-text-light)]">
                          {new Date(reward.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {reward.isClaimed ? (
                      <span className="flex items-center text-green-600 text-sm">
                        <FiCheck className="w-4 h-4 mr-1" />
                        Claimed
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => claimReward(reward.id)}
                        disabled={isLoading}
                        className="rovify-button"
                      >
                        {isLoading ? 'Claiming...' : 'Claim'}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Blockchain Stats */}
      <div className="rovify-card p-6">
        <h3 className="text-lg font-semibold text-[var(--rovify-text)] mb-4">Blockchain Activity</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-[var(--rovify-gray-light)] rounded-lg">
            <div className="text-2xl font-bold text-[var(--rovify-primary)]">12</div>
            <div className="text-sm text-[var(--rovify-text-light)]">NFTs Owned</div>
          </div>
          <div className="text-center p-4 bg-[var(--rovify-gray-light)] rounded-lg">
            <div className="text-2xl font-bold text-[var(--rovify-primary)]">8</div>
            <div className="text-sm text-[var(--rovify-text-light)]">Events Attended</div>
          </div>
          <div className="text-center p-4 bg-[var(--rovify-gray-light)] rounded-lg">
            <div className="text-2xl font-bold text-[var(--rovify-primary)]">3</div>
            <div className="text-sm text-[var(--rovify-text-light)]">Events Created</div>
          </div>
          <div className="text-center p-4 bg-[var(--rovify-gray-light)] rounded-lg">
            <div className="text-2xl font-bold text-[var(--rovify-primary)]">1,250</div>
            <div className="text-sm text-[var(--rovify-text-light)]">ROV Tokens</div>
          </div>
        </div>
      </div>
    </div>
  );
}
