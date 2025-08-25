import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../state/appStore';
import { DakshinVaarahiLogo } from '../icons/DakshinVaarahiLogo';
import { AppView } from '../../types/index';
import { 
  Home, 
  Brain, 
  Zap, 
  Sparkles, 
  Settings, 
  HelpCircle, 
  LogOut, 
  User,
  ChevronRight,
  Star,
  Crown,
  Flame,
  ScrollText,
  Film,
  ShoppingCart,
  TrendingUp,
  Building2,
  Users,
  BookOpen,
  Code,
  Wallet,
  Network,
  Command
} from 'lucide-react';

interface NavItem {
  view: AppView;
  title: string;
  icon: React.ReactNode;
  isOwnerOnly?: boolean;
  isPremium?: boolean;
  isNew?: boolean;
  description?: string;
}

const EnhancedSidebar: React.FC = () => {
  const { view: currentView, setView, currentUser } = useAppStore();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      view: 'userDashboard',
      title: 'Mission Control',
      icon: <Home className="w-5 h-5" />,
      description: 'Main dashboard and overview'
    },
    {
      view: 'unifiedAIPlatform',
      title: 'AI Platform',
      icon: <Brain className="w-5 h-5" />,
      description: 'Unified AI platform hub',
      isNew: true
    },
    {
      view: 'workspaceSettings',
      title: 'Workspace',
      icon: <Settings className="w-5 h-5" />,
      description: 'Workspace configuration'
    },
    {
      view: 'brahmaAstra',
      title: 'Brahma-Astra',
      icon: <Star className="w-5 h-5" />,
      description: 'Advanced AI engine',
      isPremium: true
    },
    {
      view: 'atmanForge',
      title: 'Atman Forge',
      icon: <Flame className="w-5 h-5" />,
      description: 'AI model creation'
    },
    {
      view: 'sutraEngine',
      title: 'Sutra Engine',
      icon: <ScrollText className="w-5 h-5" />,
      description: 'Text processing engine'
    },
    {
      view: 'storyboard',
      title: 'Storyboard Engine',
      icon: <Film className="w-5 h-5" />,
      description: 'Visual storytelling AI'
    },
    {
      view: 'marketplace',
      title: 'Marketplace',
      icon: <ShoppingCart className="w-5 h-5" />,
      description: 'AI models and services'
    },
    {
      view: 'realEstateExchange',
      title: 'Real Estate Exchange',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Property trading platform'
    },
    {
      view: 'guilds',
      title: 'Guilds',
      icon: <Users className="w-5 h-5" />,
      description: 'Community collaboration'
    },
    {
      view: 'chronicles',
      title: 'Chronicles',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Knowledge repository'
    },
    {
      view: 'wallet',
      title: 'Wallet',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Digital asset management'
    },
    {
      view: 'astraSupplyChain',
      title: 'Astra Network',
      icon: <Network className="w-5 h-5" />,
      description: 'Supply chain management'
    },
    {
      view: 'developer',
      title: 'Developer Hub',
      icon: <Code className="w-5 h-5" />,
      description: 'Development tools and APIs'
    },
    {
      view: 'auraCommandCenter',
      title: 'Command Center',
      icon: <Command className="w-5 h-5" />,
      description: 'System administration',
      isOwnerOnly: true
    }
  ];

  const handleItemClick = (view: AppView) => {
    setView(view);
    setExpandedItem(null);
  };

  const handleItemHover = (title: string) => {
    if (!isCollapsed) {
      setExpandedItem(title);
    }
  };

  const handleItemLeave = () => {
    setExpandedItem(null);
  };

  if (!currentUser) return null;

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 overflow-hidden"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-600 transition-all duration-200 z-20"
      >
        <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      <div className="flex flex-col h-full">
        {/* Top Section: Logo and Main Nav */}
        <div className="flex flex-col items-center gap-4 p-4">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleItemClick('userDashboard')}
            className="w-12 h-12 mb-4 flex items-center justify-center transition-all duration-300"
            aria-label="Go to Dashboard"
          >
            <DakshinVaarahiLogo className="w-auto h-12" />
          </motion.button>

          <nav className="flex flex-col gap-2 w-full">
            {navItems.map((item) => {
              if (item.isOwnerOnly && currentUser?.role !== 'owner') {
                return null;
              }

              const isActive = currentView === item.view;
              const isExpanded = expandedItem === item.title;

              return (
                <div
                  key={item.view}
                  className="relative group"
                  onMouseEnter={() => handleItemHover(item.title)}
                  onMouseLeave={handleItemLeave}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item.view)}
                    className={`w-full h-12 flex items-center gap-3 px-3 rounded-xl transition-all duration-200 ease-in-out ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25' 
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    } ${item.isPremium && !isActive ? 'premium-glow border border-yellow-500/50' : ''}`}
                    aria-label={item.title}
                  >
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {item.icon}
                    </div>
                    
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.title}</span>
                          {item.isNew && (
                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                              NEW
                            </span>
                          )}
                          {item.isPremium && (
                            <Star className="w-3 h-3 text-yellow-400" />
                          )}
                        </div>
                      </div>
                    )}
                  </motion.button>

                  {/* Expanded Tooltip */}
                  <AnimatePresence>
                    {isExpanded && isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute left-full ml-3 px-4 py-3 bg-slate-800 text-white rounded-xl shadow-xl border border-slate-700 whitespace-nowrap z-50 min-w-[200px]"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{item.title}</div>
                            {item.description && (
                              <div className="text-xs text-slate-400">{item.description}</div>
                            )}
                          </div>
                        </div>
                        
                        {item.isNew && (
                          <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full inline-block">
                            ✨ New Feature
                          </div>
                        )}
                        
                        {item.isPremium && (
                          <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full inline-block">
                            ⭐ Premium
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: User, Settings, Logout */}
        <div className="mt-auto flex flex-col items-center gap-3 p-4 border-t border-slate-700/50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => useAppStore.setState({ helpModalOpen: true })}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            aria-label="Help & Support"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => useAppStore.getState().logout()}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => useAppStore.setState({ profilePageOpen: true })}
            className="relative"
            aria-label="Profile & Settings"
          >
            <img
              src={currentUser.profileImageUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${currentUser.name || currentUser.email}`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-slate-600 hover:border-blue-500 transition-all duration-300"
            />
            
            {/* User Role Badge */}
            {currentUser.role === 'owner' && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </motion.aside>
  );
};

export default EnhancedSidebar;
