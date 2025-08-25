// src/components/dashboard/DashboardLayout.tsx
import React from 'react';
import EnhancedSidebar from './EnhancedSidebar';
import ProjectDashboard from './ProjectDashboard';
import { AppView } from '../../types/index';
import MarketplaceView from '../marketplace/MarketplaceView';
import WalletView from '../wallet/WalletView';
import AstraSupplyChainView from '../AstraSupplyChainView';
import GuildsView from '../guilds/GuildsView';
import { AuraCommandCenter } from '../AuraOS/AuraCommandCenter';
import BrahmaAstraEngineView from '../brahmaAstra/BrahmaAstraEngineView';
import ChroniclesView from '../chronicles/ChroniclesView';
import RealEstateExchangeView from '../exchange/RealEstateExchangeView';
import DeveloperHubView from '../developer/DeveloperHubView';
import StoryboardEngine from '../../features/StoryboardEngine';
import AtmanForgeView from '../atman-forge/AtmanForgeView';
import SutraEngineView from '../../features/sutra-engine/pages/SutraEngineView';
import WorkspaceSettingsView from './WorkspaceSettingsView';
import EnhancedUnifiedAIPlatform from '../../pages/EnhancedUnifiedAIPlatform';
import EnhancedDashboard from './EnhancedDashboard';

interface DashboardLayoutProps {
    view: AppView;
}

const renderView = (view: AppView) => {
    switch (view) {
        case 'userDashboard': return <EnhancedDashboard />;
        case 'unifiedAIPlatform': return <EnhancedUnifiedAIPlatform />;
        case 'marketplace': return <MarketplaceView />;
        case 'wallet': return <WalletView />;
        case 'astraSupplyChain': return <AstraSupplyChainView />;
        case 'guilds': return <GuildsView />;
        case 'chronicles': return <ChroniclesView />;
        case 'realEstateExchange': return <RealEstateExchangeView />;
        case 'auraCommandCenter': return <AuraCommandCenter />;
        case 'brahmaAstra': return <BrahmaAstraEngineView />;
        case 'developer': return <DeveloperHubView />;
        case 'storyboard': return <StoryboardEngine />;
        case 'atmanForge': return <AtmanForgeView />;
        case 'sutraEngine': return <SutraEngineView />;
        case 'workspaceSettings': return <WorkspaceSettingsView />;
        // Add other views here as they are integrated into the dashboard
        default: return <EnhancedDashboard />;
    }
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ view }) => {
    return (
        <div className="flex h-screen w-screen">
            <EnhancedSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {renderView(view)}
            </div>
        </div>
    );
};

export default DashboardLayout;