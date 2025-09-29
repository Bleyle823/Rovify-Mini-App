'use client';

import { useState } from 'react';
import { Button } from './DemoComponents';
import { useWeb3 } from '../context/Web3Context';
import { 
  FiCopy, FiExternalLink, FiGift, FiSend, FiEye, FiCheck,
  FiClock, FiMapPin, FiUsers, FiTag, FiStar, FiZap
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface NFTTicketsPanelProps {
  onMintTicket?: (eventId: string, tier: string) => void;
}

export function NFTTicketsPanel({ onMintTicket }: NFTTicketsPanelProps) {
  const { 
    isConnected, 
    ownedNFTs, 
    mintNFTTicket, 
    transferNFT, 
    isMinting, 
    isTransferring,
    connectWallet 
  } = useWeb3();
  
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [transferAddress, setTransferAddress] = useState('');
  const [showTransferModal, setShowTransferModal] = useState(false);

  const handleMintTicket = async (eventId: string, tier: string) => {
    await mintNFTTicket(eventId, tier);
    if (onMintTicket) {
      onMintTicket(eventId, tier);
    }
  };

  const handleTransfer = async (tokenId: string) => {
    if (!transferAddress.trim()) return;
    await transferNFT(tokenId, transferAddress);
    setShowTransferModal(false);
    setTransferAddress('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'vip':
        return 'from-purple-500 to-purple-600';
      case 'premium':
        return 'from-blue-500 to-blue-600';
      case 'general':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
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
            Connect your wallet to view, mint, and manage your NFT tickets on the blockchain.
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
        <h2 className="text-2xl font-bold text-[var(--rovify-text)] mb-2">My NFT Tickets</h2>
        <p className="text-[var(--rovify-text-light)]">Manage your blockchain-based event tickets</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          onClick={() => handleMintTicket('1', 'VIP')}
          disabled={isMinting}
          className="rovify-button flex items-center justify-center"
        >
          <FiGift className="w-4 h-4 mr-2" />
          {isMinting ? 'Minting...' : 'Mint VIP Ticket'}
        </Button>
        <Button
          onClick={() => handleMintTicket('2', 'General')}
          disabled={isMinting}
          variant="secondary"
          className="flex items-center justify-center"
        >
          <FiTag className="w-4 h-4 mr-2" />
          {isMinting ? 'Minting...' : 'Mint General Ticket'}
        </Button>
      </div>

      {/* NFT Tickets Grid */}
      <div className="space-y-4">
        {ownedNFTs.length === 0 ? (
          <div className="rovify-card p-8 text-center">
            <FiGift className="w-12 h-12 text-[var(--rovify-text-light)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--rovify-text)] mb-2">No NFT Tickets Yet</h3>
            <p className="text-[var(--rovify-text-light)] mb-4">
              Mint your first NFT ticket to get started with blockchain-based event access.
            </p>
            <Button onClick={() => handleMintTicket('1', 'VIP')} className="rovify-button">
              Mint Your First Ticket
            </Button>
          </div>
        ) : (
          ownedNFTs.map((nft) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rovify-card overflow-hidden"
            >
              <div className="relative">
                <img
                  src={nft.image}
                  alt={nft.metadata.name}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getTierColor(nft.tier)}`}>
                  {nft.tier}
                </div>
                {nft.isUsed && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500 text-white text-sm font-semibold">
                    <FiCheck className="w-4 h-4 inline mr-1" />
                    Used
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[var(--rovify-text)] mb-2">{nft.metadata.name}</h3>
                <p className="text-sm text-[var(--rovify-text-light)] mb-3">{nft.metadata.description}</p>

                {/* Event Details */}
                <div className="space-y-2 text-sm text-[var(--rovify-text-light)] mb-4">
                  <div className="flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    {new Date(nft.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FiTag className="w-4 h-4 mr-2" />
                    Token ID: {nft.tokenId}
                  </div>
                </div>

                {/* Attributes */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[var(--rovify-text)] mb-2">Attributes</h4>
                  <div className="flex flex-wrap gap-2">
                    {nft.metadata.attributes.map((attr, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[var(--app-accent-light)] text-[var(--rovify-primary)] rounded-full text-xs"
                      >
                        {attr.trait_type}: {attr.value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedNFT(nft.id)}
                    className="flex-1"
                  >
                    <FiEye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedNFT(nft.id);
                      setShowTransferModal(true);
                    }}
                    disabled={isTransferring}
                    className="flex-1"
                  >
                    <FiSend className="w-4 h-4 mr-1" />
                    {isTransferring ? 'Transferring...' : 'Transfer'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* NFT Details Modal */}
      <AnimatePresence>
        {selectedNFT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedNFT(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rovify-card max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const nft = ownedNFTs.find(n => n.id === selectedNFT);
                if (!nft) return null;

                return (
                  <>
                    <div className="p-4 border-b border-[var(--app-card-border)]">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-[var(--rovify-text)]">NFT Details</h3>
                        <button
                          onClick={() => setSelectedNFT(null)}
                          className="text-[var(--rovify-text-light)] hover:text-[var(--rovify-text)]"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <img
                        src={nft.image}
                        alt={nft.metadata.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-[var(--rovify-text)] mb-1">Name</h4>
                          <p className="text-[var(--rovify-text-light)]">{nft.metadata.name}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[var(--rovify-text)] mb-1">Description</h4>
                          <p className="text-[var(--rovify-text-light)]">{nft.metadata.description}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[var(--rovify-text)] mb-1">Token ID</h4>
                          <div className="flex items-center space-x-2">
                            <p className="text-[var(--rovify-text-light)] font-mono">{nft.tokenId}</p>
                            <button
                              onClick={() => copyToClipboard(nft.tokenId)}
                              className="text-[var(--rovify-primary)] hover:text-[var(--rovify-primary-dark)]"
                            >
                              <FiCopy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[var(--rovify-text)] mb-1">Owner</h4>
                          <div className="flex items-center space-x-2">
                            <p className="text-[var(--rovify-text-light)] font-mono">{formatAddress(nft.owner)}</p>
                            <button
                              onClick={() => copyToClipboard(nft.owner)}
                              className="text-[var(--rovify-primary)] hover:text-[var(--rovify-primary-dark)]"
                            >
                              <FiCopy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[var(--rovify-text)] mb-2">Attributes</h4>
                          <div className="space-y-2">
                            {nft.metadata.attributes.map((attr, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-[var(--rovify-gray-light)] rounded">
                                <span className="text-sm text-[var(--rovify-text)]">{attr.trait_type}</span>
                                <span className="text-sm font-medium text-[var(--rovify-primary)]">{attr.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transfer Modal */}
      <AnimatePresence>
        {showTransferModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowTransferModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rovify-card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-[var(--app-card-border)]">
                <h3 className="text-lg font-semibold text-[var(--rovify-text)]">Transfer NFT</h3>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--rovify-text)] mb-2">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full p-3 border border-[var(--app-card-border)] rounded-lg bg-[var(--rovify-gray-light)] text-[var(--rovify-text)] placeholder-[var(--rovify-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--rovify-primary)]"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowTransferModal(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => selectedNFT && handleTransfer(selectedNFT)}
                    disabled={!transferAddress.trim() || isTransferring}
                    className="flex-1 rovify-button"
                  >
                    {isTransferring ? 'Transferring...' : 'Transfer'}
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
