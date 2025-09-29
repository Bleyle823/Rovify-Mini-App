'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { useNotification } from '@coinbase/onchainkit/minikit';

interface Web3ContextType {
  // Wallet state
  isConnected: boolean;
  address: string | undefined;
  balance: string | undefined;
  chainId: number | undefined;
  
  // NFT state
  nftTickets: NFTTicket[];
  ownedNFTs: NFTTicket[];
  
  // Token state
  tokens: TokenBalance[];
  rewards: Reward[];
  
  // Actions
  connectWallet: () => void;
  disconnectWallet: () => void;
  mintNFTTicket: (eventId: string, tier: string) => Promise<void>;
  transferNFT: (tokenId: string, to: string) => Promise<void>;
  claimReward: (rewardId: string) => Promise<void>;
  createEventOnChain: (eventData: EventData) => Promise<void>;
  
  // Loading states
  isLoading: boolean;
  isMinting: boolean;
  isTransferring: boolean;
}

interface NFTTicket {
  id: string;
  tokenId: string;
  eventId: string;
  eventTitle: string;
  tier: string;
  image: string;
  metadata: {
    name: string;
    description: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
  owner: string;
  isUsed: boolean;
  createdAt: string;
}

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  address: string;
}

interface Reward {
  id: string;
  type: 'attendance' | 'referral' | 'achievement' | 'event_creation';
  title: string;
  description: string;
  amount: string;
  token: string;
  isClaimed: boolean;
  createdAt: string;
}

interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  maxTickets: number;
  image: string;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const { address, isConnected, chainId } = useAccount();
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const sendNotification = useNotification();

  const [nftTickets, setNftTickets] = useState<NFTTicket[]>([]);
  const [ownedNFTs, setOwnedNFTs] = useState<NFTTicket[]>([]);
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  // Sample data for demonstration
  useEffect(() => {
    if (isConnected && address) {
      // Load user's NFTs
      setOwnedNFTs([
        {
          id: '1',
          tokenId: '1',
          eventId: '1',
          eventTitle: 'Summer Music Festival 2025',
          tier: 'VIP',
          image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=300&fit=crop',
          metadata: {
            name: 'VIP Ticket - Summer Music Festival',
            description: 'Exclusive VIP access to Summer Music Festival 2025',
            attributes: [
              { trait_type: 'Tier', value: 'VIP' },
              { trait_type: 'Event', value: 'Summer Music Festival' },
              { trait_type: 'Date', value: '2025-07-15' },
              { trait_type: 'Location', value: 'Central Park, NYC' }
            ]
          },
          owner: address,
          isUsed: false,
          createdAt: '2025-01-15T10:00:00Z'
        },
        {
          id: '2',
          tokenId: '2',
          eventId: '2',
          eventTitle: 'Tech Innovation Summit 2025',
          tier: 'General',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=300&fit=crop',
          metadata: {
            name: 'General Ticket - Tech Innovation Summit',
            description: 'Access to Tech Innovation Summit 2025',
            attributes: [
              { trait_type: 'Tier', value: 'General' },
              { trait_type: 'Event', value: 'Tech Innovation Summit' },
              { trait_type: 'Date', value: '2025-08-20' },
              { trait_type: 'Location', value: 'San Francisco, CA' }
            ]
          },
          owner: address,
          isUsed: false,
          createdAt: '2025-01-20T14:30:00Z'
        }
      ]);

      // Load token balances
      setTokens([
        {
          symbol: 'ETH',
          name: 'Ethereum',
          balance: balance?.formatted || '0',
          decimals: 18,
          address: '0x0000000000000000000000000000000000000000'
        },
        {
          symbol: 'ROV',
          name: 'Rovify Token',
          balance: '1250.50',
          decimals: 18,
          address: '0x1234567890123456789012345678901234567890'
        }
      ]);

      // Load rewards
      setRewards([
        {
          id: '1',
          type: 'attendance',
          title: 'Event Attendee',
          description: 'Attended 5 events this month',
          amount: '100',
          token: 'ROV',
          isClaimed: false,
          createdAt: '2025-01-25T09:00:00Z'
        },
        {
          id: '2',
          type: 'achievement',
          title: 'Early Adopter',
          description: 'One of the first 1000 users',
          amount: '500',
          token: 'ROV',
          isClaimed: true,
          createdAt: '2025-01-01T00:00:00Z'
        }
      ]);
    }
  }, [isConnected, address, balance]);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      await connect({ connector: connectors[0] });
      await sendNotification({
        title: 'Wallet Connected!',
        body: 'Your wallet has been successfully connected to Rovify.',
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      await sendNotification({
        title: 'Connection Failed',
        body: 'Failed to connect wallet. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      disconnect();
      setOwnedNFTs([]);
      setTokens([]);
      setRewards([]);
      await sendNotification({
        title: 'Wallet Disconnected',
        body: 'Your wallet has been disconnected.',
      });
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const mintNFTTicket = async (eventId: string, tier: string) => {
    if (!isConnected || !address) {
      await sendNotification({
        title: 'Wallet Not Connected',
        body: 'Please connect your wallet to mint NFT tickets.',
      });
      return;
    }

    try {
      setIsMinting(true);
      
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newNFT: NFTTicket = {
        id: Date.now().toString(),
        tokenId: Date.now().toString(),
        eventId,
        eventTitle: 'New Event',
        tier,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=300&fit=crop',
        metadata: {
          name: `${tier} Ticket - New Event`,
          description: `NFT ticket for ${tier} access`,
          attributes: [
            { trait_type: 'Tier', value: tier },
            { trait_type: 'Event', value: 'New Event' },
            { trait_type: 'Minted', value: new Date().toISOString() }
          ]
        },
        owner: address,
        isUsed: false,
        createdAt: new Date().toISOString()
      };

      setOwnedNFTs(prev => [newNFT, ...prev]);
      
      await sendNotification({
        title: 'NFT Minted!',
        body: `Your ${tier} ticket has been successfully minted.`,
      });
    } catch (error) {
      console.error('Failed to mint NFT:', error);
      await sendNotification({
        title: 'Minting Failed',
        body: 'Failed to mint NFT ticket. Please try again.',
      });
    } finally {
      setIsMinting(false);
    }
  };

  const transferNFT = async (tokenId: string, to: string) => {
    if (!isConnected || !address) {
      await sendNotification({
        title: 'Wallet Not Connected',
        body: 'Please connect your wallet to transfer NFTs.',
      });
      return;
    }

    try {
      setIsTransferring(true);
      
      // Simulate transfer process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOwnedNFTs(prev => prev.filter(nft => nft.tokenId !== tokenId));
      
      await sendNotification({
        title: 'NFT Transferred!',
        body: `NFT has been successfully transferred to ${to.slice(0, 6)}...${to.slice(-4)}.`,
      });
    } catch (error) {
      console.error('Failed to transfer NFT:', error);
      await sendNotification({
        title: 'Transfer Failed',
        body: 'Failed to transfer NFT. Please try again.',
      });
    } finally {
      setIsTransferring(false);
    }
  };

  const claimReward = async (rewardId: string) => {
    if (!isConnected || !address) {
      await sendNotification({
        title: 'Wallet Not Connected',
        body: 'Please connect your wallet to claim rewards.',
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate claiming process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRewards(prev => prev.map(reward => 
        reward.id === rewardId ? { ...reward, isClaimed: true } : reward
      ));
      
      const reward = rewards.find(r => r.id === rewardId);
      if (reward) {
        setTokens(prev => prev.map(token => 
          token.symbol === reward.token 
            ? { ...token, balance: (parseFloat(token.balance) + parseFloat(reward.amount)).toString() }
            : token
        ));
      }
      
      await sendNotification({
        title: 'Reward Claimed!',
        body: `You've successfully claimed ${reward?.amount} ${reward?.token} tokens.`,
      });
    } catch (error) {
      console.error('Failed to claim reward:', error);
      await sendNotification({
        title: 'Claim Failed',
        body: 'Failed to claim reward. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createEventOnChain = async (eventData: EventData) => {
    if (!isConnected || !address) {
      await sendNotification({
        title: 'Wallet Not Connected',
        body: 'Please connect your wallet to create events on-chain.',
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate on-chain event creation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      await sendNotification({
        title: 'Event Created!',
        body: `Your event "${eventData.title}" has been created on-chain.`,
      });
    } catch (error) {
      console.error('Failed to create event on-chain:', error);
      await sendNotification({
        title: 'Creation Failed',
        body: 'Failed to create event on-chain. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value: Web3ContextType = {
    isConnected,
    address,
    balance: balance?.formatted,
    chainId,
    nftTickets,
    ownedNFTs,
    tokens,
    rewards,
    connectWallet,
    disconnectWallet,
    mintNFTTicket,
    transferNFT,
    claimReward,
    createEventOnChain,
    isLoading,
    isMinting,
    isTransferring,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
