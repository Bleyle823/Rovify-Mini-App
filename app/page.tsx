"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Home } from "./components/DemoComponents";
import { Features } from "./components/DemoComponents";
import { EventsPanel } from "./components/EventsPanel";
import { ProfilePanel } from "./components/ProfilePanel";
import { MainNavigation } from "./components/MainNavigation";
import { DiscoverPanel } from "./components/DiscoverPanel";
import { FeedPanel } from "./components/FeedPanel";
import { GamingPanel } from "./components/GamingPanel";
import { NFTTicketsPanel } from "./components/NFTTicketsPanel";
import { Web3ProfilePanel } from "./components/Web3ProfilePanel";
import { BlockchainEventsPanel } from "./components/BlockchainEventsPanel";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme bg-[var(--rovify-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
            <div className="flex items-center space-x-2">
              <Wallet className="z-10">
                <ConnectWallet>
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        {/* Main Navigation */}
        <MainNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1">
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
          {activeTab === "discover" && <DiscoverPanel />}
          {activeTab === "feed" && <FeedPanel />}
          {activeTab === "events" && <EventsPanel />}
          {activeTab === "stream" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">Live Streaming</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
          {activeTab === "gaming" && <GamingPanel />}
          {activeTab === "chat" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">Chat</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
          {activeTab === "groups" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">Groups</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
          {activeTab === "friends" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">Friends</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
          {activeTab === "marketplace" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">Marketplace</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
                  {activeTab === "nft-tickets" && <NFTTicketsPanel />}
          {activeTab === "tickets" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">My Tickets</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
          {activeTab === "map" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">Map</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
          {activeTab === "notifications" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">Notifications</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
          {activeTab === "profile" && <ProfilePanel />}
          {activeTab === "web3-profile" && <Web3ProfilePanel />}
          {activeTab === "blockchain-events" && <BlockchainEventsPanel />}
          {activeTab === "settings" && <div className="text-center py-8"><h3 className="text-lg font-semibold text-[var(--rovify-text)]">Settings</h3><p className="text-[var(--rovify-text-light)]">Coming soon...</p></div>}
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with Rovify Mini
          </Button>
        </footer>
      </div>
    </div>
  );
}
