import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../state/appStore';
import { DakshinVaarahiLogo } from '../icons/DakshinVaarahiLogo';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Shield,
  Zap,
  Star,
  Crown,
  ChevronRight
} from 'lucide-react';

const EnhancedHeader: React.FC = () => {
  const { currentUser, logout, setProfilePageOpen, setHelpModalOpen } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [notifications] = useState([
    {
      id: 1,
      title: 'AI Model Training Complete',
      message: 'Your BERT model has finished training successfully',
      time: '2 minutes ago',
      type: 'success',
      unread: true
    },
    {
      id: 2,
      title: 'System Update Available',
      message: 'New features and improvements are ready to install',
      time: '1 hour ago',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'New Collaboration Request',
      message: 'John Doe wants to collaborate on Project Alpha',
      time: '3 hours ago',
      type: 'warning',
      unread: false
    }
  ]);

  const [quickActions] = useState([
    { title: 'AI Platform', icon: <Zap className="w-4 h-4" />, href: '/ai-platform', badge: 'New' },
    { title: 'Marketplace', icon: <Star className="w-4 h-4" />, href: '/marketplace' },
    { title: 'Documentation', icon: <HelpCircle className="w-4 h-4" />, href: '/docs' },
    { title: 'Support', icon: <Shield className="w-4 h-4" />, href: '/support' }
  ]);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleNotificationClick = (notificationId: number) => {
    // Mark notification as read
    console.log('Notification clicked:', notificationId);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement theme switching
    document.documentElement.classList.toggle('dark');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <DakshinVaarahiLogo className="w-auto h-8" />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {quickActions.map((action) => (
                <motion.a
                  key={action.title}
                  href={action.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-all duration-200 group"
                >
                  <div className="text-slate-500 group-hover:text-blue-500 transition-colors">
                    {action.icon}
                  </div>
                  <span className="font-medium">{action.title}</span>
                  {action.badge && (
                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                      {action.badge}
                    </span>
                  )}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Center Section: Search */}
          <div className="flex-1 max-w-lg mx-8 hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search AI models, features, or documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </form>
          </div>

          {/* Right Section: Actions and User Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-slate-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Notifications</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ backgroundColor: 'rgb(248 250 252)' }}
                          className={`px-4 py-3 border-b border-slate-100 last:border-b-0 cursor-pointer transition-colors ${
                            notification.unread ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 mb-1">{notification.title}</h4>
                              <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                              <span className="text-xs text-slate-500">{notification.time}</span>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="px-4 py-2 border-t border-slate-200">
                      <a href="/notifications" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View all notifications
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-all duration-200"
              >
                <img
                  src={currentUser?.profileImageUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${currentUser?.name || currentUser?.email}`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-slate-200"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-slate-900">{currentUser?.name}</div>
                  <div className="text-xs text-slate-500">{currentUser?.role}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentUser?.profileImageUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${currentUser?.name || currentUser?.email}`}
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full border-2 border-slate-200"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">{currentUser?.name}</div>
                          <div className="text-sm text-slate-500">{currentUser?.email}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-slate-500">{currentUser?.role}</span>
                            {currentUser?.role === 'owner' && (
                              <Crown className="w-3 h-3 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setProfilePageOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile & Settings
                      </button>
                      <button
                        onClick={() => {
                          setHelpModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-200 py-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </form>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {quickActions.map((action) => (
                  <a
                    key={action.title}
                    href={action.href}
                    className="flex items-center gap-3 px-3 py-2 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="text-slate-500">
                      {action.icon}
                    </div>
                    <span>{action.title}</span>
                    {action.badge && (
                      <span className="ml-auto px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                        {action.badge}
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default EnhancedHeader;
